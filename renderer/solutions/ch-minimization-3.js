import { pattern, invalidInputMsg } from "./helper.js";

export const BlakeEnd = input => {
    let [ n, m, ...dnf ] = input.split(pattern);

    if (!n || !m || dnf.length < Number(m)) return invalidInputMsg;

    n = Number(n); m = Number(m);

    if (dnf[dnf.length - 1] === "") dnf.pop();

    for (let i = 0; i < dnf.length; i++) { dnf[i] = dnf[i].split(""); dnf[i][n] = "+" }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < m; j++) {
            if (i === j) continue;
            if (canAbsorb(n, dnf[i], dnf[j])) {
                dnf[j][n] = '-';
            }
        }
    }

    return [ n, dnf ];
};

const canAbsorb = (n, k, l) => {
    for (let i = 0; i < n; i++) {
        if (k[i] === '*') continue;
        
        if (k[i] !== l[i]) return false;
    }
    
    return true;
};