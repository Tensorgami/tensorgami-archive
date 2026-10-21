# What a Derivative Retains

*From side strips and oriented boundaries to infinitesimal geometry*

An expanding rectangle and an oriented square give two pictures of a product rule. One separates a linear change from a quadratic corner; the other separates boundary faces and cancels their endpoints. Following these pictures leads to derivatives over arithmetic rings, defining constraints in cotangent complexes, and nonlinear interactions in homotopy theory.

The organizing question is what a first-order description retains. A scalar slope, a cotangent module, a derived fiber, and a formal deformation law retain different information. Each enlargement below is introduced by a calculation in which that difference matters. Two operations guide the route: discard products of changes to extract a linear response; retain degrees and signs to organize how pieces fit together.

The opening pictures return at the advanced steps. Fixing the rectangle's area turns the strips into a linear constraint and the corner into a possible obstruction. Higher brackets encode the rule producing that obstruction. Spectral differentiation keeps the homotopies in multiplication and in its infinitesimal responses. Goodwillie calculus applies linear approximation to gluing spaces, where a product-cell boundary exhibits the interaction that stabilization loses. These constructions enrich different parts of the original picture; their coefficient choices and reconstruction hypotheses will be stated at each step.

The opening uses calculus and elementary chains. Polynomial algebras and modules enter next; complexes and derived tensor products are introduced when ordinary quotients lose constraints. The final four sections assume familiarity with graded algebra and homotopy theory; the spectral section uses stable homotopy theory. Cohomological complexes use the convention that \(V[1]\), for a vector space \(V\) in degree zero, lies in degree \(-1\).

## 1 The side strips of a rectangle {#rectangle}
A rectangle has side lengths \(a\) and \(b\), so its area is \(A=ab\). Change the lengths to \(a+\alpha h\) and \(b+\beta h\). The new area is exactly

\[
(a+\alpha h)(b+\beta h)
=ab+b\alpha h+a\beta h+\alpha\beta h^2.
\]

For positive increments, the three added pieces are two side strips and a corner: a strip of area \(b\alpha h\), another of area \(a\beta h\), and a corner of area \(\alpha\beta h^2\). The identity also holds for signed increments, with the appropriate removals of area. Dividing the change by \(h\ne0\) gives

\[
\frac{A(h)-A(0)}h=b\alpha+a\beta+\alpha\beta h.
\]

The limit retains the strips and discards the corner. This is already a precise answer to what a derivative keeps: the part of the change that scales linearly with the parameter.

<!-- figure:rectangle -->

The same calculation gives the product rule without assuming that the sides move at constant speeds. If \(u\) and \(v\) are differentiable at \(x\), put \(\Delta u=u(x+h)-u(x)\) and \(\Delta v=v(x+h)-v(x)\). Then

\[
\Delta(uv)=v(x)\Delta u+u(x)\Delta v+\Delta u\,\Delta v.
\]

Differentiability gives \(\Delta u=u'(x)h+o(|h|)\) and \(\Delta v=v'(x)h+o(|h|)\). Their product is \(O(h^2)\), so its contribution after division by \(h\) tends to zero. Therefore

\[
(uv)'(x)=u'(x)v(x)+u(x)v'(x).
\]

The rectangle supplies more than a mnemonic. Its exact decomposition identifies the term that must disappear when we retain only first-order variation. Later, an algebraic infinitesimal will make that disappearance an exact quotient operation.

For example, start with side lengths \(3\) and \(2\), and let both increase by \(h\). The area changes from \(6\) to \(6+5h+h^2\). At \(h=1/10\), the added area is \(0.51\): the strips contribute \(0.5\) and the corner \(0.01\). The derivative with respect to this common parameter is \(5\). It depends on the chosen motion of the two sides. Allowing separate increments instead gives the differential \(dA=b\,da+a\,db\), which can be evaluated on any such motion.

## 2 The oriented boundary of the square {#boundary}
Now keep a rectangle fixed and ask how its boundary pieces fit together. Write it as \(I\times J\), with \(I=[a,b]\), \(J=[c,d]\), \(a<b\), and \(c<d\); these letters now denote endpoints rather than the side lengths above. Orient both intervals in the increasing direction, and orient \(Q=I\times J\) by the order of the coordinates. The boundary of an interval is its final endpoint minus its initial endpoint:

\[
\partial I=[b]-[a],\qquad \partial J=[d]-[c].
\]

The square has the counterclockwise boundary

\[
\partial(I\times J)
=(\partial I)\times J-I\times(\partial J).
\]

The first term gives the right edge upward and the left edge downward. The second gives the top edge leftward and the bottom edge rightward. The minus sign is the orientation change required when the boundary operation passes the first interval. For oriented cubical chains, the general product formula is

\[
\partial(C\times E)
=(\partial C)\times E+(-1)^{\deg C}C\times(\partial E).
\]

Here the degree of a chain is its dimension.[^hatcher]

Apply the boundary once more. Writing \([r,s]\) here for the vertex at coordinates \((r,s)\), the eight endpoint contributions are

\[
\begin{aligned}
\partial^2Q={}&[b,d]-[b,c]-[a,d]+[a,c]\\
&-[b,d]+[a,d]+[b,c]-[a,c]=0.
\end{aligned}
\]

Every corner occurs twice, with opposite signs. The statement \(\partial^2=0\) records this cancellation, including its orientation data. If we retained only the unsigned set of edges and then took their endpoints, we would see four corners. Chains preserve the signs that make the second boundary vanish.

<!-- figure:boundary -->

The product rule for slopes and the product rule for boundaries thus share a structural feature: act on one factor at a time. The boundary carries an additional degree and its associated sign. Keeping that degree will matter when products become tensor products of complexes.

The cancellation also explains why a boundary has no boundary as a chain even when individual boundary pieces have endpoints. A right edge alone has two endpoints. Within the whole oriented square, its upper endpoint cancels the initial contribution from the top edge, and its lower endpoint cancels the terminal contribution from the bottom. The identity concerns how the pieces fit together. It is precisely this information that an unsigned picture suppresses.

## 3 Differential forms and integration {#forms}
On a smooth space, differential forms connect local differentiation with oriented boundaries. For a smooth function \(f(x,y)\), its differential is

\[
df=\frac{\partial f}{\partial x}\,dx+
\frac{\partial f}{\partial y}\,dy.
\]

It is a one-form: at each point it takes a tangent vector and returns the corresponding directional derivative. Forms multiply by the exterior product, with \(dx\wedge dy=-dy\wedge dx\) and \(dx\wedge dx=0\). The exterior derivative increases degree and obeys

\[
d(\alpha\wedge\beta)
=d\alpha\wedge\beta+(-1)^r\alpha\wedge d\beta,
\qquad \deg\alpha=r.
\]

For two functions, both of degree zero, this is the ordinary product rule. For higher-degree forms, the sign supplies the same kind of coherence that appeared in the square's boundary.

The identity \(d^2=0\) depends on this exterior algebra. For \(f=x^2\),

\[
df=2x\,dx,\qquad d(df)=2\,dx\wedge dx=0,
\]

whereas the ordinary second derivative \(D^2f=2\). The Hessian still carries second-order variation. Applying the exterior derivative twice instead antisymmetrizes second partial derivatives, and their symmetry makes the result vanish.

Stokes' theorem connects the two square-zero operations through integration:

\[
\int_Q d\omega=\int_{\partial Q}\omega.
\]

For a compact oriented smooth manifold with boundary, this holds for smooth forms of the appropriate degree; the familiar version also allows a rectangular domain with piecewise smooth boundary.[^stokes] Take \(\omega=x\,dy\) on our rectangle. Then \(d\omega=dx\wedge dy\), and

\[
\int_Qd\omega=(b-a)(d-c).
\]

The horizontal edges contribute zero because \(dy=0\). The right edge contributes \(b(d-c)\), and the downward left edge contributes \(a(c-d)\). Hence

\[
\int_{\partial Q}x\,dy=b(d-c)+a(c-d)=(b-a)(d-c).
\]

The boundary and the exterior derivative are paired operations: one lowers geometric dimension, the other raises the degree of a measurement. Integration identifies their outputs. A topological space already admits chains and boundaries; defining ordinary tangent derivatives additionally requires an appropriate smooth, analytic, or algebraic structure. The next step extracts the algebraic structure responsible for the first-order product rule.

## 4 The universal derivation and the diagonal {#kahler}
The strip calculation used addition, multiplication, and the removal of products of changes. We can retain precisely those operations over any coefficient ring. Let \(k\) be a commutative ring, \(A\) a commutative \(k\)-algebra, and \(M\) an \(A\)-module. A \(k\)-derivation is a \(k\)-linear map \(D:A\to M\) satisfying

\[
D(ab)=aD(b)+bD(a).
\]

The module of Kähler differentials \(\Omega_{A/k}\) is generated by symbols \(da\), subject to additivity, this product rule, and \(dc=0\) for scalars \(c\in k\). The resulting map \(d:A\to\Omega_{A/k}\) is universal:

\[
\operatorname{Hom}_A(\Omega_{A/k},M)
\cong\operatorname{Der}_k(A,M).
\]

Every derivation factors uniquely through \(d\). The module retains all compatible first-order measurements at once; choosing a map from it to \(M\) chooses one way to read them.[^stacks-diff]

For \(A=k[t]\), this gives \(\Omega_{A/k}=A\,dt\). Repeated use of the product rule yields

\[
d(t^n)=nt^{n-1}\,dt,\qquad df=f'(t)\,dt
\]

