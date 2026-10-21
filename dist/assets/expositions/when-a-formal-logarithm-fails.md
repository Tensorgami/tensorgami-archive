# When a Formal Logarithm Fails

*Corrections, cohomology, and a spectral sequence in characteristic three*

The identity \(\log(uv)=\log u+\log v\) changes multiplication into addition. Near \(u=v=1\), it becomes a formal power-series identity: no convergence or choice of branch is involved. In characteristic three, its first two orders can still be recovered. The next order cannot.

We will follow that failure through a single calculation. Substitution becomes a coproduct, an attempted identity becomes a cocycle condition, and a correction removes a boundary. The first residual that cannot be removed is detected by a nonzero differential in a spectral sequence. Its polynomial then supplies the addition law of a different group, where the same compatibility equation proves associativity.

The opening requires formal power series and arithmetic in characteristic three. Tensor products and cochain complexes are introduced as they become useful. Sections 5–6 give the complete spectral-sequence calculation; section 7 interprets it through a tower of exact triangles. The argument uses only finitely many polynomial weights, so no convergence theorem for an infinite spectral sequence is needed.

## 1 The identity and its obstruction {#identity-and-obstruction}

Let \(k\) be a field. Write a unit near \(1\) as \(1+t\). Multiplication gives the law

\[
F(x,y)=(1+x)(1+y)-1=x+y+xy.
\]

This is the multiplicative formal group in the coordinate \(t\). Its identity is \(0\), its inverse is the formal series \(-t/(1+t)\), and associativity follows from associativity of multiplication. We seek a series

\[
L(t)=t+\ell_2t^2+\ell_3t^3+\cdots
\]

such that

\[
L(F(x,y))=L(x)+L(y).
\]

The coefficient of \(t\) is prescribed to be \(1\). Such a series would be an invertible change of formal coordinate, turning the multiplicative law into the additive law.

In characteristic zero,

\[
L(t)=\log(1+t)=\sum_{n\geq1}\frac{(-1)^{n+1}}n t^n
\]

does the job. One proof differentiates the proposed identity in \(x\):

\[
\frac{\partial}{\partial x}
\bigl(L(F(x,y))-L(x)-L(y)\bigr)
=\frac{1+y}{1+F(x,y)}-\frac1{1+x}=0.
\]

The difference vanishes at \(x=0\), so it is zero. Here the last inference uses characteristic zero: a formal series with zero \(x\)-derivative is independent of \(x\).

In characteristic \(p\), \(d(t^p)/dt=0\), and that inference loses information. There is a second issue: a logarithm with the required normalization does not exist. The coefficients with denominator divisible by \(p\) signal an actual obstruction, not merely a poor formula.

For characteristic three, the obstruction has a short proof. The threefold sum under \(F\) is

\[
[3]_F(t)=(1+t)^3-1=t^3.
\]

The threefold sum under the additive law is zero. Consequently any formal-group homomorphism \(L\) from the multiplicative group to the additive group satisfies

\[
L(t^3)=3L(t)=0.
\]

Substitution \(t\mapsto t^3\) is injective on \(k[[t]]\), so \(L=0\). In particular, there is no such homomorphism with linear coefficient \(1\).

This proves nonexistence. The question that remains is more precise: how far can the desired identity be constructed, and which part of its failure cannot be changed by another coefficient? From now on, \(\operatorname{char}k=3\).

## 2 Retaining substitution and multiplication {#substitution-and-coproduct}

Higher Taylor coefficients retain the variation hidden by the ordinary derivative. The Hasse coefficients are defined by

\[
f(x+h)=\sum_{n\geq0}D^{[n]}f(x)h^n,
\qquad
D^{[n]}(x^m)=\binom mn x^{m-n}.
\]

