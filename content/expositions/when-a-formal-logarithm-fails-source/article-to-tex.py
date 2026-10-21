"""Convert the compiled article fragment to native TeX, retaining math exactly.

Usage: python article-to-tex.py article.html compiled.json output-directory
The input HTML supplies the authoritative prose and data-tex math bodies.
This script writes source and a correspondence manifest; it does not compile.
"""
from pathlib import Path
import sys, re, json, hashlib, os
try:
    import bs4
except ImportError:
    dependencies = os.environ.get('TENSORGAMI_PYTHON_DEPENDENCIES')
    if dependencies:
        sys.path.insert(0, dependencies)
from bs4 import BeautifulSoup, NavigableString, Tag, Comment

article, report, out = map(Path, sys.argv[1:4])
meta = json.loads(report.read_text(encoding='utf-8'))
source = article.read_text(encoding='utf-8')
soup = BeautifulSoup(source, 'html.parser')
math_records, text_records, headings, links = [], [], [], []

def esc(s):
    chars = {'\\':r'\textbackslash{}','&':r'\&','%':r'\%','$':r'\$','#':r'\#','_':r'\_','{':r'\{','}':r'\}','~':r'\textasciitilde{}','^':r'\textasciicircum{}','\u00a0':'~','\u2011':'-'}
    return ''.join(chars.get(c,c) for c in s)

def urltex(s):
    return ''.join({'%':r'\%','#':r'\#','&':r'\&','_':r'\_'}.get(c,c) for c in s)

def content(e, context='body'):
    return ''.join(convert(c, context) for c in e.children)

def boxed_display_after_paragraph(e):
    """Keep a boxed conclusion with its immediately preceding explanation."""
    previous = e.find_previous_sibling()
    return ('math-display' in e.get('class', [])
            and r'\boxed{' in e.get('data-tex', '')
            and previous is not None and previous.name == 'p')

