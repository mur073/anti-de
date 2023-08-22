import { pattern, invalidInputMsg, tableToGraph } from "./helper.js";

export const findEqualStates = input => {
    let [ n, initState, ...automata ] = input.split(pattern);
    
    n = Number(n);

    if (!n || !initState || automata.length < 3 * (n + 1)) return invalidInputMsg;

    automata = automata.slice(0, 3 * (n + 1))

    const graph = tableToGraph(n, automata);
    const table = [];
    const kn = 1 << n;

    for (let i = 0; i < kn; i++) {
        table[i] = [];

        for (let j = 0; j < kn; j++) table[i][j] = 0;
    }

    let changing = true;

    while (changing) {
        changing = 0;

        for (let i = 1; i < kn; i++) {
            for (let j = 0; j < i; j++) {
                if (table[i][j] === 0) {
                    table[i][j] = foo(i, j, graph, table);
                    table[j][i] = table[i][j];

                    if (table[i][j] === 1) changing = 1;
                }
            }
        }
    }

    table[0][0] = n;

    return table;
};

function foo(u, v, graph, table) {
    for (let i = 0; i < 2; i++) {
        let q_u = graph[u][i];
        let q_v = graph[v][i];
        
        if (table[q_u >> 1][q_v >> 1] === 1 || table[q_v >> 1][q_u >> 1] === 1) return 1;

        if ((q_u + q_v) & 1) return 1;
    }

    return 0;
}