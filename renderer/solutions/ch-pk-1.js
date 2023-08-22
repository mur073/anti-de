import { pattern, invalidInputMsg, checkLimits, overLimitMsg, generateTable, pow } from "./helper.js";

export const isMonotoneFunctionPk = input => {
    let [ k, n, value ] = input.split(pattern);

    if (!k || !n || !value) return invalidInputMsg;

    k = Number(k); n = Number(n);

    if (k > 10 || !checkLimits(k, n)) return overLimitMsg;

    const table = generateTable(k, n);
    const kn = pow(k, n);
    let isMonotone = 1;

    for (let i = 0; i < kn; i++) {
        for (let j = 0; j < kn; j++) {
            if (i === j) continue;
            if (canCmp(table[i], table[j]) && value[i] < value[j]) {
                isMonotone = 0;
                console.log("aaa");
                break;
            }

            if (canCmp(table[j], table[i]) && value[i] > value[j]) {
                isMonotone = 0;
                break;
            }
        }

        if (!isMonotone) break;
    }

    return isMonotone;
};

const canCmp = (a, b) => {
    let len = a.length;

    for (let i = len - 1; i >= 0; i--) {
        if (a[i] < b[i]) return false;
    }

    return true;
};