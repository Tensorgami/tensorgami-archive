"""Independent text/mathematics preservation checks for the full web edition."""
from pathlib import Path
from collections import Counter
from html.parser import HTMLParser
import re,json,unicodedata

work=Path(__file__).resolve().parent
inventory=json.loads((work/'conversion-inventory.json').read_text(encoding='utf-8'))
paragraphs=json.loads((work/'paragraph-inventory.json').read_text(encoding='utf-8'))
equations=json.loads((work/'equation-inventory.json').read_text(encoding='utf-8'))
source=(work/'Quotients_Refinement_and_Reconstruction.tex').read_text(encoding='utf-8')
page_path=work/'quotients-and-reconstruction.html'
if not page_path.exists():page_path=work/'quotients-and-reconstruction.unresolved-diagrams.html'
page=page_path.read_text(encoding='utf-8')

body=source[source.index('\\begin{abstract}'):source.rindex('\\end{document}')]
body=re.sub(r'(?<!\\)%[^\n]*','',body)
expected_math=[]
diagram_displays=[]
def math_environment(match):
    expected_math.append((True,match.group(2).strip()))
    return ''
body=re.sub(r'\\begin\{(equation|align\*?)\}([\s\S]*?)\\end\{\1\}',math_environment,body)
def display(match):
    raw=match.group(1)
    if '\\begin{tikzcd}' in raw:diagram_displays.append(raw)
    else:expected_math.append((True,raw.strip()))
    return ''
body=re.sub(r'(?<!\\)\\\[([\s\S]*?)(?<!\\)\\\]',display,body)
expected_math.extend((False,x.strip()) for x in re.findall(r'\$([^$]*?)\$',body))
math_expected=Counter(expected_math)
math_rendered=Counter((e['display'],e['raw'].strip()) for e in equations)

def group(text,pos,opening='{',closing='}'):
    while pos<len(text) and text[pos].isspace():pos+=1
    assert text[pos]==opening,(pos,text[pos:pos+80])
    start=pos+1;level=1;pos+=1
    while pos<len(text):
        if text[pos]=='\\':pos+=2;continue
        if text[pos]==opening:level+=1
        if text[pos]==closing:
            level-=1
            if not level:return text[start:pos],pos+1
        pos+=1
    raise ValueError('Unclosed group')

def prose(text):
    """Independent TeX text interpreter; mathematical atoms have no prose text."""
    out=[];pos=0
    while pos<len(text):
        if text[pos]=='$':
            out.append('\u200b');pos=text.index('$',pos+1)+1;continue
        if text.startswith('\\(',pos):
            out.append('\u200b');pos=text.index('\\)',pos+2)+2;continue
        if text[pos]!='\\':out.append(' ' if text[pos]=='~' else text[pos]);pos+=1;continue
        match=re.match(r'\\([A-Za-z]+|.)',text[pos:]);command=match[1];pos+=len(match[0])
        if command in ['"',"'",'`','v']:
            if text[pos]=='{':letter,pos=group(text,pos)
            else:letter=text[pos];pos+=1
            out.append(unicodedata.normalize('NFC',letter+{'"':'\u0308',"'":'\u0301','`':'\u0300','v':'\u030c'}[command]));continue
        if command in ['%', '&', '_', '#', '{', '}']:out.append(command);continue
        if command=='S':out.append('§');continue
        if command in [' ', ',', ';', '!']:out.append(' ');continue
        if command in ['emph','textit','textbf','texttt']:
            value,pos=group(text,pos);out.append(prose(value));continue
        if command=='label':value,pos=group(text,pos);continue
        if command in ['ref','eqref']:
            value,pos=group(text,pos);number=inventory['labels'][value];out.append('('+number+')' if command=='eqref' else number);continue
        if command=='url':value,pos=group(text,pos);out.append(value);continue
        if command in ['href','texorpdfstring']:
            first,pos=group(text,pos);second,pos=group(text,pos);out.append(prose(second if command=='href' else first));continue
        if command=='cite':
            option=''
            if text[pos]=='[':option,pos=group(text,pos,'[',']')
            value,pos=group(text,pos);numbers=[inventory['citations'][key.strip()] for key in value.split(',')]
            out.append('['+', '.join(numbers)+(', '+prose(option) if option else '')+']');continue
        raise ValueError('Unsupported text command '+command)
    return ''.join(out).replace('---','—').replace('--','–').replace('``','“').replace("''",'”')

class ParagraphText(HTMLParser):
    def __init__(self):super().__init__(convert_charrefs=True);self.results={};self.current=None;self.level=0;self.skip=None;self.words=[]
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if self.current is None:
            if tag=='p' and 'data-source-paragraph' in attrs:self.current=int(attrs['data-source-paragraph']);self.words=[];self.level=0;self.skip=None
            else:return
        self.level+=1
        if self.skip is None and any(c in attrs.get('class','').split() for c in ['math-inline','math-display']):self.skip=self.level
    def handle_endtag(self,tag):
        if self.current is None:return
        if self.skip==self.level:self.skip=None
        self.level-=1
        if self.level==0:self.results[self.current]=''.join(self.words);self.current=None
    def handle_data(self,data):
        if self.current is not None and self.skip is None:self.words.append(data)

parser=ParagraphText();parser.feed(page)
normalize=lambda s:' '.join(unicodedata.normalize('NFC',s).replace('\u200b','').split())
differences=[]
relocated_anchors=[]
for item in paragraphs:
    if item.get('anchorOnly'):
        assert normalize(prose(item['raw']))==''
        labels=re.findall(r'\\label\{([^}]+)\}',item['raw'])
        for label in labels:
            pattern=r'<h[23]\b[^>]*>(?:(?!</h[23]>)[\s\S])*?<span id="'+re.escape(label)+r'"'
            assert re.search(pattern,page),('Heading anchor was not relocated',label)
            relocated_anchors.append(label)
        continue
    expected=normalize(prose(item['raw']));actual=normalize(parser.results.get(item['id'],''))
    if expected!=actual:differences.append({'id':item['id'],'expected':expected,'actual':actual})
expected_paragraphs=sum(not p.get('anchorOnly') for p in paragraphs)
report={'source_paragraph_units':len(paragraphs),'paragraphs_expected':expected_paragraphs,'paragraphs_found':len(parser.results),'relocated_heading_anchors':relocated_anchors,'prose_differences':differences,'expected_math':len(expected_math),'rendered_math':len(equations),'exact_raw_math_multiset_equal':math_expected==math_rendered,'diagram_displays':len(diagram_displays),'missing_math':list((math_expected-math_rendered).items()),'unexpected_math':list((math_rendered-math_expected).items())}
(work/'independent-fidelity.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({key:(len(value) if isinstance(value,list) else value) for key,value in report.items()},indent=2))
assert not differences and len(parser.results)==expected_paragraphs
assert math_expected==math_rendered and len(diagram_displays)==25
