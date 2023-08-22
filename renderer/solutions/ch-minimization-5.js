import { pattern, invalidInputMsg, dnfToVector } from "./helper.js";

export const tupikDNF = input => {
    let [ n, m, ...dnf ] = input.split(pattern);

    if (!n || !m || dnf.length < Number(m)) return invalidInputMsg;

    n = Number(n); m = Number(m);

    dnf = dnf.slice(0, m);

    dnf.sort(cmp);

    const cnt = 1 << m;
    const value = dnfToVector(cnt - 1, dnf);
    const set = new Set();

    for (let mask = 1; mask < cnt; mask++) {
        const tmp = dnfToVector(mask, dnf);

        if (tmp === value) set.add(mask);
    }

    const arr = Array.from(set);
    const st = new Set();

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if ((arr[i] & arr[j]) === arr[i]) st.add(arr[j]);
        }
    }

    const ans = [];

    for (let i = 0; i < arr.length; i++) {
        if (!st.has(arr[i])) ans.push(arr[i]);
    }

    ans.sort().reverse();

    return [ n, dnf, ans ];
}

const cmp = (a, b) => {
    for (let i = 0; i < a.length - 1; i++) {
        if (a[i] === "*" && b[i] !== "*") return 1;
        if (a[i] !== "*" && b[i] === "*") return -1;

        if (a[i] > b[i]) return 1;
        if (a[i] < b[i]) return -1;
    }

    return 0;
}