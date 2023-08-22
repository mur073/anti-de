export const pattern = /\s\s*|\n\n*/g;
export const invalidInputMsg = "Проверьте правильность введенных данных :\\";
export const overLimitMsg = "Извините, но программа не оптимизирована для работы с такими большими значениями k :("

const LIMIT = 6000000;

export const checkLimits = (k, n) => {
    const tmp = pow(k, n);
    return tmp < LIMIT;
}

export const cntOnes = (num, size) => {
    let res = 0;
    for (let i = 0; i < size; i++) res += (num >> i) & 1;
    return res;
}

export const pow = (a, n) => {
    let res = 1;

    while (n) {
        if (n & 1) res *= a;
        a *= a;
        n >>= 1;
    }

    return res;
}

export const powMod = (a, n, mod) => {
    let res = 1;

    a = a % mod;

    while (n) {
        if (n & 1) res = (res * a) % mod;
        a = (a * a) % mod;
        n >>= 1;
    }

    return (res % mod);
}

export const generateTable = (k, n) => {
    const table = [];
    const kn = pow(k, n);

    for (let i = 0; i < kn; i++) table[i] = [];;

    for (let i = 0; i < n; i++) table[0][i] = 0;

    for (let i = 1; i < kn; i++) {
        for (let j = 0; j < n; j++) table[i][j] = table[i - 1][j];

        let l = n - 1;
        while (l > 0 && table[i][l] === k-1) { table[i][l] = 0; l--; }
        table[i][l]++;
    }

    return table;
}

export const tableToGraph = (n, automata) => {
    const graph = [];
    const kn = 1 << n;

    for (let i = 0; i < kn; i++) graph[i] = [0, 0];

    for (let i = 2; i <= 3 * (n + 1); i += 3) {
        for (let j = 0; j < automata[i].length; j++) {
            if (automata[i][j] === "1") {
                graph[j >> 1][j & 1] |= (1 << (n - (i - 2) / 3));
            }
        }
    }

    return graph;
}

export const decToBin = (n, size) => {
    const res = [];

    for (let i = 0; i < size; i++) {
        res[i] = (n >> (size - i - 1)) & 1;
    }

    return res;
}

export const dnfToVector = (mask, dnf) => {
    const n = dnf[0].length;
    const m = dnf.length;
    const cnt = 1 << n;

    let value = 0;

    for (let word = 0; word < cnt; word++) {
        let sum = 0;
        for (let i = 0; i < m; i++) {
            if (!((mask >> (m - i - 1)) & 1)) continue;

            let tmp = 1;
            for (let j = 0; j < n; j++) {
                if (dnf[i][j] === "*") continue;
                else if (dnf[i][j] === "1") tmp = tmp * ((word >> (n - j - 1)) & 1);
                else tmp = tmp * (!((word >> (n - j - 1)) & 1));
            }
            sum |= tmp;
        }
        
        if (sum) value |= (1 << word);
    }

    return value;
}
