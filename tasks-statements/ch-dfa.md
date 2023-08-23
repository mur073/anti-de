# Automatas

### Input file format

In all tasks involving automata, the input and output alphabets are always $\{0, 1\}$, and the number of states is a power of two, $2^n$. An automaton is defined by canonical equations: the 1st line contains $n$ - the number of variables encoding the state, followed by a space, then the values of these variables in the initial state (without spaces). Then, $n$ lines follow - the vectors of values for the transition functions (each with $n + 1$ variables, the input being the last variable), followed by another line - the vector of values for the output function (also with $n + 1$ variables, the input being the last variable). Boolean algebra functions are defined by a vector of values: first comes the number $2$, signifying 2-valued logic, then n - the number of variables in the function, followed by a space, and then $2^n$ characters without spaces - representing the function's values for sequences $0..00, 0..01, 0..10$, and so on.
For instance, a unit delay (an automaton with one input, one output, and two states, with the transition function $F(q, x) = x$, and the output function $G(q, x) = q$) starting from state $0$ is defined as follows:\
**1 0\
2 2 0101\
2 2 0011**

If needed, when outputting a state, its code is displayed, similar to the case of the initial state.

***

### Output file format:
If the task requires a yes/no answer, then the output file should contain a single number: $1$ signifies yes, $0$ – no