def convert(e, context='body'):
    if isinstance(e, Comment): return ''
    if isinstance(e, NavigableString):
        t = str(e)
        if t.strip(): text_records.append({'text':t, 'context':context, 'tex':esc(t)})
        return esc(t)
    if not isinstance(e, Tag): return ''
    cls = e.get('class', [])
    if e.has_attr('data-tex'):
        idx = len(math_records)
        tex = e['data-tex'].replace('\r\n','\n').replace('\r','\n')
        display = 'math-display' in cls
        math_records.append({'tex':tex, 'display':display})
        marked = f'% FORMAL-LOG-MATH-BEGIN {idx} '+('display' if display else 'inline')+'\n'+tex+f'\n% FORMAL-LOG-MATH-END {idx}\n'
        if display:
            result = '\n\\ArticleDisplay{'+str(idx)+'}{\n'+marked+'}\n'
            return result + ('\\end{samepage}\n' if boxed_display_after_paragraph(e) else '')
        return '\\(\n'+marked+'\\)'
    if e.name in ['h2','h3','h4']:
        title = re.sub(r'^\d+(?:\.\d+)*\s*·\s*','',e.get_text(' ',strip=True))
        ident = e.get('id')
        if not ident: raise ValueError('Heading missing anchor')
        headings.append({'level':int(e.name[1]), 'id':ident, 'title':title})
        if ident == 'notes-and-sources':
            return '\n\\clearpage\\section*{Notes and sources}\\hypertarget{notes-and-sources}{}\\addcontentsline{toc}{section}{Notes and sources}\n'
        cmd = {'h2':'section','h3':'subsection','h4':'subsubsection'}[e.name]
        return '\n\\'+cmd+'{'+esc(title)+'}\\label{sec:'+ident+'}\\hypertarget{'+ident+'}{}\n'
    if e.name == 'sup' and e.get('id','').startswith('citation-'):
        a = e.find('a'); ident=e['id']; target=a['href'][1:]; label=a.get_text(strip=True)
        links.append({'kind':'citation','from':ident,'to':target})
        return '\\hypertarget{'+ident+'}{}\\nobreak\\hspace{.08em}\\hyperlink{'+target+'}{\\textsuperscript{'+esc(label)+'}}'
    if e.name == 'a':
        href=e.get('href','')
        if e.get('role') == 'doc-backlink':
            links.append({'kind':'return','to':href[1:]})
            return '\\hyperlink{'+href[1:]+'}{\\textsuperscript{\\(\\hookleftarrow\\)}}'
        label=content(e,context)
        if href.startswith('/'):
            href='https://tensorgami.com'+href
        links.append({'kind':'internal' if href.startswith('#') else 'external','href':href})
        return '\\hyperlink{'+href[1:]+'}{'+label+'}' if href.startswith('#') else '\\href{'+urltex(href)+'}{'+label+'}'
    if e.name == 'strong': return '\\textbf{'+content(e,context)+'}'
    if e.name == 'em': return '\\emph{'+content(e,context)+'}'
    if e.name == 'code': return '\\texttt{'+esc(e.get_text())+'}'
    if e.name == 'p':
        following = e.find_next_sibling()
        keep = following is not None and boxed_display_after_paragraph(following)
        return ('\\Needspace{6\\baselineskip}\\begin{samepage}\n' if keep else '')+content(e,context)+'\n\n'
    if e.name == 'br': return '\\\\'
    if e.name == 'hr': return '\n\\par\\medskip\\noindent\\rule{\\linewidth}{.3pt}\\medskip\n'
    if e.name == 'blockquote': return '\n\\begin{quote}\n'+content(e,context)+'\n\\end{quote}\n'
    if e.name == 'table':
        rows=e.find_all('tr'); cols=max(len(r.find_all(['th','td'],recursive=False)) for r in rows)
        spec='@{}'+'>{\\raggedright\\arraybackslash}X'*cols+'@{}'
        lines=['\\begin{center}\\begingroup\\small\\setlength{\\tabcolsep}{5pt}\\renewcommand{\\arraystretch}{1.2}','\\begin{tabularx}{\\linewidth}{'+spec+'}','\\toprule']
        for i,row in enumerate(rows):
            cells=row.find_all(['th','td'],recursive=False); vals=[content(c,'table') for c in cells]
            if any(c.name=='th' for c in cells): vals=['\\textbf{'+v+'}' for v in vals]
            lines.append(' & '.join(vals)+' \\\\')
            if i==0 and any(c.name=='th' for c in cells): lines.append('\\midrule')
        return '\n'+'\n'.join(lines+['\\bottomrule','\\end{tabularx}\\endgroup\\end{center}'])+'\n'
    if e.name in ['ul','ol']:
        notes=context=='sources'; env='enumerate' if e.name=='ol' else 'itemize'
        options='[leftmargin=1.8em,label=\\arabic*.,itemsep=.8em]' if notes else '[leftmargin=1.8em,itemsep=.25em]'
        return '\n'+('\\begingroup\\small\n' if notes else '')+'\\begin{'+env+'}'+options+'\n'+content(e,context)+'\\end{'+env+'}\n'+('\\endgroup\n' if notes else '')
    if e.name == 'li':
        anchor='\\hypertarget{'+e['id']+'}{}' if e.has_attr('id') else ''
        return '\\item '+anchor+content(e,context)+'\n'
    if e.name == 'section' and 'sources' in cls: return content(e,'sources')
    if e.name in ['div','span','section','article']: return content(e,context)
    raise ValueError('Unsupported article element: '+e.name)