This definition works in every characteristic, for polynomials or formal power series. For example, \(D^{[3]}(x^3)=1\), although the ordinary derivative of \(x^3\) vanishes. The [Frobenius calculation in *What a Derivative Retains*](https://tensorgami.com/notes/what-a-derivative-retains.html#frobenius-and-artin-schreier) explains this distinction; [*Divisibility of Separated Polynomials*](https://tensorgami.com/notes/separated-polynomial-divisibility.html) uses these coefficients to retain multiplicities in a fiber.

The diagonal gives a geometric setting for these coefficients. Put \(A=k[[t]]\). The completed tensor product is

\[
A\widehat\otimes_k A=k[[x,y]].
\]

The diagonal pullback \(k[[x,y]]\to k[[t]]\) sends both \(x\) and \(y\) to \(t\). Its kernel is \((y-x)\). Writing \(h=y-x\), the successive quotients by powers of that ideal retain successive powers of displacement. The first quotient by \(h^2\) gives the usual first-order differential; the entire completion retains every Hasse coefficient.

Our identity asks for another compatibility as well: the coefficients must respect a group law. That law pulls functions in the other direction:

\[
\Delta:A\longrightarrow A\widehat\otimes_k A,
\qquad
\Delta f=f(F(x,y)).
\]

Thus the diagonal identifies two points, while \(\Delta\) evaluates a function on their group product. In tensor notation,

\[
\Delta t=t\otimes1+1\otimes t+t\otimes t.
\]

For \(g=1+t\), this is the simple identity

\[
\Delta g=g\otimes g.
\]

An element with constant term one satisfying this identity is called *group-like*. An element \(f\) satisfying

\[
\Delta f=f\otimes1+1\otimes f
\]

is called *primitive*. The requested logarithm would turn this group-like coordinate into a primitive series with linear coefficient \(1\).

Associativity now has a reusable algebraic form:

\[
(\Delta\otimes1)\Delta=(1\otimes\Delta)\Delta.
\]

Both sides send \(g\) to \(g\otimes g\otimes g\). This coassociativity will ensure that failures of the primitive equation satisfy a compatibility equation of their own.

The same multiplicative law already occurs in the [line-bundle calculation in *What a Derivative Retains*](https://tensorgami.com/notes/what-a-derivative-retains.html#spectral-ku). In [*Fourier, Symmetry, and Reconstruction*, §12.4](https://tensorgami.com/notes/fourier-symmetry-and-reconstruction.html#section-12-4), a logarithmic coordinate makes tensor products of unipotent monodromies additive over \(\mathbf C\). Our calculation examines the obstruction to that universal coordinate change in characteristic three. It does not prohibit every logarithm calculation in a sufficiently small nilpotent quotient.

## 3 A complex for the compatibility conditions {#cobar-complex}

Let \(\mathfrak m=tk[[t]]\), and remove the two terms forced by the identity element:

\[
\overline\Delta f=\Delta f-f\otimes1-1\otimes f,
\qquad f\in\mathfrak m.
\]

The remaining series vanishes when either input is zero. It therefore lies in \(\mathfrak m\widehat\otimes\mathfrak m\). Its vanishing is exactly the primitive condition.

Define cochains by

\[
C^0=k,
\qquad
C^n=\mathfrak m^{\widehat\otimes n}\quad(n\geq1).
\]

Concretely, \(C^n\) consists of the series in \(k[[x_1,\ldots,x_n]]\) divisible by \(x_1\cdots x_n\). They vanish whenever an input is the identity. Write a tensor as \(f_1\mid\cdots\mid f_n\). The differential is

\[
D(f_1\mid\cdots\mid f_n)
=\sum_{i=1}^n(-1)^i
f_1\mid\cdots\mid\overline\Delta f_i\mid\cdots\mid f_n,
\]

with \(D=0\) on \(C^0\). Inserting \(\overline\Delta f_i\) replaces one slot by two, so \(D\) raises cohomological degree by one. This is the normalized completed cobar complex of the coproduct.

For a one-cochain,

\[
Df(x,y)=f(x)+f(y)-f(F(x,y)).
\]

For a two-cochain,

\[
Dh(x,y,z)
=h(y,z)-h(F(x,y),z)+h(x,F(y,z))-h(x,y).
\]

The four terms compare the two ways of grouping three inputs. Coassociativity gives \(D^2=0\): when the reduced coproduct is inserted twice, disjoint insertions cancel with opposite signs, and the two insertions in a single original slot agree by coassociativity and cancel as well. Thus every defect \(Df\) is automatically a two-cocycle.

Cochains can also be concatenated. If \(u\in C^r\) and \(v\in C^s\), place the slots of \(v\) after those of \(u\). This associative product satisfies

\[
D(uv)=D(u)v+(-1)^r uD(v).
\]

It is not imposed to be graded commutative. In particular, \(t\mid t\) need not vanish. The distinction between two kinds of multiplication is essential:

\[
t^2\in C^1,
\qquad
t\mid t\in C^2.
\]

The first squares a function in one variable; the second puts that function in two slots. Both have polynomial weight two, but their cohomological degrees differ.

We have turned the requested identity into \(DL=0\). There is still no solution with the required leading term. The filtration will identify the first stage at which that prescribed leading term prevents a solution.

## 4 Filtering by the order retained {#weight-filtration}

Give the tensor monomial

\[
t^{i_1}\mid\cdots\mid t^{i_n}
\]

weight \(i_1+\cdots+i_n\), where each \(i_j\geq1\). Let \(F^sC^n\) consist of series whose monomials have weight at least \(s\). On \(C^0=k\), take \(F^0C^0=k\) and \(F^1C^0=0\).

Substitution by \(x+y+xy\) cannot lower total degree. Consequently

\[
D(F^sC)\subseteq F^sC.
\]

The quotient \(C/F^{s+1}C\) retains weights through \(s\). A series is a cocycle there when its identity holds through that order. Lifting it to the next quotient means choosing the next coefficient so that one further order also holds.

The part of the coproduct that preserves weight is

\[
\Delta_0t=t\otimes1+1\otimes t.
\]

Thus the associated graded complex uses the additive group law. The term \(t\otimes t\), which distinguished multiplication from addition, raises weight. Let \(D_j\) denote the component of \(D\) that raises weight by \(j\), so

\[
D=D_0+D_1+D_2+\cdots.
\]

Here \(D_0\) is the additive cobar differential. This decomposition uses the chosen coordinate and its homogeneous monomials; the filtration itself is the sequence of order cutoffs just defined.

Three gradings or indices now have separate roles. Cohomological degree counts input slots. Weight counts powers of the formal coordinates. The index of a spectral-sequence differential will measure how far the first remaining defect raises weight.

Only weights at most four are needed below. We may therefore do the entire calculation in the finite complex \(C/F^5C\). It is finite-dimensional: a nonzero normalized tensor of weight below five has at most four slots. This quotient truncates the whole complex by total weight. It is not asserted to be the cobar complex of \(k[[t]]/(t^5)\); that ideal need not define a quotient compatible with the coproduct.

## 5 The first correction and the cubic residual {#first-correction}

The linear term has defect

\[
Dt=-t\mid t.
\]

It is primitive in the associated graded, but fails at weight two. To see whether a quadratic correction can remove the failure, calculate \(D(t^2)\). This is the only coproduct multiplication we need to perform explicitly.

Put \(u=t\otimes1\), \(v=1\otimes t\), and \(r=t\otimes t\). Multiplicativity of \(\Delta\) gives

\[
\overline\Delta(t^2)
=(u+v+r)^2-u^2-v^2
=2uv+2(u+v)r+r^2.
\]

Since \(-2=1\) in \(k\), taking its negative gives

\[
D(t^2)
=t\mid t+t\mid t^2+t^2\mid t-t^2\mid t^2.
\]

In particular, \(D_0(t^2)=t\mid t\). Adding \(t^2\) therefore cancels the first defect:

\[
\boxed{
D(t+t^2)=c-v,
\qquad
c=t\mid t^2+t^2\mid t,
\quad
v=t^2\mid t^2.
}
\]

The two remaining terms have different weights: \(c\) has weight three and \(v\) has weight four. The series \(t+t^2\) satisfies the logarithm identity through total degree two. The question is whether a cubic correction can remove \(c\).

Consider the weight-three part of the additive cobar complex:

\[
k\,t^3
\xrightarrow{\ D_0\ }
k\{t\mid t^2,\ t^2\mid t\}
\xrightarrow{\ D_0\ }
k\,(t\mid t\mid t).
\]

The three terms lie in cohomological degrees one, two, and three. Frobenius gives \(D_0(t^3)=0\). The graded product rule and \(D_0(t^2)=t\mid t\) give

\[
D_0(t\mid t^2)=-t\mid t\mid t,
\qquad
D_0(t^2\mid t)=t\mid t\mid t.
\]

The kernel in degree two is precisely \(k\,c\), while the image from degree one is zero. Therefore

\[
H^2(\operatorname{gr}_F^3 C)=k\cdot[c],
\qquad [c]\ne0.
\]

A cubic correction is a scalar multiple of \(t^3\). Its weight-three defect is zero, so it cannot change \(c\). Terms of higher weight cannot change a cubic defect either. The attempted logarithm has reached its first unrepairable order.

In coordinates,

\[
c(x,y)=xy^2+x^2y,
\qquad
D(t+t^2)(x,y)=xy^2+x^2y-x^2y^2.
\]

The obstruction is the class of the leading term in the weight-three complex. The full defect is a coboundary—it is \(D(t+t^2)\). There is no contradiction: the lifting problem prescribes a leading term, and the relevant boundaries are those available from corrections at the next weight.

## 6 The nonzero second differential {#second-differential}

We can now identify the calculation as a spectral-sequence differential, including its target page. Use the convention

\[
E_0^{s,q}=\operatorname{gr}_F^s C^{s+q},
\qquad
E_1^{s,q}=H^{s+q}(\operatorname{gr}_F^s C,D_0).
\]

The differential has bidegree

\[
d_r:E_r^{s,q}\longrightarrow E_r^{s+r,q-r+1}.
\]

It raises total cohomological degree by one and filtration degree by \(r\). A representative whose lower-weight defects have been removed supplies its next differential by taking the leading remaining defect.[^filtered-complex]

Each next page is the cohomology of the preceding one: \(E_{r+1}=H(E_r,d_r)\).

The one-cochain \(t\) gives a class in \(E_1^{1,0}\). Its first possible differential is represented by

\[
D_1t=-t\mid t=-D_0(t^2).
\]

Hence \(d_1[t]=0\). The explicit nullhomotopy is the correction \(t^2\), and a representative appropriate to the next page is \(t+t^2\). Its weight-three defect is \(c\), so the proposed second differential is

\[
d_2[t]=[c].
\]

We must check that \([c]\) remains nonzero on \(E_2\), rather than only on \(E_1\). There are two checks.

First, no \(d_1\) can hit it. The incoming group is

\[
E_1^{2,-1}=H^1(\operatorname{gr}_F^2 C)=0,
\]

because the weight-two complex is the isomorphism

\[
k\,t^2\xrightarrow{\ D_0\ }k\,(t\mid t).
\]

Second, its outgoing \(d_1\) vanishes. Here the identity \(D^2=0\) performs useful work. From \(D(t+t^2)=c-v\), we obtain

\[
Dc=Dv.
\]

Taking the weight-four part gives

\[
D_1c=D_0v.
\]

The right side is explicitly

\[
D_0(t^2\mid t^2)
=t\mid t\mid t^2-t^2\mid t\mid t.
\]

Thus the first differential out of \([c]\) is a boundary. Its target group is nonzero; it is this displayed boundary that makes \([c]\) survive.[^outgoing-target] Since no incoming differential kills it, \(E_2^{3,-1}=k\cdot[c]\).

The source also survives as \(E_2^{1,0}=k\cdot[t]\): its only possible incoming \(d_1\) comes from constants, whose differential is zero. We have proved

\[
\boxed{
d_2:E_2^{1,0}\longrightarrow E_2^{3,-1},
\qquad
[t]\longmapsto[t\mid t^2+t^2\mid t],
\qquad d_2\ne0.
}
\]

Both spaces are one-dimensional, so this map is an isomorphism. The class with linear term \(t\) disappears on the next page. It cannot arise from a genuine primitive series with that leading term.

The index two measures the increase from weight one to weight three. It does not mean that the residual is a quadratic polynomial, or that it lies in cohomological degree three. The residual is cubic, and it is a two-cochain. Keeping these roles separate makes the page number intelligible.

This also clarifies the use of \(c\). It is a cocycle for \(D_0\), and it represents an \(E_2\) class. It is not a cocycle for the full multiplicative differential: \(Dc=Dv\). The filtered construction remembers precisely the correction needed to interpret its leading term.

## 7 The tower behind the pages {#lifting-tower}

Let \(K_s=C/F^sC\). Successive truncations fit into short exact sequences of complexes

\[
0\longrightarrow\operatorname{gr}_F^s C
\longrightarrow K_{s+1}
\longrightarrow K_s
\longrightarrow0.
\]

They give exact triangles in the derived category of \(k\)-vector spaces,

\[
\operatorname{gr}_F^s C
\longrightarrow K_{s+1}
\longrightarrow K_s
\longrightarrow\operatorname{gr}_F^s C[1],
\]

and connecting maps

\[
\partial_s:H^1(K_s)\longrightarrow
H^2(\operatorname{gr}_F^s C).
\]

To compute \(\partial_s\), choose a representative lift to \(K_{s+1}\) and apply \(D\). Its differential lies in the kernel, which is the new weight layer. Another lift differs by a cochain in that layer, so its differential changes by a \(D_0\)-boundary. This proves that the obstruction class is independent of the chosen lift. Its vanishing is equivalent to the existence of a correction making the lift a cocycle.

Our calculation follows two consecutive stages:

| Partial solution | Next residual | Obstruction class | Result |
|---|---|---|---|
| \(t\) in \(K_2\) | \(-t\mid t\) | Zero in \(H^2(\operatorname{gr}^2 C)\) | Correct by \(t^2\) and lift to \(K_3\) |
| \(t+t^2\) in \(K_3\) | \(c\) | Nonzero in \(H^2(\operatorname{gr}^3 C)\) | No lift to \(K_4\) |

The spectral sequence organizes such successive lift-and-correct calculations, accounting for the ambiguity in earlier choices. In this example the quadratic correction is unique, and the second obstruction is the nonzero \(d_2\) just computed. The weight-four calculation verifies that its value is defined on the second page.

There is a direct comparison with the [edge-removal obstruction in *What a Boundary Map Can Prove*](https://tensorgami.com/notes/what-a-boundary-map-can-prove.html#removing-an-edge-produces-an-obstruction-map). There a connecting map measures whether local data extend across an edge. Here successive connecting maps measure whether an identity extends by one polynomial order. The complexes differ, but the operation is the same: lift a representative, take its differential, and identify the resulting class modulo changes of lift.

Formal-group obstruction calculations have long used degree filtrations in this way. Rezk's account of the Lubin–Tate theorem constructs a complex of symmetric cocycles, filters by polynomial degree, and calculates the resulting spectral sequence. His two-term symmetric-cocycle complex differs from the full normalized cobar complex used here; it provides a close setting for the method and its wider role.[^rezk]

## 8 The obstruction becomes an addition law {#witt-extension}

The same cubic class has a constructive use. Its additive cocycle identity is

\[
c(x,y)+c(x+y,z)=c(y,z)+c(x,y+z).
\]

This is exactly \(D_0c=0\), already proved in the weight-three complex. Define an operation on pairs by

\[
(x,u)+(y,v)
=\bigl(x+y,\ u+v-c(x,y)\bigr).
\]

The two bracketings of a threefold sum have equal first coordinates. Their second coordinates differ by the two sides of the cocycle identity. They are therefore equal. Symmetry of \(c\) proves commutativity, \(c(x,0)=0\) gives the identity \((0,0)\), and \(c(x,-x)=0\) gives inverse \((-x,-u)\).

This is the addition law of length-two, \(3\)-typical Witt vectors over \(k\). To see the coefficient directly, first work over the integers with the two ghost polynomials

\[
w_0(X,U)=X,
\qquad
w_1(X,U)=X^3+3U.
\]

Requiring both ghost coordinates to add forces the second coordinate of a sum to be

\[
U+V-\frac{(X+Y)^3-X^3-Y^3}{3}
=U+V-X^2Y-XY^2.
\]

The quotient is an integer polynomial. Reducing it modulo three gives the displayed addition law; no division by three is performed in \(k\).[^witt]

The extension retains information absent from the two separate additive coordinates. Its threefold sum is

\[
[3](x,u)=(0,x^3).
\]

Indeed, \(c(x,x)=2x^3=-x^3\) and \(c(2x,x)=0\), so the second coordinate of three copies is \(3u-c(x,x)-c(2x,x)=x^3\). Componentwise addition on \(\mathbf G_a^2\) would have zero three-series. The cubic correction changes the group structure even though the underlying space remains the affine plane.

The projection \((x,u)\mapsto x\) is a homomorphism to \(\mathbf G_a\), with kernel the additive second coordinate. Thus \(c\) supplies the data of an extension. This construction gives a different group law; it does not produce the scalar logarithm ruled out in section 1. A polynomial that obstructed one compatibility problem now enforces associativity in another.

## 9 What the filtered object retains {#retained-structure}

The additive and multiplicative formal groups both have underlying formal disk \(\operatorname{Spf}k[[t]]\). Their continuous cotangent modules are both \(k[[t]]\,dt\), and their tangent spaces at the identity are one-dimensional. That information cannot decide whether a normalized logarithm exists. The difference lies in how two formal points are combined.

Keeping the coproduct retains that combination. Passing to the associated graded makes its lowest-order law additive. Keeping the filtered complex as well retains the interaction between successive orders. Its differential records the original identity, its boundaries record available corrections, and its later spectral-sequence differentials record failures that remain after earlier corrections have been made.

In the derived category, the exact triangles specify the obstruction targets and prove independence from choices. The finite tower may equivalently be regarded as a tower of \(Hk\)-module spectra, where its connecting maps become connecting maps of spectra. That reformulation does not introduce additional information into this calculation. Further spectral questions require further structured input; the completed Hopf algebra has supplied the nonlinear law throughout.

The distinction also explains why the two remedies for a vanishing derivative have different jobs. Higher Taylor coefficients recover variation that first order cannot see. Cohomology determines whether those coefficients can be chosen compatibly with a specified law. Better coefficient detection cannot make an impossible logarithm exist. It can expose its obstruction, locate the first order where it appears, and show how that same obstruction participates in another construction.

## Notes and sources {#notes-and-sources}

[^outgoing-target]: The target is \(H^3(\operatorname{gr}_F^4C)\). Set \(u=t^2\mid t\mid t\), \(w=t\mid t^2\mid t\), and \(z=t\mid t\mid t^2\). Their \(D_0\)-images are respectively \(t\mid t\mid t\mid t\), its negative, and itself, so the kernel is two-dimensional. In weight four, the degree-two basis is \(t\mid t^3,t^2\mid t^2,t^3\mid t\); its images are \(0,z-u,0\). The quotient is therefore one-dimensional, represented for example by \(u+w\).

[^filtered-complex]: The Stacks Project, [Spectral sequences: filtered complexes](https://stacks.math.columbia.edu/tag/012K), especially Lemma 12.24.2 for \(E_0^{s,q}=\operatorname{gr}^s C^{s+q}\), the bidegree of \(d_r\), and the representative formula; Lemma 12.24.3 identifies the first differential with a connecting map. The explicit weight-two through weight-four calculations above establish the claimed second differential without an infinite-convergence assertion.

[^rezk]: Charles Rezk, [Notes on the Hopkins–Miller Theorem](https://www.sas.rochester.edu/mth/sites/doug-ravenel/otherpapers/hopkins-miller-thm.pdf), §§5.1–5.8, printed pp. 7–10. The discussion constructs the formal-group symmetric-cocycle complex, filters it by polynomial degree, and computes its associated spectral sequence. The full normalized cobar complex and its particular characteristic-three calculation are presented directly here.

[^witt]: Lars Hesselholt, [Lecture notes on Witt vectors](https://math.mit.edu/~larsh/papers/s03/wittsurvey.pdf), opening construction of the Witt polynomials and their addition operations. For the first two \(3\)-typical coordinates, the integer ghost-coordinate calculation in section 8 gives the required polynomial explicitly; the cocycle identity independently proves its associativity after reduction.
