import { pattern, invalidInputMsg } from "./helper.js";

export const BlakeBegin = input => {
    let [ n, m, ...dnf ] = input.split(pattern);

    if (!n || !m || dnf.length < Number(m)) return invalidInputMsg;

    n = Number(n); m = Number(m);
    
    if (dnf[dnf.length - 1] === "") dnf.pop()

    const set = new Set(dnf);

    let changing = true;
    while (changing) {
        changing = 0;
        m = dnf.length;

        for (let i = 0; i < m - 1; i++) {
            for (let j = 0; j < n; j++) {
                for (let l = i + 1; l < m; l++) {
                    const tmp = cofactor(j, dnf[i], dnf[l])
                    if (tmp && !set.has(tmp)) { dnf.push(tmp); set.add(tmp); changing = 1; }
                }
            }
        }
    }

    dnf.sort(cmp);

    return [ n, dnf ];
};

const cofactor = (index, a, b) => {
    const res = a.split("");
    
    if (a[index] === b[index] || a[index] === "*" || b[index] === "*") return null;

    res[index] = "*";

    for (let i = 0; i < a.length; i++) {
        if (i === index) continue;

        if (a[i] === b[i]) {
            res[i] = a[i];
        } else {
            if (a[i] === "*") {
                res[i] = b[i];
            } else if (b[i] === "*") {
                res[i] = a[i];
            } else {
                res[i] = Number(a[i]) * Number(b[i]);
                if (res[i] === 0) return null;
            }
        }
    }

    return res.join("");
};

const cmp = (a, b) => {
    for (let i = 0; i < a.length; i++) {
        if (a[i] === "*" && b[i] !== "*") return 1;
        if (a[i] !== "*" && b[i] === "*") return -1;

        if (a[i] > b[i]) return 1;
        if (a[i] < b[i]) return -1;
    }

    return 0;
}