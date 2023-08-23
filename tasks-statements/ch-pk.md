# K-valued logic

### Input file format

k-valued logic functions are defined by a vector of values: first comes $k$, then $n$ - the number of variables in the function separated by a space, followed by $k^n$ characters without spaces - representing the function's values for sequences $0..00, 0..01, 0..02, ..., 0..10, 0..11, 0..12$, and so on. For example, the function $x+y$ in a 3-valued logic is defined by the string:\
**3 2 012120201**

A polynomial (both in 2-valued and k-valued logic) is represented as follows: firstly, three numbers are given - $k$ (the arity of logic), $n$ (the number of variables), $m$ (the number of terms in the polynomial). Then, $m$ lines follow, each line corresponding to a single term in the polynomial. In each line, n digits (without spaces) represent the exponents of each variable $x$ in the polynomial (exponent 0 means the variable is not included), followed by a space and the coefficient for that term. Terms with a coefficient of zero are excluded from the count of $m$ and are not displayed as separate lines. The lines corresponding to the terms in the file must be ordered lexicographically.
For example, a polynomial $P_3=2x_1+x_1x_2+2x_1^2x_2$ is defined as follows:\
**3 2 3\
01 2\
11 1\
21 2**

***

### Output file format
If the task requires a yes/no answer, then the output file should contain a single number: $1$ signifies yes, $0$ – no