body=content(soup)
assert math_records == meta['equations'], 'Math bodies or order differ from renderer report'
title=meta['title']; subtitle=meta['subtitle']
preamble=r'''\documentclass[11pt,letterpaper]{article}
\usepackage[margin=1in,top=.9in,bottom=.85in]{geometry}
\usepackage{sectsty,lmodern,fontspec}
\setmainfont{Georgia}
\setsansfont{Segoe UI}
\usepackage{amsmath,amssymb,mathtools}
\usepackage{microtype,booktabs,array,tabularx,enumitem,xcolor,graphicx,needspace}
\allsectionsfont{\raggedright\hyphenpenalty=10000\exhyphenpenalty=10000}
\definecolor{ink}{HTML}{25313C}
\definecolor{inkblue}{HTML}{345B70}
\definecolor{accent}{HTML}{9B7A48}
\usepackage{hyperref,bookmark}
\hypersetup{unicode=true,colorlinks=true,linkcolor=inkblue,urlcolor=inkblue,citecolor=inkblue,pdftitle={@@TITLE@@},pdfauthor={Henry Shin},pdfsubject={@@SUBTITLE@@},bookmarksopen=true,bookmarksnumbered=true}
\urlstyle{same}
\usepackage{fancyhdr}
\pagestyle{fancy}\fancyhf{}
\fancyhead[L]{\small\textsc{@@TITLE@@}}
\fancyhead[R]{\small\textsc{Tensorgami}}
\fancyfoot[C]{\thepage}
\setlength{\headheight}{16pt}
\renewcommand{\headrulewidth}{.3pt}
\setlength{\parindent}{0pt}
\setlength{\parskip}{.5em}
\linespread{1.09}
\setlength{\emergencystretch}{2em}
\clubpenalty=10000\widowpenalty=10000\displaywidowpenalty=10000
\setcounter{tocdepth}{1}
\newsavebox{\articlemathbox}
\newcommand{\ArticleDisplay}[2]{%
  \par\addvspace{.35em}\begingroup
  \sbox{\articlemathbox}{$\displaystyle #2$}%
  \typeout{PDF-MATH:#1:width=\the\wd\articlemathbox:height=\the\ht\articlemathbox:depth=\the\dp\articlemathbox:limit=\the\linewidth}%
  \noindent\makebox[\linewidth][c]{\ifdim\wd\articlemathbox>\linewidth\resizebox{\linewidth}{!}{\usebox{\articlemathbox}}\else\usebox{\articlemathbox}\fi}%
  \par\endgroup\addvspace{.35em}}
\begin{document}
\color{ink}
\thispagestyle{empty}
{\sffamily\small\textcolor{accent}{TENSORGAMI · EXPOSITIONS}\par}
\vspace{.6em}
{\LARGE\bfseries @@TITLE@@\par}
\vspace{.4em}
{\large\itshape @@SUBTITLE@@\par}
\vspace{.65em}
{Henry Shin\hspace{.6em}·\hspace{.6em}October 2026\par}
\vspace{.3em}
{\small\href{https://tensorgami.com/notes/when-a-formal-logarithm-fails.html}{Tensorgami · web edition}\par}
\vspace{.6em}
'''.replace('@@TITLE@@',esc(title)).replace('@@SUBTITLE@@',esc(subtitle))
intro,rest=body.split('\\section{',1)
tex=preamble+intro+'\n\\clearpage\\thispagestyle{plain}\\tableofcontents\\clearpage\n\\section{'+rest+'\n\\end{document}\n'
out.mkdir(parents=True,exist_ok=True)
(out/'main.tex').write_text(tex,encoding='utf-8')
marked_math=re.findall(r'% FORMAL-LOG-MATH-BEGIN (\d+) (inline|display)\n([\s\S]*?)\n% FORMAL-LOG-MATH-END \1\n',tex)
assert [{'tex':t, 'display':kind=='display'} for _,kind,t in marked_math] == math_records
manifest={'article_source':str(article),'article_sha256':hashlib.sha256(article.read_bytes()).hexdigest(),'manuscript_sha256':meta['source_sha256'],'tex_sha256':hashlib.sha256((out/'main.tex').read_bytes()).hexdigest(),'math':math_records,'text_segments':text_records,'headings':headings,'links':links,'math_count':len(math_records),'display_count':sum(m['display'] for m in math_records),'source_notes':len(meta['notes'])}
(out/'correspondence.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({k:manifest[k] for k in ['math_count','display_count','source_notes']}))
