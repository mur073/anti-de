# Boolean Algebra

### Input file format
Boolean algebra functions are defined by a vector of values: first comes the number 2, which signifies 2-valued logic, followed by n - the number of variables in the function. Then, a space is provided, and without spaces, $2^n$ characters follow - representing the function's values for sequences 0..00, 0..01, 0..10, and so on. For instance, the function x + y is defined by the string:
**2 2 0110**


A polynomial (both in 2-valued and k-valued logic) is represented as follows: firstly, three numbers are given - k (the arity of logic), n (the number of variables), m (the number of terms in the polynomial). Then, m lines follow, each line corresponding to a single term in the polynomial. In each line, n digits (without spaces) represent the exponents of each variable x in the polynomial (exponent 0 means the variable is not included), followed by a space and the coefficient for that term. Terms with a coefficient of zero are excluded from the count of m and are not displayed as separate lines. The lines corresponding to the terms in the file must be ordered lexicographically.
For example, a polynomial $P_3=2x_1+x_1x_2+2x_1^2x_2$ is defined as follows:
**3 2 3
91 2
11 1
21 2**

***

### Output file format
If the task requires a yes/no answer, then the output file should contain a single number: 1 signifies yes, 0– no