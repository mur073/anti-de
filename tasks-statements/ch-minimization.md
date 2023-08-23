# Minimization of boolean functions

### Input file format
A *DNF* (Disjunctive Normal Form) of a function with $n$ variables is defined as follows: first, $n$ is written, then $m$ - the number of elementary conjunctions (ECs), followed by $m$ lines corresponding to the conjunctions.
Boolean algebra functions are defined by a vector of values: first comes the number $2$, signifying 2-valued logic, then $n$ - the number of variables in the function, followed by a space, and then $2^n$ characters without spaces - representing the function's values for sequences $0..00, 0..01, 0..10$, and so on. For example, the function $x + y$ is defined by the string:\
**2 2 0110**

***

### Output file format

Each EC is represented by a string of length $n$ without spaces, where the $i$-th position holds $1$ if the $i$-th variable is included in the EC without negation, $0$ if it is included with negation, and * if it is not included in the EC. For example, the DNF of a function $$x_1\land\lnot{x_3}\lor\lnot{x_2}\land x_3$$ with $3$ variables is defined as follows:\
3 2\
1*0\
*01

We consider that * comes after all other characters in the alphabet (when ordering the conjunctions). In the case where the DNF is empty (i.e., contains $0$ conjunctions), the file should contain $n$ $0$, where $n$ is the number of variables.