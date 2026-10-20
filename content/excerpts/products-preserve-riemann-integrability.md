## A local estimate proves the theorem

Let \(a<b\), and let \(f,g:[a,b]\to\mathbb R\) be Riemann integrable. They are bounded, so choose positive constants \(M_f,M_g\) with \(|f|\leq M_f\) and \(|g|\leq M_g\) on \([a,b]\). Positive bounds are available even when a function is identically zero.

For a bounded real-valued function \(u\) on a nonempty subinterval \(I\), its oscillation is

\[
\begin{aligned}
\operatorname{osc}_I(u)
&=\sup_{t\in I}u(t)-\inf_{t\in I}u(t)\\
&=\sup_{x,y\in I}|u(x)-u(y)|.
\end{aligned}
\]

The second equality follows by choosing values arbitrarily close to the supremum and infimum; every difference is bounded by their separation.

For \(x,y\in I\), the identity

\[
\begin{aligned}
&f(x)g(x)-f(y)g(y)\\
&\quad=(f(x)-f(y))g(x)\\
&\qquad+f(y)(g(x)-g(y))
\end{aligned}
\]

separates the change in the product into changes in its factors. Taking absolute values, using the bounds, and taking the supremum over \(x,y\) gives

\[
\begin{aligned}
\operatorname{osc}_I(fg)
&\leq M_g\operatorname{osc}_I(f)\\
&\quad+M_f\operatorname{osc}_I(g).
\end{aligned}
\]

For a bounded function \(u:[a,b]\to\mathbb R\) and a partition \(P=\{a=x_0<\cdots<x_n=b\}\), write \(I_i=[x_{i-1},x_i]\) and \(\Delta x_i=x_i-x_{i-1}\). The Darboux gap is

\[
\begin{aligned}
D_P(u)&=U(P,u)-L(P,u)\\
&=\sum_{i=1}^{n}\operatorname{osc}_{I_i}(u)\,\Delta x_i.
\end{aligned}
\]

Here \(U\) and \(L\) are the upper and lower Darboux sums. Thus each interval contributes its oscillation multiplied by its length.

Fix \(\varepsilon>0\) and set \(\rho=\varepsilon/(M_f+M_g+1)\). Integrability gives partitions \(P_f,P_g\) with \(D_{P_f}(f)<\rho\) and \(D_{P_g}(g)<\rho\). Their common refinement \(P=P_f\cup P_g\) still satisfies \(D_P(f)<\rho\) and \(D_P(g)<\rho\): refinement cannot increase a Darboux gap, since each smaller interval has no greater oscillation than the interval containing it.

Multiply the local estimate by each interval's length and sum:

\[
\begin{aligned}
D_P(fg)&\leq M_gD_P(f)+M_fD_P(g)\\
&<(M_f+M_g)\rho\\
&<\varepsilon.
\end{aligned}
\]

The product is bounded by \(M_fM_g\), and \(\varepsilon\) was arbitrary. The Darboux criterion therefore proves that \(fg\) is Riemann integrable on \([a,b]\).