for every polynomial \(f\). Thus the familiar coefficient \(f'(t)\) appears after choosing the coordinate \(t\). The universal differential \(df\) is the object before that coordinate presentation.

There is a geometric construction of the same module. Form \(B=A\otimes_kA\), let \(\mu:B\to A\) multiply the factors, and put \(I=\ker\mu\). The two copies of \(A\) agree on the diagonal. Their differences

\[
\delta a=1\otimes a-a\otimes1
\]

generate the ideal \(I\). In \(B\), an exact multiplication identity gives

\[
\delta(ab)=(a\otimes1)\delta b+(b\otimes1)\delta a+
\delta a\,\delta b.
\]

Pass to \(I/I^2\). The last term disappears, just as the rectangle's corner disappeared, and the remaining terms satisfy the derivation rule. This produces a map \(\Omega_{A/k}\to I/I^2\).

To see that it is an isomorphism, use the square-zero algebra \(A\oplus\Omega_{A/k}\), with multiplication

\[
(a,\eta)(b,\theta)=(ab,a\theta+b\eta).
\]

The map \(a\otimes b\mapsto(ab,a\,db)\) is an algebra homomorphism. It sends \(I\) into \(0\oplus\Omega_{A/k}\), kills \(I^2\), and sends \(\delta a\) to \(da\). It therefore supplies an inverse on the generators:

\[
\Omega_{A/k}\cong I/I^2.
\]

The differential measures first-order separation along the diagonal. For a polynomial algebra, the two tensor factors really are independent coordinate copies. The quotient keeps their linear differences and removes products of those differences. No norm or limiting process is needed.

<!-- figure:diagonal -->

For \(A=k[t]\), write the two coordinates as \(t_1,t_2\). Then \(B=k[t_1,t_2]\), \(I=(t_2-t_1)\), and the first infinitesimal neighborhood of the diagonal has coordinate ring

\[
k[t_1,t_2]/(t_2-t_1)^2.
\]

Set \(\varepsilon=t_2-t_1\). Every polynomial satisfies

\[
f(t_2)-f(t_1)=f'(t_1)\varepsilon
\quad\text{modulo }\varepsilon^2.
\]

This is the rectangle's linear truncation in an algebraic form. The full difference still exists before taking the quotient. The quotient records an explicitly chosen level of resolution; it does not declare that the original polynomial had no higher terms.

## 5 Infinitesimal points and the classical derivative {#tangent}
The diagonal quotient retained a universal first-order difference. To read a particular motion from it, fix a point and let functions respond to an infinitesimal displacement. Let \(k\) now be a field, let \(A\) be a finite-type \(k\)-algebra, and let \(p:A\to k\) be a \(k\)-valued point. The dual numbers \(k[\varepsilon]/(\varepsilon^2)\) contain a nonzero infinitesimal whose square vanishes. A first-order displacement of \(p\) is a lift

\[
a\longmapsto p(a)+\varepsilon v(a).
\]

It is a \(k\)-algebra homomorphism precisely when \(v\) is \(k\)-linear and satisfies

\[
v(ab)=p(a)v(b)+p(b)v(a).
\]

Thus a tangent vector is a derivation with the module action evaluated at the point. For \(A=k[t]\), \(p(t)=x\), and \(v(t)=u\), the lift sends \(t\) to \(x+\varepsilon u\), and polynomial multiplication gives the exact identity

\[
f(x+\varepsilon u)=f(x)+\varepsilon f'(x)u.
\]

The first-order coefficient is the directional derivative. The higher powers vanish in the testing algebra.

Put \(\mathfrak m=\ker p\). A point derivation kills \(\mathfrak m^2\), because both factors vanish at \(p\). Conversely, every linear functional on \(\mathfrak m/\mathfrak m^2\) defines such a derivation by applying it to \([a-p(a)]\). Hence

\[
T_p=\operatorname{Hom}_k(\mathfrak m/\mathfrak m^2,k),
\qquad
T_p^*=\mathfrak m/\mathfrak m^2
\cong\Omega_{A/k}\otimes_Ak.
\]

The hypothesis that \(p\) is \(k\)-valued matters: at a general scheme point, differentials of the residue field over \(k\) also enter the comparison. The pointwise differential is \(d_pf=[f-f(p)]\), and \(v(f)\) is its evaluation on \(v\).

A morphism \(F:X\to Y\) of \(k\)-schemes pulls functions backward. Its differential accordingly begins as a map on cotangents,

\[
F^*\Omega_{Y/k}\longrightarrow\Omega_{X/k},
\qquad da\longmapsto d(F^*a).
\]

Dualizing at a \(k\)-valued point produces \(dF_p:T_pX\to T_{F(p)}Y\). Pullbacks compose, giving the chain rule. For \(s=f(t)\), it sends \(ds\) to \(f'(t)dt\); composing with \(z=g(s)\) gives

\[
d(g(f(t)))=g'(f(t))f'(t)\,dt.
\]

We can now return to the analytic definition. For a smooth real function near \(x\), Taylor's formula gives

\[
f(x+h)=f(x)+f'(x)h+h^2r(h),
\]

with \(r\) smooth near zero. In the local ring of smooth germs, \(h^2r(h)\in\mathfrak m^2\), so \(d_xf=f'(x)[h]\). Analytically, the same remainder satisfies \(h^2r(h)=o(|h|)\). The infinitesimal class and the limit recover the same first-order coefficient. For a merely differentiable function, the weaker remainder condition \(o(|h|)\) still defines its derivative; it need not give membership in the square of an ideal of smooth or \(C^1\) germs.

For example, the \(C^1\) germ \(f(h)=|h|^{3/2}\) has derivative zero at the origin and satisfies \(f(h)=o(|h|)\). Every finite sum of products of two vanishing \(C^1\) germs is \(O(h^2)\), whereas this germ is not. Thus the analytic first-order remainder can vanish faster than \(|h|\) without belonging to \(\mathfrak m^2\).

In the ring of \(C^1\) germs at zero, the classes \([h]\) and \([|h|^{3/2}]\) are linearly independent in \(\mathfrak m/\mathfrak m^2\). Differentiating a relation \(a h+b|h|^{3/2}\in\mathfrak m^2\) at zero forces \(a=0\), since every product of two vanishing germs has derivative zero; the preceding \(O(h^2)\) argument then forces \(b=0\). This algebraic cotangent space is therefore larger than the one-dimensional classical cotangent space. An algebraic point derivation can distinguish the class \([|h|^{3/2}]\) even though its classical derivative is zero. The function algebra and the chain rules required of its derivations determine which first-order measurements are permitted.

In the smooth case, the remainder above can be written explicitly as

\[
r(h)=\int_0^1(1-s)f''(x+sh)\,ds.
\]

For several variables, the corresponding expansion shows that the coordinate differences \(h_1,\ldots,h_n\) form a basis of \(\mathfrak m/\mathfrak m^2\), and

\[
d_pf=\sum_i\partial_i f(p)[h_i].
\]

Pairing this class with a vector \((v_1,\ldots,v_n)\) gives \(\sum_i\partial_i f(p)v_i\). The result is the usual linear approximation in every direction, assembled into one covector. The little-\(o\) condition makes that approximation unique: two candidate linear maps would have a difference that is both linear in \(h\) and \(o(\lVert h\rVert)\), so evaluation along each fixed direction forces their difference to vanish.

For global smooth geometry, the suitable universal differential also respects every smooth chain rule. This uses the \(C^\infty\)-ring structure on smooth functions, and its cotangent module gives ordinary smooth one-forms. The ordinary algebraic Kähler module of the underlying real algebra need not coincide with that module.[^joyce] The pointwise smooth-germ construction above gives the usual cotangent vectors directly. We have reached classical differentiation through a universal construction, while keeping track of the structure that makes the return valid.

## 6 An arithmetic derivative in the Gaussian integers {#arithmetic-derivative}
The square-zero test for a derivative requires no distance or limit. We can therefore replace real coordinates with arithmetic coefficients and ask which infinitesimal motions respect an equation. Consider

\[
B=\mathbf Z[i]=\mathbf Z[t]/(t^2+1).
\]
We differentiate relative to \(\mathbf Z\), so integers have differential zero. The defining relation gives

\[
0=d(i^2+1)=2i\,di.
\]
Since \(i\) is a unit, the universal module is

\[
\boxed{\Omega_{B/\mathbf Z}\cong (B/2B)\,di.}
\]
This derivative takes values in a torsion module. Wherever \(2\) is invertible, the module vanishes: the equation determines \(i\) with no relative first-order freedom. At the prime above \(2\), that infinitesimal rigidity fails.[^stacks-diff]

The universal property says exactly what this means for a measurement. A derivation into a \(B\)-module \(M\) is determined by \(D(i)=m\), and the equation requires \(2i\,m=0\), equivalently \(2m=0\). For \(a,b\in\mathbf Z\), it then gives \(D(a+bi)=bm\). Into the torsion-free module \(B\), every such derivation vanishes. Into \(B/2B\), there are nonzero ones. The infinitesimal response depends on the module used to receive it. Retaining the universal module makes all those possible responses available, instead of declaring that the derivative is zero after choosing only a torsion-free target.

The module also identifies an arithmetic invariant. Its annihilator is the ideal \((2i)=(2)\), which is the different of \(\mathbf Z[i]\) over \(\mathbf Z\). Its norm is \(4\), the absolute value of the discriminant \(-4\). The different marks the ramified locus; here

\[
2=-i(1+i)^2,
\]
so there is one prime ideal \((1+i)\) above \(2\), appearing with multiplicity two.[^different] Polynomial differentiation has become a way to locate arithmetic ramification.

Reducing the equation modulo primes makes this visible. Modulo \(5\),

\[
t^2+1=(t-2)(t+2),\qquad
B\otimes_{\mathbf Z}\mathbf F_5\cong\mathbf F_5\times\mathbf F_5.
\]
The fiber consists of two reduced rational points. Modulo \(3\), the polynomial is irreducible, so the fiber is \(\operatorname{Spec}\mathbf F_9\): one closed point of degree two. After extending scalars to an algebraic closure, it becomes two distinct geometric points. Both odd-prime fibers have vanishing differentials relative to their base fields, because each field factor is separable over its base field.

Modulo \(2\), put \(u=t+1\). Then

\[
t^2+1=(t+1)^2,\qquad
B\otimes_{\mathbf Z}\mathbf F_2\cong C:=\mathbf F_2[u]/(u^2).
\]
There is one doubled point. Differentiating \(u^2=0\) gives no relation in characteristic two, and

\[
\Omega_{C/\mathbf F_2}=C\,du.
\]
The geometric sheets have merged, and the infinitesimal structure retains the failure of separation.

<!-- figure:arithmetic -->

There is a derived refinement of the same calculation. The cotangent complex, defined below, is

\[
\mathbb L_{B/\mathbf Z}\simeq
\left[B\xrightarrow{\,2i\,}B\right]
\]
in degrees \(-1,0\). For a two-term complex \([E^{-1}\xrightarrow{q}E^0]\), cohomology means \(H^{-1}=\ker q\) and \(H^0=\operatorname{coker}q\). Globally the map \(2i\) is injective, so this complex has only \(\Omega_{B/\mathbf Z}\) as its cohomology. 

Because both terms of the displayed complex are free \(B\)-modules, its derived fiber is computed by tensoring the whole complex with \(\mathbf F_2\) term by term. Multiplication by \(2i\) then becomes zero. Taking cohomology first and forming only the ordinary fiber of \(\Omega_{B/\mathbf Z}\) instead can lose the kernel created by this change of coefficients.

Thus its derived fiber at \((1+i)\) is

\[
\mathbb L_{B/\mathbf Z}\otimes_B^{\mathbf L}\mathbf F_2
\simeq
\left[\mathbf F_2\xrightarrow{\,0\,}\mathbf F_2\right].
\]
Degree \(-1\) cohomology becomes nonzero at the ramified prime. Taking an ordinary fiber of \(\Omega\) would retain only the degree-zero term. Derived restriction also retains the effect of its failure to be flat. This is one reason a complex becomes the appropriate infinitesimal object.

## 7 Two maps with unexpectedly different infinitesimal behavior {#frobenius-and-artin-schreier}
The Gaussian example made the coefficient choice decisive: the relation \(2i\,di=0\) changes its effect when \(2\) vanishes. In characteristic \(p\), the same issue can make an entire map have zero differential while retaining substantial geometric content. Work over \(k=\mathbf F_p\), and compare two maps of affine lines. Their algebra maps are

\[
A=k[s]\longrightarrow B=k[t],\qquad
s\longmapsto t^p
\quad\text{or}\quad
s\longmapsto t^p-t.
\]
Both maps are finite free of degree \(p\): in each case \(B\) has a monic presentation of degree \(p\) over \(A\).

For Frobenius, the absolute differential sends \(ds\) to \(d(t^p)=0\). Relative to \(A\), the presentation

\[
B\cong A[T]/(T^p-s)
\]
likewise gives no relation on \(dt\), because \(p=0\) and \(ds=0\) in relative differentials. Thus \(\Omega_{B/A}=B\,dt\). Over an algebraic closure, every fiber has the form

\[
k^{\mathrm{alg}}[t]/(t^p-a)
\cong k^{\mathrm{alg}}[u]/(u^p),
\]
where \(b^p=a\) and \(u=t-b\). It is one point of length \(p\). Frobenius is a universal homeomorphism: its topology does not separate these infinitesimal multiplicities.[^frobenius]

For Artin–Schreier, the presentation is

\[
B\cong A[T]/(T^p-T-s).
\]
Relative differentiation gives \(-dt=0\), so \(\Omega_{B/A}=0\). The polynomial derivative is the unit \(-1\), and the map is finite étale. Each geometric fiber consists of \(p\) distinct points. Adding an element of \(\mathbf F_p\) to a root gives another root, producing the translations that permute the sheets.[^artin-schreier]

The complete-intersection cotangent complexes sharpen the comparison:

| Map | Absolute differential | Relative \(\Omega_{B/A}\) | Relative \(\mathbb L_{B/A}\) | Geometric fiber |
|---|---|---|---|---|
| \(s\mapsto t^p\) | \(ds\mapsto0\) | \(B\,dt\) | \([B\xrightarrow{0}B]\) | One point of length \(p\) |
| \(s\mapsto t^p-t\) | \(ds\mapsto-dt\) | \(0\) | \([B\xrightarrow{-1}B]\simeq0\) | \(p\) distinct points |

The complexes occupy degrees \(-1,0\). Vanishing relative differential data expresses infinitesimal rigidity, while the Artin–Schreier cover still has \(p\) sheets. Conversely, Frobenius has a zero absolute differential while its relative fibers have extensive infinitesimal structure.

We can test the difference with an actual dual number over a field containing the chosen root, for example \(k^{\mathrm{alg}}\). Suppose \(b\) lies above \(a\), and move it to \(b+r\varepsilon\), where \(\varepsilon^2=0\). Frobenius sends this to \(b^p=a\): every first-order displacement of the source becomes invisible in the target. A prescribed nonzero first-order displacement of \(a\) therefore cannot lift. Artin–Schreier instead sends it to \(a-r\varepsilon\). A target displacement \(a+c\varepsilon\) has the unique lift \(b-c\varepsilon\) near the chosen root \(b\). The \(p\) different roots give \(p\) possible starting points, and infinitesimal rigidity gives uniqueness after one starting point has been selected. Local uniqueness and a global covering fit together.

Values on \(\mathbf F_p\) alone reverse the apparent picture. Frobenius is the identity on these rational points. The Artin–Schreier polynomial evaluates to zero on all of them. Above \(s=0\) it has all \(p\) rational preimages; above a nonzero \(s\in\mathbf F_p\) it has none, although there are always \(p\) geometric preimages. A scheme map retains its algebra of functions and its behavior after extending scalars. Its values on one finite set do not determine that structure.

There is a separate way to recover the higher-order variation that Frobenius hides from the ordinary derivative. For a polynomial \(f\in k[t]\), define the Hasse derivatives by the exact expansion

\[
f(t+h)=\sum_{n\geq0}D^{[n]}f(t)h^n,
\qquad
D^{[n]}(t^m)=\binom mn t^{m-n}.
\]
For \(n>m\), the polynomial formula means zero. In characteristic zero, \(D^{[n]}=\frac1{n!}(d/dt)^n\). In characteristic \(p\), the coefficient definition continues to work without dividing by a factorial. In particular,

\[
(t+h)^p=t^p+h^p,\qquad D^{[p]}(t^p)=1,
\]
while every positive iterate of the ordinary derivative of \(t^p\) vanishes.[^hasse] Multiplying the two Taylor expansions gives the higher product rule

\[
D^{[n]}(fg)=\sum_{i+j=n}D^{[i]}f\,D^{[j]}g.
\]

For \(n=1\), this is the original Leibniz rule. At higher orders it retains the mixed products that first order discards.

A test algebra \(k[h]/(h^{N+1})\) first retains the Frobenius change at \(N=p\). Higher jets preserve higher powers of the displacement. Derived cotangent information preserves homological information about infinitesimal constraints; it does not supply a missing \(p\)th-order Taylor coefficient. These are two directions in which the first-order picture can be enriched.

A companion, [*When a Formal Logarithm Fails*](https://tensorgami.com/notes/when-a-formal-logarithm-fails.html), follows the attempted conversion of the multiplicative law into addition in characteristic three. A quadratic correction removes the first residual; a cubic cohomology class obstructs the next lift.

<!-- figure:frobenius -->

## 8 The cotangent complex retains the equations {#cotangent-complex}
Increasing jet order keeps more powers of a displacement. We now ask how to retain the equations that decide which displacements are allowed. Return to the rectangle, this time with its area constrained:

\[
xy=c.
\]

Over the reals, positive solutions describe rectangles of fixed area. Algebraically, let \(k\) be a field, \(c\in k\), and \(f=xy-c\). At a \(k\)-valued point \(p=(x_0,y_0)\) satisfying \(x_0y_0=c\), try the displacement \((x,y)=(x_0+a\varepsilon,y_0+b\varepsilon)\). The exact strip-and-corner calculation gives

\[
f(x_0+a\varepsilon,y_0+b\varepsilon)
=\varepsilon(y_0a+x_0b)+ab\varepsilon^2.
\]

Modulo \(\varepsilon^2\), the fixed-area condition is \(y_0a+x_0b=0\). The row

\[
J(p)=(y_0,x_0)
\]

takes a proposed coordinate motion to its first-order violation of the constraint. Allowed tangent directions form its kernel. We have obtained the Jacobian by asking which two strip changes cancel.

The cotangent calculation reads the same constraint backward. In the ambient polynomial algebra \(P=k[x,y]\), the relation has differential

\[
df=y\,dx+x\,dy.
\]

For \(A=P/(f)\), this expression must become zero, giving

\[
\Omega_{A/k}=
\frac{A\,dx\oplus A\,dy}{A(y\,dx+x\,dy)}.
\]

Kähler differentials take the cokernel of the map that sends the defining equation to its differential. The cotangent complex retains that map as well:

\[
\mathbb L_{A/k}\simeq
\left[Ae\xrightarrow{\ e\mapsto y\,dx+x\,dy\ }
A\,dx\oplus A\,dy\right].
\]

The symbol \(e\) records the equation's role. It lies in degree \(-1\); the coordinate differentials lie in degree zero. The polynomial \(xy-c\) is a non-zero-divisor in \(k[x,y]\), so this is the full cotangent complex. Its two free terms can be restricted to \(p\) by evaluating their coefficients. Dualizing gives

\[
\mathbb T_{X,p}\simeq
\left[k^2\xrightarrow{\ (a,b)\mapsto y_0a+x_0b\ }k\right].
\]

The kernel is the allowed linear motion. The cokernel records constraint violations that a correction of the coordinates cannot remove. Calling it an obstruction target still leaves a calculation to do: we must determine the violation produced at the next order.

The degrees here specify roles, rather than Taylor orders. An equation stays in degree \(-1\) whether it is quadratic or cubic. The resemblance to the boundary complex is the use of degrees and a square-zero differential to organize compatibility. The geometric boundary \(\partial\), the ordinary polynomial derivative, and the differential inside this complex act on different objects.

### A resolution that remembers the equation

In characteristic zero, an explicit resolution makes that distinction tangible. Introduce an odd relation generator \(\eta\) and the differential graded algebra

\[
K=k[x,y]\otimes\Lambda(\eta),\qquad
|\eta|=-1,\qquad d_K\eta=xy-c,\qquad d_Kx=d_Ky=0.
\]

Here \(d_K\) raises cohomological degree by one; the earlier geometric boundary lowers chain dimension. Its graded product rule is

\[
d_K(uv)=d_K(u)v+(-1)^{|u|}u\,d_K(v).
\]

In particular, \(d_K^2\eta=d_K(xy-c)=0\). Its degree-zero cohomology is \(A\), and its negative cohomology vanishes because multiplication by \(xy-c\) is injective. Take universal differentials, writing them as \(\delta\) to distinguish them from \(d_K\). The differential on the resulting cotangent module sends \(\delta\eta\) to \(\delta(xy-c)=y\,\delta x+x\,\delta y\). Tensoring with \(A\) yields exactly the two-term map above. The relation has been differentiated inside a resolution that remembers how it was imposed.[^lci]

### The general construction and its universal property

For an arbitrary ordinary algebra \(A\), one construction replaces it by a free simplicial polynomial resolution \(P_\bullet\to A\), takes \(\Omega_{P_\bullet/k}\), and tensors with \(A\). Normalizing the resulting simplicial module gives \(\mathbb L_{A/k}\), a complex in nonpositive cohomological degrees. Its degree-zero cohomology is

\[
H^0(\mathbb L_{A/k})\cong\Omega_{A/k}.
\]
The resolution supplies the additional degrees needed to retain relations and dependencies among relations, independently of a chosen presentation.[^lci]

Its universal property extends the familiar one:

\[
\boxed{
\operatorname{Map}_{\operatorname{Mod}_A}(\mathbb L_{A/k},M)
\simeq\operatorname{Der}^{\mathrm{derived}}_k(A,M).
}
\]
For a connective derived module \(M\), meaning cohomology in nonpositive degrees, the right side is the space of sections of the square-zero projection \(A\oplus M\to A\), taken in simplicial commutative \(k\)-algebras. In characteristic zero one may use the equivalent differential graded commutative models. The square-zero multiplication remains

\[
(a,m)(b,n)=(ab,an+bm).
\]
What changes is the setting: these are derived maps, with homotopies and their coherences. The left side is correspondingly a mapping space of derived modules. The stable formulation permits shifts of \(M\), exposing the extension groups that organize deformation problems. The product rule is still present; its universal object has acquired the degrees needed for derived compatibility.[^toen][^deformations]

The additional degrees should not be pictured as extra spatial coordinates attached to every point. They record how a space is constrained and how compatible infinitesimal data fit together. Passing to cohomology identifies what survives the differential; passing to an ordinary degree-zero module can discard some of those survivors. In a smooth algebra, \(\mathbb L_{A/k}\simeq\Omega_{A/k}[0]\), with \(\Omega\) locally free. The enriched construction then reduces to the familiar cotangent bundle. At singularities or in relative constructions, the same definition continues to apply without assuming that this reduction is possible.

A strict comparison is the origin inside the affine line:

\[
k[t]\longrightarrow k,\qquad t\longmapsto0.
\]
Since this is a surjection, \(\Omega_{k/k[t]}=0\). Yet the defining equation survives in

\[
\mathbb L_{k/k[t]}\simeq (t)/(t^2)[1]\cong k[1],
\]
where \(k[1]\) means \(k\) in degree \(-1\).[^lci] To see its purpose, prescribe an ambient infinitesimal motion by sending \(t\) to \(\varepsilon\) in \(k[\varepsilon]/(\varepsilon^2)\). The reduced point lies at the origin, but the thickened point cannot factor through the origin: such a factorization would send \(t\) to zero. There are no relative tangent directions, yet there is a constraint obstructing this prescribed motion. This is relative to the ambient line; the origin's intrinsic cotangent complex over \(k\) is zero.

For a complete intersection

\[
A=k[x_1,\ldots,x_m]/(f_1,\ldots,f_r),
\]
where the equations form a regular sequence, the full cotangent complex has the concrete model

\[
\mathbb L_{A/k}\simeq
\left[A^r\xrightarrow{\,J^{\mathsf T}\,}A^m\right],
\qquad
J_{ji}=\frac{\partial f_j}{\partial x_i}.
\]
The equation generators occupy degree \(-1\) and the coordinate differentials degree zero. At a \(k\)-valued point, dualizing its derived fiber gives the tangent complex

\[
\mathbb T_{X,p}\simeq\left[k^m\xrightarrow{\,J(p)\,}k^r\right]
\]
in degrees \(0,1\). Its \(H^0\) is the ordinary tangent space \(T_pX=\ker J(p)\); its \(H^1\) is \(\operatorname{coker}J(p)\), an obstruction target for lifting infinitesimal points. The virtual dimension is \(m-r\).[^lci]

The regular-sequence hypothesis matters. For an arbitrary ideal \(I\) in a polynomial algebra \(P\), the conormal complex

\[
\left[I/I^2\longrightarrow\Omega_{P/k}\otimes_P A\right]
\]
models the truncation \(\tau_{\geq-1}\mathbb L_{A/k}\); it need not be the full complex. Further degrees can be required, and a redundant list of equations cannot simply be treated as an independent free basis of \(I/I^2\). Even at a complete intersection, the pointwise Jacobian specifies linear directions and an obstruction target. Determining the actual nonlinear obstruction still requires the defining equations or equivalent formal deformation structure.

### Where the second-order residual lands

The obstruction can now be calculated. Let \(F=(f_1,\ldots,f_r)\) and \(F(p)=0\). A proposed continuation is

\[
p+\varepsilon v+\varepsilon^2w
\quad\text{over }k[\varepsilon]/(\varepsilon^3).
\]

Define \(q_p(v)\) to be the coefficient of \(z^2\) in the polynomial \(F(p+zv)\). Direct expansion gives

\[
F(p+\varepsilon v+\varepsilon^2w)
=\varepsilon J(p)v+
\varepsilon^2\bigl(J(p)w+q_p(v)\bigr)
\quad\text{modulo }\varepsilon^3.
\]

This coefficient definition uses no division by two and works in every characteristic. Once \(J(p)v=0\), the remaining violation is \(q_p(v)\). Changing the correction \(w\) adds \(J(p)w\), so its class in \(\operatorname{coker}J(p)\) is unchanged. A second-order lift exists exactly when

\[
[q_p(v)]=0\quad\text{in }\operatorname{coker}J(p).
\]

For the rectangle's constraint, \(q_p(a,b)=ab\): the discarded corner returns as the second-order violation. The next comparison shows when that corner can be compensated by a new strip.

## 9 A tangent direction that cannot continue through a node {#node-and-smoothing}
First consider the fixed-area curve \(xy=1\) at \((1,1)\). Its Jacobian is \(J=(1,1)\), so tangent directions have the form \(v=(a,-a)\). Their two linear strip contributions cancel, but their corner contributes

\[
q_p(v)=a(-a)=-a^2.
\]

Choose the correction \(w=(a^2,0)\). Since \(Jw=a^2\), it cancels the residual. Explicitly,

\[
(1+a\varepsilon+a^2\varepsilon^2)(1-a\varepsilon)
=1-a^3\varepsilon^3
\equiv1\pmod{\varepsilon^3}.
\]

The Jacobian is surjective, so its cokernel is zero: every constraint violation at this order can be removed by adjusting the coordinates. The additional strip of area \(a^2\varepsilon^2\) repairs the corner's area \(-a^2\varepsilon^2\).

### Why the node cannot repair the corner

Now set the area to zero and move the base point to the origin. The curve

\[
X=\operatorname{Spec}A,\qquad A=k[x,y]/(xy),
\]
is the union of the two coordinate axes. Every direction \((a,b)\) is tangent at the origin: the equation has zero linear term there. Explicitly,

\[
x\longmapsto a\varepsilon,\qquad
y\longmapsto b\varepsilon
\]
defines a point over \(k[\varepsilon]/(\varepsilon^2)\), since \(xy\) becomes zero.

To continue this point one order further, try

\[
x\longmapsto a\varepsilon+c\varepsilon^2,\qquad
y\longmapsto b\varepsilon+d\varepsilon^2
\]
in \(k[\varepsilon]/(\varepsilon^3)\). Its product is \(ab\varepsilon^2\). Consequently a lift exists exactly when

\[
\boxed{ab=0.}
\]
Directions along either branch extend. A mixed direction such as \((1,1)\) is valid to first order but cannot continue to second order. The previously discarded product of two changes has become the obstruction.

Over the reals, the same calculation distinguishes these algebraic tangent directions from actual velocities of curves. If a differentiable curve through the origin has \(x(t)=at+o(|t|)\) and \(y(t)=bt+o(|t|)\), then \(x(t)y(t)=ab\,t^2+o(t^2)\). Remaining on the node forces \(ab=0\). Thus the two-dimensional Zariski tangent space includes directions that no differentiable curve on the node can realize as its initial velocity. It is the space of first-order solutions of the equations; the next infinitesimal order detects the compatibility that first order could not test.

<!-- figure:node -->

The cotangent complex organizes the calculation:

\[
\mathbb L_{A/k}\simeq
\left[A\xrightarrow{\,\binom yx\,}A\,dx\oplus A\,dy\right].
\]
At the origin its derived fiber is \([k\xrightarrow0k^2]\). Dualizing gives two tangent directions and a one-dimensional obstruction target. The quadratic expression \(ab\) takes values in that target. The complex explains where the obstruction belongs; the equation \(xy\) determines its value.

Here \(J(0,0)=0\), so the correction term \(Jw\) always vanishes. No second-order strip is available to compensate for a mixed corner. The zero map in the point's tangent complex explains this failure: all coordinate directions pass the first-order test, and the entire one-dimensional equation space survives as a target for the next-order residual.

Now allow the equation to vary:

\[
xy=s.
\]
The mixed infinitesimal motion becomes possible if the base moves by \(s=ab\varepsilon^2\). Nonzero fibers are smooth, and the special fiber is the node. For deformations of the affine scheme itself, the first-order deformation module is

\[
T^1_A=\operatorname{Ext}^1_A(\mathbb L_{A/k},A)
\cong A/(x,y)\cong k.
\]
The constant perturbation of the equation supplies its generator, realized by this smoothing family.[^deformations] Moving a point inside the fixed node and deforming the node are distinct problems; the family shows how they interact.

There is a useful qualification. Globally the displayed map \(A\to A^2\) is injective: an element annihilated by both \(x\) and \(y\) must vanish. Therefore \(\mathbb L_{A/k}\) is quasi-isomorphic to \(\Omega_{A/k}\) in degree zero. Its nonzero degree \(-1\) cohomology at the origin comes from derived restriction of a nonprojective module. The ordinary cotangent fiber is \(\Omega_{A/k}\otimes_Ak\cong k^2\), while the derived fiber also retains the degree \(-1\) term. This example exhibits the importance of derived base change, even when the global complex has no negative cohomology.

## 10 The same projective line has two different self intersections {#derived-self-intersections}
At the node, derived restriction retained a relation that an ordinary pointwise fiber lost. There is also information in how the local infinitesimal data fit together along a whole space. An embedding carries such data through its normal bundle. Compare a line \(L\cong\mathbf P^1\) in \(\mathbf P^2\) with a fiber \(F=\mathbf P^1\times\{q\}\) in \(\mathbf P^1\times\mathbf P^1\), choosing a \(k\)-rational point \(q\), for example \([1:0]\). Their intrinsic cotangent bundles are both \(\mathcal O_{\mathbf P^1}(-2)\). Their ordinary self-intersections are both the whole \(\mathbf P^1\). Yet the self-intersection numbers are \(1\) and \(0\).

The missing distinction lies in their normal bundles: the ambient tangent directions along each embedded curve, modulo the curve's own tangent directions. For the line,

\[
N_{L/\mathbf P^2}=\mathcal O_L(1).
\]
Its defining linear equation gives the resolution

\[
0\longrightarrow\mathcal O_{\mathbf P^2}(-1)
\xrightarrow{\ell}\mathcal O_{\mathbf P^2}
\longrightarrow\mathcal O_L\longrightarrow0.
\]
Tensoring with \(\mathcal O_L\) makes the differential zero. Thus the derived self-intersection \(Z=L\times^{\mathbf R}_{\mathbf P^2}L\) retains

\[
H^0(\mathcal O_Z)=\mathcal O_L,
\qquad H^{-1}(\mathcal O_Z)=\mathcal O_L(-1).
\]
The second term is \(\operatorname{Tor}_1\), the conormal bundle. It records the defining equation imposed a second time. The expected intersection dimension is \(1+1-2=0\), although the ordinary intersection has dimension one. At each point, the tangent complex has one tangent direction and one obstruction direction, giving virtual dimension \(1-1=0\).[^toen]

For the fiber, the normal direction is the fixed tangent space \(T_q\mathbf P^1\), so

\[
N_{F/(\mathbf P^1\times\mathbf P^1)}\cong\mathcal O_F.
\]
The corresponding divisor resolution uses \(\mathcal O(0,-1)\), which restricts to \(\mathcal O_F\). Hence the derived self-intersection \(W\) has \(H^0(\mathcal O_W)=\mathcal O_F\) and \(H^{-1}(\mathcal O_W)=\mathcal O_F\). The pointwise tangent and obstruction dimensions agree with the line example, but the global conormal bundles differ.

The alternating structure-sheaf classes expose the numerical distinction:

\[
[Z]^{K\text{-vir}}=[\mathcal O_L]-[\mathcal O_L(-1)],
\qquad
[W]^{K\text{-vir}}=[\mathcal O_F]-[\mathcal O_F]=0.
\]
Here \(\chi(E)=\sum_i(-1)^i\dim_k H^i(\mathbf P^1,E)\) is the coherent-sheaf Euler characteristic. For example, \(\mathcal O\) has one global section and no higher cohomology, while \(\mathcal O(-1)\) has no cohomology. The Euler characteristics of the displayed virtual classes are

\[
\chi(\mathcal O_{\mathbf P^1})-
\chi(\mathcal O_{\mathbf P^1}(-1))=1-0=1,
\qquad 1-1=0.
\]
Equivalently, their virtual Chow classes are \(c_1(N)\cap[\mathbf P^1]\): the degree of \(\mathcal O(1)\) is \(1\), and the degree of the trivial bundle is zero.[^toen][^intersection]

Moving the embeddings gives a geometric check. A line in \(\mathbf P^2\) meets a distinct line in one point, so moving one copy of \(L\) produces the count \(1\). A fiber \(\mathbf P^1\times\{q\}\) is disjoint from \(\mathbf P^1\times\{q'\}\) when \(q'\ne q\), so moving one copy of \(F\) produces the count \(0\). Before moving, each copy overlaps itself everywhere. The virtual classes retain the intersection information compatible with those motions. Their numbers measure intersection classes, rather than the number of points in the literal overlapping sets.

<!-- figure:self-intersection -->

Classical intersection theory already computes these numbers through normal bundles and refined intersections. Derived geometry retains that information in the intersection object itself. The example also identifies what a pointwise derivative loses: identical intrinsic spaces and identical tangent-complex dimensions can have different global normal geometry. Retaining the conormal bundle makes the intersection count compatible with the geometry of the embedding.

## 11 Higher operations distinguish identical tangent complexes {#higher-operations}
The intersection example recovered how infinitesimal data vary along a curve. A further question concerns the nonlinear law at a single point. Return to the node \(xy=0\). Its second-order residual was the rectangle's corner: moving by \((a\varepsilon,b\varepsilon)\) produced \(ab\varepsilon^2\). The first-order tangent complex retained two directions and one obstruction component. To recover the condition that a motion must satisfy, we also needed the rule that combines those directions into \(ab\). Higher brackets record such interactions.

### Polarizing the corner

Work over a field \(k\) of characteristic zero. The node's quadratic expression is \(Q(a,b)=ab\). We can recover its bilinear interaction by applying two displacements, \(w=(a,b)\) and \(z=(c,d)\), and subtracting their separate effects:

\[
\begin{aligned}
B(w,z)&=Q(w+z)-Q(w)-Q(z)\\
&=(a+c)(b+d)-ab-cd=ad+bc.
\end{aligned}
\]

These are the two mixed corners: the first displacement's horizontal change combines with the second's vertical change, and vice versa. The expression is linear in each displacement separately. Conversely,

\[
Q(w)=\frac12 B(w,w),
\]

because putting the same displacement in both slots counts its corner twice. This recovery of a homogeneous polynomial from a multilinear operation is called polarization.

We can put this calculation directly on a graded space. Let the two tangent inputs \(u_x,u_y\) have degree \(1\), and let an obstruction generator \(v\) have degree \(2\):

\[
\mathfrak g_{\mathrm{node}}^1=k u_x\oplus k u_y,
\qquad \mathfrak g_{\mathrm{node}}^2=k v.
\]

Give it zero linear differential and a binary bracket with

\[
\ell_2(u_x,u_y)=\ell_2(u_y,u_x)=v,
\qquad
\ell_2(u_x,u_x)=\ell_2(u_y,u_y)=0.
\]

The bracket is graded antisymmetric: exchanging homogeneous inputs contributes \(-(-1)^{|u_x||u_y|}=+1\). Thus these odd-degree inputs have a symmetric bracket, exactly as the polarized expression requires. Set all higher brackets and every bracket involving \(v\) to zero. The output component then records a residual of the equation, while the two input components record the displacements that can create it.

For coefficients \(a,b\) in the maximal ideal of a local Artin \(k\)-algebra with residue field \(k\), put \(\alpha=au_x+bu_y\). The compatibility equation in this binary model, called the Maurer–Cartan equation, is

\[
\frac12\ell_2(\alpha,\alpha)
=\frac12(ab+ba)v=ab\,v=0.
\]

Taking \(a=a_0\varepsilon\) and \(b=b_0\varepsilon\) recovers the earlier test: the equation vanishes modulo \(\varepsilon^2\), and its residual modulo \(\varepsilon^3\) is \(a_0b_0\varepsilon^2v\). The bracket consumes two tangent inputs and produces precisely the obstruction that the rectangle calculation identified.

After shifting by \([1]\), the degree-one inputs become the degree-zero tangent directions, and the degree-two output becomes the degree-one obstruction component. This is exactly the node's two-term tangent complex. Its zero differential records the vanishing Jacobian at the origin, so every direction is allowed by the linear test. The bracket then distinguishes the directions: either axis alone has zero self-bracket, while a mixture has the residual \(ab\). A two-term space with no operations would leave this distinction unspecified. The multilinear response supplies the missing law, and the compatibility equation applies that law to the proposed motion.

### When three inputs are needed

The cotangent complex therefore supplies linear data, while a formal deformation law includes operations on those data. Different formal neighborhoods can produce the same pointwise complex. To see why a binary operation may still be insufficient, put

\[
A_n=k[x]/(x^n),\qquad n\geq2.
\]

At the origin, the cotangent complex has the presentation

\[
\mathbb L_{A_n/k}
\simeq
\left[A_n e\xrightarrow{\,nx^{n-1}\,}A_n\,dx\right]
\quad\text{in degrees }-1,0.
\]

Its derived fiber is therefore

\[
\mathbb L_{A_n/k}\otimes^{\mathbf L}_{A_n}k
\simeq[k\xrightarrow{0}k].
\]

Dualizing gives a tangent complex with one direction in degree \(0\) and one obstruction component in degree \(1\), for every \(n\geq2\). Thus the square and cube relations have identical tangent complexes at the origin. Their global cotangent objects differ: they live over different algebras, and even

\[
\Omega_{A_n/k}\simeq A_n\,dx/(x^{n-1}dx)
\]

has \(k\)-dimension \(n-1\).

To recover the difference at the point, retain how its infinitesimal directions interact. Test the proposed displacement \(x=\varepsilon\) in

\[
B_m=k[\varepsilon]/(\varepsilon^{m+1}).
\]

It satisfies \(x^n=0\) precisely when \(m<n\). The square relation permits the first-order displacement but blocks it at order two. The cube relation permits it through order two and blocks it at order three. A correction \(x=\varepsilon+c_2\varepsilon^2+\cdots\) cannot remove the leading residual \(\varepsilon^n\): its coefficient remains \(1\).

<!-- figure:probes -->

The obstruction component identifies a place for a failure to land. The higher operation determines when the failure occurs and what expression produces it. For \(x^2=0\), two changes interact. For \(x^3=0\), the first residual combines three. The extra operation retains that arity even when the underlying tangent complexes agree.

There is a small model that retains this information completely. Use cohomological grading and an \(L_\infty\)-algebra \(\mathfrak g_n\) with

\[
\mathfrak g_n^1=k u,\qquad
\mathfrak g_n^2=k v.
\]

Take every bracket to be zero except

\[
\ell_n(u,\ldots,u)=n!\,v.
\]

Here \(\ell_r\) has degree \(2-r\), and the brackets are graded antisymmetric. Because \(u\) has odd degree, antisymmetry permits repeated copies of \(u\). Declare every bracket with an input \(v\) to vanish. All the \(L_\infty\) identities then hold: any potentially nonzero composition first produces \(v\), and its next bracket is zero.

For an ordinary local Artin \(k\)-algebra \(R\) with residue field \(k\), a candidate displacement is \(\alpha=t u\), with \(t\in\mathfrak m_R\). Its Maurer–Cartan equation is

\[
\sum_{r\geq1}\frac1{r!}\ell_r(\alpha,\ldots,\alpha)=0.
\]

In this model the equation reduces exactly to

\[
\frac1{n!}\ell_n(tu,\ldots,tu)=t^n v=0.
\]

The coefficients \(2\) and \(6\) can be seen without invoking the general theorem. Polarizing the square gives

\[
(a+b)^2-a^2-b^2=2ab.
\]

Polarizing the cube requires three displacements. Its third mixed finite difference is

\[
\begin{aligned}
&(a+b+c)^3-(a+b)^3-(a+c)^3-(b+c)^3\\
&\qquad+a^3+b^3+c^3=6abc.
\end{aligned}
\]

The subtraction removes terms supported on fewer than three inputs. The surviving coefficient counts the six orders in which the three inputs can enter the product. On the diagonal, dividing by that count recovers the original polynomial. Accordingly, the square and cube models have

\[
\frac12\ell_2(tu,tu)=\frac12(2t^2)v=t^2v,
\qquad
\frac16\ell_3(tu,tu,tu)=\frac16(6t^3)v=t^3v.
\]

For general \(n\), polarization supplies the coefficient \(n!\), and the same factorial in the Maurer–Cartan series removes the repeated counting. A binary bracket detects the square relation; for the cube, the binary bracket vanishes and a ternary bracket supplies the first residual.

The number of inputs and the homological degree answer different questions. Every \(\ell_r\) has degree \(2-r\), so \(r\) degree-one inputs still produce a degree-two output. Increasing the arity does not create a new obstruction degree. Higher jets instead increase which powers of a displacement the test algebra retains. Here the graded space has a tangent component and an obstruction component; its operations specify the nonlinear law between them.

In general, the higher identities constrain how the linear differential and several brackets compose. The central-output pattern used here is special: arbitrary formal deformation problems can require nonzero nested operations as well.

### Reconstructing the formal equation

The completed Chevalley–Eilenberg algebra makes reconstruction explicit. With the sign of the dual relation generator chosen accordingly, it is

\[
C^*(\mathfrak g_n)
=k[[x]]\otimes\Lambda(\eta),
\qquad |x|=0,\quad |\eta|=-1,
\qquad dx=0,\quad d\eta=x^n.
\]

Its degree-zero cohomology is \(k[[x]]/(x^n)=A_n\). Its negative cohomology vanishes because multiplication by \(x^n\) in \(k[[x]]\) is injective. The algebra is consequently a resolution of the actual formal neighborhood. The linear differential of \(\mathfrak g_n\) is zero in every case; the different higher brackets reconstruct the different equations.

The shift also matches the earlier calculation: the tangent complex is \(\mathfrak g_n[1]\), putting \(u\) in degree \(0\) and \(v\) in degree \(1\). Forgetting the higher brackets leaves precisely the two-component complex shared by the square and cube. Retaining the brackets tells us which polynomial equation connects its components. On derived Artin test algebras, the correspondence includes the homotopies of the deformation space as well as its ordinary solutions.

Characteristic-zero formal moduli theory turns this example into a general principle. The tests are augmented connective derived Artin \(k\)-algebras with finite-dimensional total homotopy and residue field \(k\). A formal moduli problem assigns spaces to these tests, takes \(k\) to a contractible space, and preserves homotopy pullbacks whenever at least one map into the common target is surjective on \(\pi_0\). Over a characteristic-zero field, such problems are equivalent to differential graded Lie models, or \(L_\infty\) models, with their full homotopy structure. Their underlying shifted tangent complexes supply the linear data; their operations retain the nonlinear compatibility conditions.[^formal-moduli]

## 12 Spectral differentiation and calculations in K theory {#spectral-differentiation}
The higher brackets retained nonlinear laws over a characteristic-zero field. We now enlarge the coefficient objects so that multiplication and its infinitesimal responses can carry stable homotopy information. The same rectangle calculation still controls first order: in an ordinary square-zero extension, the generator \(t\) can move to \((t,m)\), and the product rule gives

\[
(t,m)^n=(t^n,nt^{n-1}m).
\]

There are \(n\) possible positions for the one changed factor; every term containing two changed factors vanishes. This is the same strip calculation, iterated through a product of \(n\) factors. A derivative of a free polynomial algebra is therefore determined by the response of its generator.

In spectral algebra, multiplication comes with coherent homotopies and the coefficients form spectra. A spectrum records compatible information across degrees, including stable homotopy groups. The square-zero interpretation still works. Its universal measurement must now retain families of derivations and homotopies between them, as well as their individual values.

Let \(R\to A\) be a map of \(E_\infty\)-ring spectra and \(M\) an \(A\)-module spectrum. Form the square-zero extension \(A\oplus M\to A\). Define the space of \(R\)-derivations by

\[
\operatorname{Der}_R(A,M)
=\operatorname{Map}_{\mathrm{CAlg}_R/A}(A,A\oplus M).
\]

A point is a lift of the identity of \(A\); the space also records homotopies between lifts. The spectral cotangent complex represents this space:

\[
\operatorname{Map}_{\mathrm{Mod}_A}(\mathbb L_{A/R},M)
\simeq\operatorname{Der}_R(A,M).
\]

Thus the derivative is an \(A\)-module spectrum, and its coefficients must be \(A\)-module spectra. Its homotopy groups yield topological André–Quillen homology, usually abbreviated TAQ.[^higher-algebra]

The coefficient condition has content. Multiplication by an invertible element of \(A\) must act invertibly on every \(A\)-module. For example, the degree-two Bott element of \(KU\) forces its modules to be periodic. A nonzero coefficient spectrum with homotopy concentrated in degree zero cannot simply be substituted into a \(KU\)-linear derivation problem. The choice of linear measurements already incorporates part of the algebra being differentiated.

<a id="spectral-free-responses"></a>

### The free example and its families of responses

For a free algebra \(A=\operatorname{Sym}_R(V)\), the formula is particularly direct:

\[
\mathbb L_{A/R}\simeq A\otimes_R V.
\]

A derivation is determined by its value on the generating module \(V\). The free adjunction identifies lifts into \(A\oplus M\) with lifts of \(V\to A\), whose space is \(\operatorname{Map}_R(V,M)\); extension of scalars gives the displayed representing object.

For one generator \(V=R\), this says \(\mathbb L_{A/R}\simeq A\), the spectral version of the free rank-one module \(A\,dt\). More explicitly,

\[
\operatorname{Der}_R(A,M)\simeq
\operatorname{Map}_{\operatorname{Mod}_A}(A,M)
\simeq\Omega^\infty M.
\]

Here \(\Omega^\infty\) extracts the underlying infinite loop space of a spectrum. Its points give values for the generator's response, and its homotopy groups give higher families of responses. For an ordinary ring \(k\), write \(Hk\) for its Eilenberg–Mac Lane ring spectrum: \(\pi_0(Hk)=k\), and its other homotopy groups vanish. With \(R=H\mathbf Q\), the degree-zero calculation on polynomial functions is exactly the displayed formula \(t^n\mapsto nt^{n-1}m\).

The free algebra itself remembers a difference that ordinary polynomial notation can conceal:

\[
\operatorname{Sym}_R(V)
\simeq\bigoplus_{j\geq0}
(V^{\otimes_R j})_{h\Sigma_j}.
\]

For \(R=H\mathbb Q\) and \(V=H\mathbb Q\) in degree zero, positive homology of the finite symmetric groups vanishes, and this algebra is \(H(\mathbb Q[t])\). For \(R=H\mathbb F_2\) and \(V=H\mathbb F_2\) in degree zero, its weight-two summand contains

\[
H_1(B\Sigma_2;\mathbb F_2)=\mathbb F_2.
\]

This small homology group can be calculated using boundaries. The transposition group is \(\Sigma_2=C_2\), and its classifying space is \(\mathbf{RP}^{\infty}\). This space has one cell in each dimension. Its positive-dimensional integral cellular differentials alternate between multiplication by \(2\) and zero. With \(\mathbf F_2\) coefficients, they all become zero:

\[
\cdots\longrightarrow\mathbf F_2
\xrightarrow{0}\mathbf F_2
\xrightarrow{0}\mathbf F_2
\xrightarrow{0}\mathbf F_2.
\]

The one-cell survives in homology, giving \(H_1=\mathbf F_2\). With rational coefficients, the map from degree two to degree one is multiplication by \(2\), so that particular class is a boundary.[^hatcher]

The free spectral algebra consequently has positive homotopy that \(H(\mathbb F_2[t])\) lacks. The extra information comes from making permutations of factors compatible through homotopies. It is different from retaining a higher power in a Taylor expansion. The spectral cotangent construction and the cotangent complex of simplicial commutative algebras generally differ in positive characteristic. Rationally the comparison behaves much more simply.[^higher-algebra]

<a id="spectral-thom-orientations"></a>

### The rectangle becomes a change of orientation

The decisive square-zero calculation is a version of the opening rectangle with both unchanged sides equal to one:

\[
(1,m)(1,n)=(1,m+n),\qquad (1,m)^{-1}=(1,-m).
\]

The product of the two changes is the missing corner. Units that reduce to one therefore form an *additive* infinite loop space, denoted \(1+M\). Spectrally, this space is \(\Omega^\infty M\), including its coherent addition and homotopies.

To see why this calculation brings K-theory into the derivative of complex cobordism, we need the construction of a Thom algebra. Let \(R\) be an \(E_\infty\)-ring spectrum. The space \(\operatorname{Pic}(R)\) classifies invertible \(R\)-module spectra: spectral analogues of one-dimensional lines. A map of grouplike \(E_\infty\)-spaces

\[
f:G\longrightarrow\operatorname{Pic}(R)
\]

specifies a coherently multiplicative family of such lines. Combining labels in \(G\) tensors their lines. The Thom algebra \(A=Mf\) is their multiplicative colimit. An \(A\)-orientation is a compatible trivialization of all these lines after extending coefficients to \(A\). The identity map of the Thom algebra supplies a canonical reference orientation.[^thom-orientations]

The familiar Thom-class notation suggests the compatibility: \(u(E\oplus F)=u(E)u(F)\). Change the reference trivialization by a unit \(1+m(E)\). The square-zero calculation then reads

\[
\begin{aligned}
u'(E)&=u(E)(1+m(E)),\\
u'(E\oplus F)
&=u(E)u(F)(1+m(E))(1+m(F)),\\
m(E\oplus F)&=m(E)+m(F).
\end{aligned}
\]

These formulas describe relative changes of trivializations; the notation suppresses the line identifications. We require compatibility through all the \(E_\infty\) homotopies, not just this equality of individual Thom classes. An infinitesimal change of multiplicative orientation is consequently an additive, coherently compatible measurement of the labeling family.

The universal property of the Thom algebra makes this statement precise. Lifts of its identity to \(A\oplus M\) are lifts of the reference orientation. The zero section \(A\to A\oplus M\) supplies a reference lift, and the relative changes from it are maps of \(E_\infty\)-groups to \(1+M\). Hence

\[
\begin{aligned}
\operatorname{Der}_R(A,M)
&\simeq\operatorname{Map}_{E_\infty\text{-groups}}(G,1+M)\\
&\simeq\operatorname{Map}_{\mathrm{Sp}}(B^\infty G,M)\\
&\simeq\operatorname{Map}_{\mathrm{Mod}_A}
(A\wedge B^\infty G,M).
\end{aligned}
\]

Here \(B^\infty G\) is the *connective spectrum associated to the infinite loop group* \(G\), with \(\Omega^\infty B^\infty G\simeq G\). It is not the ordinary suspension spectrum of the underlying space. If \(M\) is nonconnective, its additive infinite loop space corresponds to \(\tau_{\geq0}M\); mapping spaces from the connective spectrum \(B^\infty G\) into this cover and into \(M\) agree. The final equivalence is extension of scalars from spectra to \(A\)-modules.

We have thus identified the representing module:

\[
\mathbb L_{Mf/R}\simeq Mf\wedge B^\infty G.
\]

This is the Thom cotangent theorem. The deep input is the Thom algebra's universal orientation property; the square-zero strip calculation explains why its answer is additive and why the labeling spectrum occurs.[^rasekh-stonek]

<a id="spectral-mu"></a>

### Why the labeling spectrum for MU is shifted K-theory

Finite complex vector bundles combine by direct sum. Group completion permits formal differences of bundles and gives \(\mathbf Z\times BU\); the integer records virtual rank. Connective complex K-theory \(ku\) is the spectrum associated to this full group completion. The complex J-map associates to a bundle its fiberwise one-point-compactified sphere; virtual subtraction becomes inversion of this sphere family. Complex cobordism \(MU\), however, is the Thom algebra of the complex \(J\)-map on the *rank-zero* family \(BU\). Removing rank gives

\[
\begin{aligned}
\Omega^\infty ku&\simeq\mathbf Z\times BU,\\
B^\infty BU
&\simeq\operatorname{fib}(ku\xrightarrow{\mathrm{rank}}H\mathbf Z)
=ku\langle2\rangle.
\end{aligned}
\]

The notation \(ku\langle2\rangle\) means the cover with homotopy below degree two removed. The rank map is an isomorphism on \(\pi_0\), and \(\pi_1ku=0\). Bott periodicity supplies the remaining calculation:

\[
\pi_jku=\begin{cases}
\mathbf Z,&j=0,2,4,\ldots,\\
0,&\text{otherwise},
\end{cases}
\qquad
\beta:\Sigma^2ku\longrightarrow ku.
\]

Multiplication by the degree-two Bott element \(\beta\) is an isomorphism in every degree at least two. Its source has no homotopy in lower degrees, so it identifies \(\Sigma^2ku\) with the rank-zero cover. Thus the associated spectrum is \(bu\simeq\Sigma^2ku\), and the Thom formula gives

\[
\boxed{\mathbb L_{MU/\mathbb S}\simeq MU\wedge\Sigma^2ku.}
\]

For any \(MU\)-module \(M\), equivalently,

\[
\operatorname{Der}_{\mathbb S}(MU,M)
\simeq\operatorname{Map}_{\mathrm{Sp}}(\Sigma^2ku,M).
\]

K-theory appears because it is the additive stable theory of the bundles labeling the Thom construction. The derivative measures coherent first-order changes of their orientations. The double suspension records the removal of virtual rank.[^basterra-mandell]

A small check makes the spectral contribution visible:

\[
\pi_0\mathbb L_{MU/\mathbb S}=0,\qquad
\pi_1\mathbb L_{MU/\mathbb S}=0,\qquad
\pi_2\mathbb L_{MU/\mathbb S}=\mathbf Z.
\]

The last equality uses connectivity and the lowest-degree tensor product \(\pi_0(MU\wedge ku)=\mathbf Z\). The isolated zeroth-ring map is \(\mathbf Z\to\mathbf Z\), whose ordinary relative differential is zero. Its degree-zero description misses this degree-two response. Higher integral degrees require a genuine smash-product calculation; one cannot simply tensor all homotopy groups.

<a id="spectral-ku"></a>

### KU begins with tensoring lines and then inverts Bott

The two Thom constructions use different ways of combining bundle labels. The following guide keeps their operations and associated spectra together.

| Thom algebra | Labels and operation | Thom map | Associated connective spectrum |
|---|---|---|---|
| \(MU\) | Rank-zero virtual complex bundles in \(BU\), combined by direct sum | Complex \(J\)-map | \(B^\infty BU\simeq\Sigma^2ku\) |
| \(A_0=\Sigma^\infty_+K(\mathbf Z,2)\), before Bott localization | Complex line bundles in \(K(\mathbf Z,2)\simeq\mathbf{CP}^{\infty}\), combined by tensor product | Constant sphere-line map | \(B^\infty K(\mathbf Z,2)\simeq\Sigma^2H\mathbf Z\) |

The second row describes \(A_0\). Periodic \(KU\) is obtained from it by Bott localization, which extends the cotangent's coefficients. The factorial homology calculation below explains why the resulting cotangent module is rational.

For periodic complex K-theory, the result is

\[
\boxed{\mathbb L_{KU/\mathbb S}\simeq KU_{\mathbb Q}.}
\]

Why does the linear response become rational when \(KU\) itself has integral homotopy? Start with another bundle family. The space \(\mathbf{CP}^{\infty}=K(\mathbf Z,2)\) classifies complex *line* bundles, with multiplication given by tensor product. This differs from the direct sum on \(BU\). In degree-zero K-theory the same tensor operation gives the rectangle-like law

\[
x=[L]-1,\quad y=[N]-1,\qquad
[L\otimes N]-1=(1+x)(1+y)-1=x+y+xy.
\]

At first order its corner disappears. In ordinary cohomology its first Chern class is exactly additive:

\[
c_1(L\otimes N)=c_1(L)+c_1(N).
\]

This exact additivity will let us calculate the multiplication in homology.[^hatcher-bundles]

The structured Snaith theorem presents \(KU\) as

\[
A_0=\mathbb S[K(\mathbf Z,2)]
=\Sigma^\infty_+\mathbf{CP}^{\infty},\qquad
KU\simeq A_0[\beta^{-1}],
\]

where \(\beta\in\pi_2A_0\) comes from the inclusion \(\mathbf{CP}^1\simeq S^2\). This is an equivalence of \(E_\infty\)-algebras, using the structured refinement of Snaith's theorem.[^stonek] The algebra \(A_0\) is the Thom algebra of the constant map to the sphere line. Since the connective spectrum associated to \(K(\mathbf Z,2)\) is \(\Sigma^2H\mathbf Z\),

\[
\mathbb L_{A_0/\mathbb S}\simeq A_0\wedge\Sigma^2H\mathbf Z.
\]

Inverting a class introduces no independent first-order choice. The ordinary inverse calculation already suggests the reason:

\[
0=D(\beta\beta^{-1})
=\beta D(\beta^{-1})+\beta^{-1}D(\beta),\qquad
D(\beta^{-1})=-\beta^{-2}D(\beta).
\]

The response of the inverse is forced by the response of the original class. The spectral localization theorem makes this precise, including coherent lifts: \(\mathbb L_{KU/A_0}\simeq0\), and extension of coefficients gives

\[
\mathbb L_{KU/\mathbb S}\simeq KU\wedge\Sigma^2H\mathbb Z.
\]

This step retains an integral Eilenberg–Mac Lane spectrum. We still need to explain where the rationals enter.[^rasekh-stonek]

<a id="spectral-factorial-localization"></a>

### The explicit factorial calculation

Let \(c=c_1\) generate \(H^2(\mathbf{CP}^{\infty};\mathbf Z)\), so its cohomology ring is \(\mathbf Z[c]\). Under the tensor-product map \(\mu\), additivity gives

\[
\mu^*c=c\otimes1+1\otimes c,\qquad
\mu^*c^n=\sum_{i=0}^n\binom ni c^i\otimes c^{n-i}.
\]

Let \(b_n\in H_{2n}(\mathbf{CP}^{\infty};\mathbf Z)\) be dual to \(c^n\), with \(b_0=1\). Evaluate the displayed binomial expansion on \(b_i\otimes b_j\). The homology product, induced by tensoring lines, is

\[
b_i b_j=\binom{i+j}{i}b_{i+j},\qquad
b_1b_n=(n+1)b_{n+1},\qquad
b_1^n=n!\,b_n.
\]

This is the *Pontryagin* product on homology, rather than the cup product on cohomology or the product on \(\pi_*KU\). The ring with this basis and multiplication is the divided-power ring \(\Gamma_{\mathbf Z}(b_1)\), where \(|b_n|=2n\). The binomial coefficients count choices of factors, as in the opening strip calculation. They remain visible after passing from line-bundle multiplication to its homological record.[^hatcher]

Ordinary integral homology of a spectrum \(X\) is \(\pi_*(X\wedge H\mathbf Z)\). Choose the orientation of \(\mathbf{CP}^1\) so that the Hurewicz image of Bott is \(b_1\). Smashing the Snaith presentation with \(H\mathbf Z\) commutes with localization. The graded localization theorem therefore gives

\[
\pi_*(KU\wedge H\mathbf Z)
\cong\Gamma_{\mathbf Z}(b_1)[b_1^{-1}].
\]

The first few terms show what inverting \(b_1\) does:

| Power of the Bott image | New inverse forced by its invertibility |
|---|---|
| \(b_1^2=2b_2\) | \(2^{-1}=b_2b_1^{-2}\) |
| \(b_1^3=6b_3\) | \(6^{-1}=b_3b_1^{-3}\) |
| \(b_1^4=24b_4\) | \(24^{-1}=b_4b_1^{-4}\) |

In general \(b_nb_1^{-n}\) is an inverse of \(n!\). Every positive integer divides some factorial, so every nonzero integer becomes invertible. Over \(\mathbf Q\), the divided powers satisfy \(b_n=b_1^n/n!\). Writing \(u\) for the localized image of \(b_1\), we obtain

\[
\Gamma_{\mathbf Z}(b_1)[b_1^{-1}]
\cong\mathbf Q[u,u^{-1}],\qquad |u|=2.
\]

One can also see the denominators forming step by step. Localization is the telescope \(A_0\to\Sigma^{-2}A_0\to\Sigma^{-4}A_0\to\cdots\). After smashing with \(H\mathbf Z\), its degree-zero groups are

\[
\mathbf Zb_0\xrightarrow{1}\mathbf Zb_1
\xrightarrow{2}\mathbf Zb_2
\xrightarrow{3}\mathbf Zb_3
\xrightarrow{4}\cdots.
\]

Embed the \(r\)-th stage in \(\mathbf Q\) by \(b_r\mapsto1/r!\). The transition maps then agree, and their images form

\[
\mathbf Z\subseteq\tfrac1{2!}\mathbf Z
\subseteq\tfrac1{3!}\mathbf Z
\subseteq\tfrac1{4!}\mathbf Z\subseteq\cdots,
\qquad
\bigcup_{r\geq0}\tfrac1{r!}\mathbf Z=\mathbf Q.
\]

These arrows form a direct system, so successive composites need not vanish; they are not boundary differentials. The earlier boundary picture explains how homology was obtained. This new telescope explains the arithmetic created by localization. Every even degree has the same eventual factorial progression, and every odd degree is zero. The rational coefficient group is thus visible in an explicit calculation.[^stonek]

<a id="spectral-rationality-periodicity"></a>

### Rationality and periodicity do different jobs

The coefficient-change map \(H\mathbf Z\to H\mathbf Q\) sends each \(b_n\) to the same class with rational coefficients. After Bott localization it is an isomorphism on the computed Laurent-polynomial homotopy rings. Therefore the *specific* map

\[
KU\wedge H\mathbb Z\longrightarrow KU\wedge H\mathbb Q
\]

is an equivalence of \(KU\)-modules. Combining this rationalization with the cotangent formula and then Bott periodicity gives

\[
\mathbb L_{KU/\mathbb S}
\simeq\Sigma^2(KU\wedge H\mathbf Z)
\simeq\Sigma^2KU_{\mathbf Q}
\simeq KU_{\mathbf Q}.
\]

The last equivalence is multiplication by Bott as a module map. Factorial localization produces rationality; Bott then removes the two-degree shift. Periodicity by itself does not force rational coefficients.[^stonek]

The resulting comparison of graded homotopy modules is explicit:

\[
\pi_*KU=\mathbf Z[\beta,\beta^{-1}],\qquad
\pi_*\mathbb L_{KU/\mathbb S}
\cong\mathbf Q[\beta,\beta^{-1}],\qquad |\beta|=2.
\]

The second Laurent expression describes a module over \(\pi_*KU\); no multiplication on the cotangent complex is being asserted. Thus the cotangent has \(\mathbf Q\) in every even integer degree and zero in odd degrees. If \(e\) denotes the degree-two generator in the intermediate module \(\Sigma^2KU_{\mathbf Q}\), then \(\beta^{-1}e\) has degree zero. This explains how a degree-two labeling spectrum contributes a nonzero degree-zero spectral differential. Looking only at the map \(\pi_0\mathbb S\to\pi_0KU\), namely \(\mathbf Z\to\mathbf Z\), would give a zero ordinary relative cotangent.

There is also a crucial distinction between coefficients and restriction of scalars. The expression \(KU\wedge_{\mathbb S}H\mathbf Z\) above computes ordinary integral homology. The rank map \(ku\to H\mathbf Z\) kills Bott and cannot extend to a map \(KU\to H\mathbf Z\), since an invertible class cannot map to zero. Tensoring *over \(ku\)* would instead give \(KU\otimes_{ku}H\mathbf Z\simeq0\). The absolute smash used in the calculation retains \(b_1\) until its inversion forces the factorial denominators.

<a id="spectral-thh"></a>

### The signed boundary rule returns in THH

Topological Hochschild homology (THH) is the geometric realization of the cyclic bar construction of a ring spectrum, which organizes iterated smash products using multiplication, unit maps, and cyclic permutation. In this case the differential participates in a complete Hochschild calculation:

\[
THH(KU)\simeq
\operatorname{Sym}_{KU}(\Sigma KU_{\mathbb Q})
\simeq KU\oplus\Sigma KU_{\mathbb Q}.
\]

This is a proved calculation for \(KU\). To understand its final simplification, write \(\xi\) for the degree-one rational generator. The graded exchange rule gives

\[
\xi\xi=(-1)^{1\cdot1}\xi\xi=-\xi^2,
\qquad 2\xi^2=0,\qquad\xi^2=0.
\]

It is the same sign principle that makes differential one-forms anticommute and governs the oriented product boundary. In each tensor power of weight \(j\geq2\), a transposition acts by minus one before taking homotopy orbits. Rational finite-group homology vanishes in positive degrees, and these sign coinvariants vanish as well. All those symmetric-power summands disappear, leaving the square-zero odd summand \(\Sigma KU_{\mathbf Q}\).

Thus \(THH(KU)\) has integral homotopy in even degrees and rational homotopy in odd degrees. Its algebra calculation combines the rectangle's square-zero response, the factorial arithmetic of tensoring lines, and the boundary's graded signs. The comparison with a free algebra on the suspended cotangent is established here by Stonek's theorem; it cannot simply be deduced from a connective Hochschild–Kostant–Rosenberg theorem, since \(KU\) is nonconnective.[^stonek]

## 13 Goodwillie derivatives recover interactions between spaces {#goodwillie-derivatives}
The spectral section linearized multiplication and measured its compatible infinitesimal responses. We now let the input itself be a space and ask how a functor responds when spaces are glued together. Return to the rectangle's corner: we can isolate an interaction by comparing a simultaneous change with the two separate changes. For a scalar function, the mixed difference is

\[
\Delta_{h,k}f(x)
=f(x+h+k)-f(x+h)-f(x+k)+f(x).
\]

If \(f(x)=x^2\), expansion gives \(\Delta_{h,k}f(x)=2hk\). For a linear function it is zero. The subtraction removes the base value and both separate responses, leaving their interaction.

For the two-variable area function \(m(a,b)=ab\), the corresponding calculation is

\[
m(a+h,b+k)-m(a+h,b)-m(a,b+k)+m(a,b)=hk.
\]

This is exactly the corner area. It is a useful starting point for Goodwillie calculus: combine two changes, remove the effects already present separately, and retain what requires both.

The factor of two in the square example counts two ordered mixed choices in its product expansion. The area example specifies a change in each distinct factor and isolates one corner. In both calculations, an interaction is invisible to a description that adds only the separate first-order responses.

<a id="goodwillie-cross-effects"></a>

### The square of spaces

Now the inputs and outputs are based spaces, and \(F\) is a functor preserving homotopy equivalences. The wedge \(X\vee Y\) combines two spaces at their basepoint. Collapsing either summand gives the comparison square

\[
\begin{array}{ccc}
F(X\vee Y)&\longrightarrow&F(X)\\
\downarrow&&\downarrow\\
F(Y)&\longrightarrow&F(*).
\end{array}
\]

Spaces cannot be subtracted like numbers. Instead, compare the response to the combined input with the homotopy pullback of the separate responses:

\[
\operatorname{cr}_2F(X,Y)
:=\operatorname{hofib}\!\left(
F(X\vee Y)\longrightarrow
F(X)\times^{h}_{F(*)}F(Y)\right).
\]

This total homotopy fiber is the *second cross-effect*. A homotopy fiber records a point in the combined response together with the compatible paths making its separate responses trivial. It retains the residual interaction with its homotopies. When \(F\) is reduced, meaning \(F(*)\simeq *\), the comparison target is \(F(X)\times F(Y)\).

The exact linearity condition is *1-excision*: every homotopy pushout square must become a homotopy pullback square. This requires the absence of a residual interaction for every such gluing test; the wedge comparison is one instance, rather than the entire definition. For higher order, \(F\) is *\(n\)-excisive* when it takes every strongly homotopy cocartesian \((n+1)\)-cube to a homotopy cartesian cube. “Strongly cocartesian” means each two-dimensional face is a homotopy pushout. “Cartesian” means the initial vertex agrees with the homotopy limit of the remaining vertices.

For suitable homotopy functors, including the identity used below, Goodwillie constructs a universal \(n\)-excisive approximation \(F\to P_nF\). These approximations fit into the tower

\[
F\longrightarrow\cdots\longrightarrow P_2F
\longrightarrow P_1F\longrightarrow P_0F.
\]

The layers \(D_nF=\operatorname{hofib}(P_nF\to P_{n-1}F)\) retain the successive interactions, as homogeneous terms do in a Taylor expansion.[^goodwillie]

<a id="goodwillie-cotangent-linearization"></a>

### The diagonal reappears in linearization

There is a precise connection with the cotangent construction. For a map \(R\to A\) of \(E_\infty\)-ring spectra, form the augmented commutative \(A\)-algebra \(C=A\wedge_R A\). Its first-factor unit and multiplication give \(A\to C\to A\), whose composite is the identity. Let \(I_A\) be the functor taking an augmented algebra to the homotopy fiber of its augmentation, as an \(A\)-module. Here \(I_A(C)\) measures separation between the two algebra copies before linearization.

The first excisive approximation of this functor gives

\[
\mathbb L_{A/R}\simeq (P_1I_A)(A\wedge_R A).
\]

Here the gluing tests are pushouts in the category of augmented commutative \(A\)-algebras, whose zero object is \(A\). This theorem is the spectral counterpart of the earlier diagonal construction \(I/I^2\): linearize the separation data while retaining homotopies. It is an approximation of a functor in that category, rather than a naive quotient of an ordinary ideal. The next calculation applies the same excision principle to the identity functor on based spaces.[^rasekh-stonek]

<a id="goodwillie-first-approximation"></a>

### Why the first approximation is linear

For the identity functor \(I\) on based spaces, the first approximation is

\[
P_1I(X)\simeq QX:=\Omega^\infty\Sigma^\infty X.
\]

The suspension spectrum \(\Sigma^\infty X\) places \(X\) in stable homotopy theory, and \(\Omega^\infty\) reads a space from the resulting spectrum. Its first derivative at the one-point space is the sphere spectrum. The reason this approximation removes mixed wedge behavior is visible in the calculation

\[
\Sigma^\infty(X\vee Y)
\simeq\Sigma^\infty X\oplus\Sigma^\infty Y
\simeq\Sigma^\infty X\times\Sigma^\infty Y.
\]

Finite sums and products agree for spectra. Since \(\Omega^\infty\) preserves products, \(Q(X\vee Y)\simeq QX\times QY\). The gluing square is handled linearly, and its associated collapse comparison has no mixed fiber. The unstable identity has cross-effect

\[
\operatorname{cr}_2I(X,Y)
=\operatorname{hofib}(X\vee Y\longrightarrow X\times Y),
\]

which can be nontrivial.

The same construction handles general pushouts. The suspension-spectrum functor preserves them; in a stable category every pushout square is also a pullback square; and \(\Omega^\infty\) preserves pullbacks. These three properties explain why \(Q\) satisfies 1-excision, beyond this particular wedge calculation.

The two squares have different maps. The wedge pushout has vertices \(*,X,Y,X\vee Y\) and inclusion maps; its image under \(Q\) has vertices \(*,QX,QY,QX\times QY\) and is a homotopy pullback. The cross-effect square instead uses collapse maps to compare the combined response with the separate responses. The general pushout argument and the explicit product calculation show that \(Q\) passes both tests.

<a id="goodwillie-product-cell"></a>

### The boundary that attaches the product cell

The opening boundary picture now gives a concrete interaction. Take \(X=Y=S^2\) and \(W=S^2\vee S^2\). Choose characteristic maps \(\chi_i:D^2\to S^2\) that collapse \(S^1=\partial D^2\) to the basepoint. The product of the two disks is a four-dimensional cell, with boundary

\[
\partial(D^2\times D^2)
=(S^1\times D^2)\cup(D^2\times S^1)
\cong S^3.
\]

The two boundary pieces meet in the torus \(S^1\times S^1\). Define a map \(\alpha:S^3\to W\) as follows. On \(S^1\times D^2\), send \((u,v)\) to \(\chi_2(v)\) in the second sphere. On \(D^2\times S^1\), send it to \(\chi_1(u)\) in the first sphere. Both descriptions send the common torus to the wedge point, so they glue.

This is a decomposition of a boundary into spaces and maps. Its orientations are governed by the same chain product rule used for the square. The induced boundaries of the two pieces are respectively \(-S^1\times S^1\) and \(+S^1\times S^1\); their common boundary cancels as a chain. The union itself is not a subtraction of homotopy types.

With a choice of product orientation and characteristic maps, \(\alpha\) represents the mixed Whitehead product, up to the corresponding overall sign:

\[
[\iota_1,\iota_2]:S^3\longrightarrow W.
\]

Attaching the four-cell along \(\alpha\) turns \(W\) into \(S^2\times S^2\). The map retains how the two spheres interact before that cell fills the interaction.[^hatcher]

The four-cell also explains why this class belongs to the cross-effect. Composing \(\alpha\) with \(W\to S^2\times S^2\) gives the boundary restriction of the product map \((u,v)\mapsto(\chi_1(u),\chi_2(v))\). That map extends over the whole product of disks. It supplies a nullhomotopy in the product, so \(\alpha\), together with that nullhomotopy, lifts to the homotopy fiber. Its two separate projections lose the interaction, while the fiber retains it.

<!-- figure:goodwillie -->

Its effect is substantial:

\[
\pi_3(W)\cong
\mathbb Z\eta_1\oplus\mathbb Z\eta_2
\oplus\mathbb Z[\iota_1,\iota_2],
\qquad
\pi_3(QW)\cong(\mathbb Z/2)^2.
\]

The Hopf maps \(\eta_i\), supported on the individual spheres, stabilize modulo two. The mixed Whitehead product vanishes after suspension. The first approximation has consequently lost an entire infinite cyclic interaction.

<a id="goodwillie-bilinear-coefficient"></a>

### Reading the bilinear coefficient

To obtain a second derivative, Goodwillie linearizes the cross-effect separately in each input. In based spaces, linearization repeatedly suspends an input and compensates by looping the output; passing to the stable limit retains the part that responds linearly in that input. Doing this in both variables gives a *bilinear* response. This plays the role of extracting the coefficient of \(hk\) from the mixed difference, while keeping homotopical information instead of a scalar.

For the identity, the resulting calculation is

\[
\Omega Q(X\wedge Y).
\]

The dimension count makes the loop shift intelligible. Suspending the two sphere inputs \(r\) and \(s\) times changes their dimensions to \(2+r\) and \(2+s\). The product cell then has dimension \(4+r+s\), and its attaching boundary has dimension \(3+r+s\). Compensating with \(r+s\) output loops restores degree three. The full bilinear equivalence above is Goodwillie's theorem; the cell calculation explains why its coefficient has a one-degree desuspension.

For based CW models, the smash product \(X\wedge Y=(X\times Y)/(X\vee Y)\) retains the part of the product that requires both inputs. At \(X=Y=S^2\), it is \(S^4\). Thus

\[
\Omega Q(S^2\wedge S^2)
\simeq\Omega QS^4
\simeq QS^3,\qquad
\pi_3(QS^3)=\mathbb Z.
\]

We can track the specific Whitehead class through the comparison, rather than only compare the groups. Put \(B=S^2\times S^2\) and \(F=\operatorname{hofib}(W\to B)\). The quotient \(B/W\simeq S^4\) sends the wedge to the basepoint and induces

\[
F\longrightarrow\Omega S^4\longrightarrow\Omega QS^4.
\]

A point of the fiber includes a path in \(B\) from its wedge image to the basepoint; quotienting this path gives a based loop in \(S^4\). The second arrow is stabilization. The characteristic product four-cell represents a generator of \(\pi_4(B,W)\cong\pi_3F\), and its boundary is the chosen mixed Whitehead map. After quotienting by the wedge, this cell gives a degree-one map

\[
(D^2\times D^2)/\partial(D^2\times D^2)
\longrightarrow B/W\simeq S^4.
\]

Its fiber lift therefore maps to a generator, up to the orientation sign, of \(\pi_3(\Omega QS^4)\cong\mathbf Z\). The bilinear response detects this mixed class with its chosen nullhomotopy. The maps and extensions assembling the Taylor stages still require further data.

The one-loop shift also explains the coefficient spectrum: the second derivative is the desuspended sphere with trivial transposition action,

\[
\partial_2I\simeq\mathbb S^{-1},
\qquad
D_2I(X)\simeq
\Omega^\infty
\left(\mathbb S^{-1}\wedge
(\Sigma^\infty X)^{\wedge2}\right)_{h\Sigma_2},
\]

where the subscript denotes homotopy orbits. The trivial action belongs to the coefficient sphere; transposition still exchanges the two inputs. Writing \(E_X=\Sigma^\infty X\) and \(E_Y=\Sigma^\infty Y\), the relevant expansion is

\[
(E_X\oplus E_Y)^{\wedge2}
\simeq E_X^{\wedge2}\oplus(E_X\wedge E_Y)
\oplus(E_Y\wedge E_X)\oplus E_Y^{\wedge2}.
\]

The two middle terms are the ordered mixed choices. Transposition exchanges that pair. After smashing with the coefficient \(\mathbb S^{-1}\), their homotopy orbits leave exactly one copy of \(\Sigma^{-1}\Sigma^\infty(X\wedge Y)\). Applying \(\Omega^\infty\) gives the bilinear term above. This identification accounts for the exchange of inputs through the homotopy structure, rather than division by a numerical factorial.[^goodwillie]

For simply connected spaces, including \(W\), the identity's tower converges to the original space. Reconstruction uses the maps and extensions connecting the layers, as well as their derivative spectra. The sequence of coefficients alone does not determine how the layers assemble.

These are derivatives of a functor between homotopy theories. Their variables are spaces, and their changes are gluing operations. The connection with the rectangle is precise at that level: isolate simultaneous interaction, extract its bilinear part, and specify what the linear approximation discarded. It does not identify these spectra with derivatives of point coordinates.

## 14 What differentiation retains and what reconstruction requires {#derivative-reconstruction}
The rectangle's two strips give the elementary result: first-order multiplication changes one factor at a time. The corner is a simultaneous change of both factors. The Leibniz rule is the compatibility condition that remains when products of changes are discarded. The oriented boundary adds another requirement: retain degrees and signs so that contributions from adjoining pieces cancel compatibly. These two operations guided the algebraic quotients, the graded resolutions, and the product-cell attachments above.

Each subsequent construction makes the retained information more precise. Kähler differentials represent all first-order measurements compatible with an algebra. The cotangent complex retains equations and homological dependencies in those measurements. Higher jets retain powers of displacement, so they can distinguish a quadratic obstruction from a cubic one. Full formal deformation theory assembles infinitesimal probes of every order, together with their compatibility and homotopies.

The example \(x^n=0\) shows why these distinctions matter. Equal pointwise tangent complexes can coexist with different formal neighborhoods. Higher brackets recover the equation because they specify how several tangent inputs combine into an obstruction. Spectral differentiation keeps coherent multiplication and spectral coefficients; Goodwillie differentiation keeps the interactions a functor creates when spaces are combined.

Choose the probes and the representation of their responses. Determine which operations survive. Then identify the additional structure required to recover what was discarded. A derivative can be universal for first-order measurements while remaining incomplete as a description of the whole object. The successful reconstruction theorem names both the information retained and the hypotheses under which it suffices.

The ordinary coefficient \(f'(x)\) is one instance of this architecture. It records the action on the displacement \(x+u\varepsilon\). More elaborate derivatives preserve more of the surrounding algebra, equations, or homotopy theory, while continuing to answer a recognizable question: how does the object respond to a controlled change?

## Notes and sources {#notes-and-sources}

[^stacks-diff]: The Stacks Project, [Differentials](https://stacks.math.columbia.edu/tag/00RM), especially the universal property, polynomial computation, conormal exact sequence and diagonal construction. The diagonal is also stated separately in [Lemma 10.131.13](https://stacks.math.columbia.edu/tag/00RW).
[^hatcher]: Allen Hatcher, [Algebraic Topology](https://pi.math.cornell.edu/~hatcher/AT/AT.pdf), Lemma 3.6 for the cup-product coboundary, Proposition 3B.1 for the product boundary, Example 2.42 on printed p. 144 for the cellular differentials of real projective space, Theorem 3.19 for the cohomology ring of complex projective space, and Example 4.52 and printed pp. 380–381 for the sphere-wedge calculation and Whitehead attaching map. The binomial and factorial Pontryagin calculations in section 12 are derived explicitly from that cohomology ring and the first Chern class law.
[^joyce]: Dominic Joyce, [An introduction to C-infinity schemes and C-infinity algebraic geometry](https://arxiv.org/pdf/1104.4951), Definition 2.15 and Example 2.16 for smooth derivations and cotangent modules.
[^stokes]: Semyon Dyatlov, [18.155 lecture notes](https://math.mit.edu/~dyatlov/18.155/155-notes.pdf), Chapter 17, Differential Forms and Hodge Theory, Theorem 17.3 for Stokes' theorem. The algebraic extension to exterior powers is in the Stacks Project, [The de Rham complex](https://stacks.math.columbia.edu/tag/0FKF).
[^different]: The Stacks Project, [Example 41.8.3](https://stacks.math.columbia.edu/tag/024Z) for the number-field different, and [The Kähler different](https://stacks.math.columbia.edu/tag/0BVV) for its Fitting-ideal formulation and non-unramified locus.
[^frobenius]: The Stacks Project, [Frobenii](https://stacks.math.columbia.edu/tag/0CC6), for absolute and relative Frobenius, universal homeomorphisms, and degree.
[^artin-schreier]: The Stacks Project, [The Artin–Schreier sequence](https://stacks.math.columbia.edu/tag/0A3J). The polynomial presentation here independently exhibits the finite free algebra and invertible relative derivative.
[^hasse]: Luis Narváez Macarro, [Hasse–Schmidt derivations, divided powers and differential smoothness](https://www.numdam.org/item/10.5802/aif.2513.pdf), Annales de l'Institut Fourier 59 (2009), 2979–3014. The introduction defines Taylor-coefficient differential operators over arbitrary coefficient rings.
[^lci]: The Stacks Project, [The cotangent complex of a local complete intersection](https://stacks.math.columbia.edu/tag/08SH), especially Lemma 92.14.2 and Proposition 92.14.4. The construction is described in [The cotangent complex of a ring map](https://stacks.math.columbia.edu/tag/08PL). [Lemma 92.9.1](https://stacks.math.columbia.edu/tag/08R5) gives the smooth case, and [Lemma 92.11.3](https://stacks.math.columbia.edu/tag/08RB) identifies the two-term truncation with the naive cotangent complex of a general presentation.
[^deformations]: The Stacks Project, [Deformations of ring maps and the cotangent complex](https://stacks.math.columbia.edu/tag/08SM), for extension classes, choices and obstructions. The node's arc and smoothing calculations in the text are direct computations.
[^toen]: Bertrand Toën, [Derived Algebraic Geometry](https://arxiv.org/pdf/1401.1044), §3.1 for cotangent complexes and virtual classes, including the self-intersection class as the alternating exterior powers of the conormal bundle.
[^intersection]: The Stacks Project, [Lemma 82.22.4](https://stacks.math.columbia.edu/tag/0ER4), for Cartier-divisor intersection and self-intersection. The two embeddings of the projective line are computed from their normal bundles in the text.
[^formal-moduli]: Jacob Lurie, [Derived Algebraic Geometry X: Formal Moduli Problems](https://www.math.ias.edu/~lurie/papers/DAG-X.pdf), Proposition 1.1.11 for the Artin test category, Remark 1.1.21 for the pullback condition with one surjective map on zeroth homotopy, and Theorem 2.0.2 for the characteristic-zero formal-moduli correspondence. The central higher Lie models for the truncated polynomial rings are explicitly constructed in the text.
[^higher-algebra]: Jacob Lurie, [Higher Algebra](https://www.math.ias.edu/~lurie/papers/HA.pdf), §3.1.3 for free algebras, §7.3 for cotangent complexes, and Warning 7.3.0.2 for algebraic and spectral cotangent theories. The mapping-space formulation is introduced in [DAG IV: Deformation Theory](https://www.math.ias.edu/~lurie/papers/DAG-IV.pdf).
[^basterra-mandell]: Maria Basterra and Michael A. Mandell, [Homology and cohomology of E-infinity ring spectra](https://arxiv.org/pdf/math/0407209), Theorem 5 and its applications on pp. 4–5. Their connective spectrum bu is explicitly identified with the double suspension of ku.
[^rasekh-stonek]: Nima Rasekh and Bruno Stonek, [The cotangent complex and Thom spectra](https://arxiv.org/pdf/2005.01382), Definition 3.3 and formula (3.11) for the augmentation-ideal functor and its first excisive approximation as the cotangent complex, Theorem 4.3 and Example 4.8 for Thom spectra and cobordism, Example 5.6 for localization at a graded homotopy element, and Example 5.7 for the cotangent complex of periodic complex K-theory.
[^stonek]: Bruno Stonek, [Higher topological Hochschild homology of periodic complex K-theory](https://arxiv.org/pdf/1801.00156), Theorem 3.1 and Proposition 3.4 for homotopy localization and base change, formula (3.7) for its telescope, Theorems 5.16 and 5.18 and formula (5.19) for the structured Snaith presentation and the Bott class, Theorem 5.25 for the algebra structure of THH of KU, Lemma 5.31 and Proposition 5.33 for the rational odd-generator symmetric powers, Corollary 8.4 for the specified integral-to-rational homology equivalence and the topological André–Quillen module, and Remark 8.5(3) for the scope of the comparison with Hochschild–Kostant–Rosenberg. The factorial proof explaining the coefficient-change equivalence is given directly in this exposition, rather than attributed as the paper's proof.
[^thom-orientations]: Omar Antolín-Camarena and Tobias Barthel, [A simple universal property of Thom ring spectra](https://arxiv.org/pdf/1411.7988), Theorem 3.5 for the universal lifting property, Lemma 3.15 for algebra maps as orientations of grouplike inputs, Corollary 3.17 for the canonical self-orientation, and Corollary 3.19 for orientation differences. These provide the orientation interpretation of the Thom cotangent calculation.
[^hatcher-bundles]: Allen Hatcher, [Vector Bundles and K-Theory](https://pi.math.cornell.edu/~hatcher/VBKT/VB.pdf), Proposition 3.10 and its proof for the classification of complex line bundles by the first Chern class and the law for tensor product. The K-theory identity with coordinates [L] minus one follows from multiplying their classes.
[^goodwillie]: Thomas G. Goodwillie, [Calculus III: Taylor Series](https://arxiv.org/pdf/math/0310481), the introduction for excision, cubes and Taylor layers, and §8 for the first and second derivatives of the identity and the bilinearized second cross-effect. For a modern overview, the distinction between cross-effects and full excision, and convergence hypotheses, see Greg Arone and Michael Ching, [Goodwillie Calculus](https://arxiv.org/pdf/1902.00803).
