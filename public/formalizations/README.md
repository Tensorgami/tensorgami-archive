# Tensorgami Lean formalizations

These are Lean/mathlib formalizations accompanying selected Tensorgami notes.
Each folder is an independent Lake project pinned to its own Lean toolchain and
`lake-manifest.json`.
Some projects verify a complete advertised statement, while others verify a
specific formal fragment supporting a longer note.

## Included theorem statements

| Note | Lean theorem | Subject | Mechanism | Project |
| --- | --- | --- | --- | --- |
| A Weighting Argument for Pointwise Convergence to Convergence in Measure | `PointwiseWeighting.exists_conull_pos_measurable_weight_uniformOn_tendstoInMeasure_of_ae_tendsto` | analysis/measure theory | Egorov pieces, pointwise envelope | `pointwise-weighting` |
| IBM Ponder This July 2010 | `IBMPonderThisFinal.ibm_ponder_this_main` | number theory | Pisot rounding, finite certificate | `ibm-ponder-this-2010` |
| Divisibility of Separated Polynomials | `SeparatedPolynomialDifferences.sep_dvd_iff_exists_common_outer` | algebra | polynomial division and remainder extraction | `separated-polynomial-differences` |
| A Galois-Theoretic and Frobenius-Descent Viewpoint on a Polynomial Composition Law | `SeparatedComposition.separated_composition_criterion_iff` | algebra | polynomial division and a separable Galois argument | `galois-frobenius-composition-law` |
| Extracting the First Prime Greater than m | `ExtractingFirstPrime.extractedPrime_is_smallest_prime_gt` | number theory | gcd filtering, finite certificate | `extracting-first-prime` |
| A Note on Disjoint Decompositions of [0,1) into Closed Sets | `no_pairwiseDisjoint_closed_iUnion_eq_Ico` | analysis/topology | compactification, Baire category | `disjoint-decomposition` |

## Build

From any individual project directory:

```sh
lake exe cache get
lake build
```

These retained source projects are supplied with their dependency manifests.
This website checkout does not include a GitHub Actions verification workflow.
A successful compilation checks the formal statements in the files; it does not
check every explanatory sentence, diagram, or reference in the accompanying PDF.

The separated-polynomial project certifies the main composition criterion. The
PDF's additional Hasse-derivative formulation of fiber constancy is proved in
the exposition; it is not a separate theorem in the retained Lean source.

The Galois/Frobenius project proves the general composition criterion by polynomial
division and also formalizes a separable Galois argument. It does not reproduce
the PDF's Frobenius induction line by line.

The IBM project's finite congruence certificates use `native_decide` and therefore
also rely on Lean's native evaluation mechanism. Its real-analysis bridge is
proved separately. The weighting project proves the main convergence statement
using envelope normalization; it does not certify the PDF's particular
double-series formula term by term.
