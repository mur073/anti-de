import { pattern, invalidInputMsg, tableToGraph } from "./helper.js";

export const areEqualAutomatas = input => {
    let data = input.split(pattern);

    if (!data) return invalidInputMsg;

    let n = Number(data[0]);
    let m = Number(data[3 * n + 5 - (n === 0)]);
    let u = "0", v = "0";

    if (isNaN(n) || isNaN(m)) return invalidInputMsg;

    let graph1, graph2;

    if (n === 0 && m == 0) {
        if (data.length < 8) return invalidInputMsg;

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

    const set = new Set();
    set.add(binToDec(u) * 10 + binToDec(v));
    
    const stack =  [];
    stack.push([binToDec(u) << 1, binToDec(v) << 1]);

    let areEqual = 1;
    while (stack.length && areEqual) {
        const currentPair = stack.pop();

        for (let i = 0; i < 2; i++) {
            if ((graph1[currentPair[0] >> 1][i] & 1) !== (graph2[currentPair[1] >> 1][i] & 1)) {
                areEqual = 0;
                break;
            }

            const nextPair = findNextPair(i, currentPair, graph1, graph2);

            const tmp = concat(n, nextPair[0] >> 1, m, nextPair[1] >> 1);
            if (!set.has(tmp)) {
                set.add(tmp);
                stack.push(nextPair);
            }
        }
    }

    return areEqual;
};

const findNextPair = (word, currentPair, graph1, graph2) => {
    return [ graph1[currentPair[0] >> 1][word], graph2[currentPair[1] >> 1][word] ];
};

const binToDec = bin => {
    let len = bin.length;
    let ans = 0;
    
    for (let i = 0; i < len; i++) {
        ans += Number(bin[i]) * (1 << (len - i - 1));
    }
    
    return ans;
}

const concat = (n, u, m, v) => {
    let ans = 0;
    for (let i = 0; i < n; i++) ans += ((u >> (n - i - 1)) & 1) * (1 << (n + m - i - 1));
    for (let i = 0; i < m; i++) ans += ((v >> (m - i - 1)) & 1) * (1 << (m - i - 1));

    return ans;
};