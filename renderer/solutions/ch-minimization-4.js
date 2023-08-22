import { pattern, invalidInputMsg, dnfToVector } from "./helper.js";

export const kernelDNF = (mode, input) => {
    let [ n, m, ...dnf ] = input.split(pattern);

    if (!n || !m || dnf.length < Number(m)) return invalidInputMsg;

    n = Number(n); m = Number(m);

    dnf = dnf.slice(0, m);
    
    const value = dnfToVector((1 << m) - 1, dnf);
    const sdnf = DNFtoSDNF(n, decToBin(value, 1 << n));
    const ans = new Set();

    for (let i = 0; i < sdnf.length; i++) {
        const st = new Set();
        for (let j = 0; j < dnf.length; j++) {
            if (isCover(dnf[j], sdnf[i])) st.add(dnf[j]);
        }

        if (st.size === 1) ans.add(...Array.from(st));
    }

    if (mode === 0) return ans;

    return [ n, Array.from(ans).sort(cmp) ];
};

const isCover = (a, b) => {
    let len = a.length;

    for (let i = 0; i < len; i++) {
        if (a[i] === "*") continue;
        if (a[i] !== b[i]) return false;
    }

    return true;
}

const DNFtoSDNF = (n, value) => {
    const sdnf = [];

    for (let i = 0; i < value.length; i++) {
        if (value[i]) {
            const tmp = [];
            for (let j = 0; j < n; j++) tmp[j] = (i >> (n - j - 1)) & 1;
            sdnf.push(tmp.join(""));
        }
    }
    return sdnf;
}

const decToBin = (n, size) => {
    let res = [];
    for (let i = 0; i < size; i++) {
        res[i] = (n >> (size - i - 1)) & 1;
    }

    return res.reverse();
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