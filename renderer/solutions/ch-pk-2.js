import { pattern, invalidInputMsg, checkLimits, overLimitMsg, pow, generateTable } from "./helper.js";

export const setSave = input => {
    let [ k, n, value ] = input.split(pattern);

    if (!k || !n || !value) return invalidInputMsg;

    k = Number(k); n = Number(n);

    if (k > 10 || !checkLimits(k, n)) return overLimitMsg;

    const table = generateTable(k, n);
    const kn = pow(k, n);

    const notSave = new Set();

    for (let i = 1; i < (1 << k) - 1; i++) {
        for (let j = 0; j < kn; j++) {
            const c1 = ((i >> (k - value[j] - 1)) & 1);
            if (canCmp(table[j], k, i) && !c1) {
                notSave.add(i);
            }
        }
    }

    return [ k, notSave ];
};

const canCmp = (word, k, subSet) => {
    let i = word.length - 1;

    while (i >= 0) {
        if (!((subSet >> (k - word[i] - 1)) & 1)) {
            return false;
        }
        i--;
    }

    return true;
};