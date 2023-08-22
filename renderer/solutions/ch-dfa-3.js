import { pattern, invalidInputMsg, tableToGraph, decToBin } from "./helper.js";

export const Superposition = input => {
    let data = input.split(pattern);

    if (!data) return invalidInputMsg;

    let n = Number(data[0]);
    let m = Number(data[3 * n + 5 - (n === 0)]);
    let u = "0", v = "0";
    
    if (isNaN(n) || isNaN(m)) return invalidInputMsg;
    
    const kn = 1 << n;
    const km = 1 << m;
    let graph1, graph2, rgraph = [];

    for (let i = 0; i < 1 << (n + m); i++) rgraph[i] = [0,0];

    if (n === 0 && m == 0) {
        return "Извините, меня не научили как обрабатывать\nтакие автоматы 😭😭😭";

        return Number(data[3] === data[7]);
    } else if (n === 0) {
        if (data.length < 3 * (m + 1)  + 6) return invalidInputMsg;

        graph1 = tableToGraph(n, data.slice(1, 4));
        graph2 = tableToGraph(m, data.slice(6));
        v = data[3 * n + 5];
    } else if (m === 0) {
        if (data.length < 3 * (n + 1)  + 6) return invalidInputMsg;

        graph1 = tableToGraph(n, data.slice(2, 3 * n + 5));
        graph2 = tableToGraph(m, data.slice(3 * n + 6));
        u = data[1];
    } else {
        if (data.length < 3 * (n + m + 2) + 4) return invalidInputMsg;

        graph1 = tableToGraph(n, data.slice(2, 3 * n + 5));
        graph2 = tableToGraph(m, data.slice(3 * n + 7));
        u = data[1]; v = data[3 * n + 6];
    }
    
    for (let i = 0; i < kn * 2; i++) {
        for (let j = 0; j < km * 2; j++) {
            for (let x = 0; x < 2; x++) {
                const out1 = graph1[i >> 1][x] & 1;
                const out2 = graph2[j >> 1][out1] & 1;
                const state = concat(n, i >> 1, m, j >> 1);
                rgraph[state][x] = concat(n, graph1[i >> 1][x] >> 1, m, graph2[j >> 1][out1] >> 1) * 2 + out2;
            }
        }
    }

    const table = graphToTable(n + m, rgraph);

    if (n === 0) table.push(v);
    else if (m === 0) table.push(u);
    else table.push(u.concat(v));

    table.push(n + m);

    return table;
};

const concat = (n, u, m, v) => {
    let ans = 0;
    for (let i = 0; i < n; i++) ans += ((u >> (n - i - 1)) & 1) * (1 << (n + m - i - 1));
    for (let i = 0; i < m; i++) ans += ((v >> (m - i - 1)) & 1) * (1 << (m - i - 1));

    return ans;
};

const graphToTable = (n, graph) => {
    const table = [];
    const kn = 2 << n;

    for (let i = 0; i < kn; i++) {
        table[i] = decToBin(graph[i >> 1][i & 1], n+1);
    }

    return table;
}