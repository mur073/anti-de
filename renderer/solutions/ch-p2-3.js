import { pattern, invalidInputMsg, overLimitMsg, checkLimits, pow } from "./helper.js";

export const isSelfDualFunction = input => {
    let [ k, n, m, ...polynome ] = input.split(pattern);

    if (!k || !n || !m || polynome.length < 2 * m) {
        return invalidInputMsg;
    }

    k = Number(k); n = Number(n); m = Number(m);
    
    if (!checkLimits(k, n)) {
        return overLimitMsg;
    }
    
    const value = polynomeToVector(k, n, m, polynome);

    let isSelfDual = 1, len = value.length;

    for (let i = 0; i < len / 2; i++) {
        if (value[i] == value[len - i - 1]) isSelfDual = 0;
    }

    return isSelfDual;
};

const polynomeToVector = (k, n, m, polynome) => {
    const value = [];
    let len = pow(k, n);

    for (let x = 0; x < len; x++) {
        let res = 0;
        for (let i = 0; i < 2*m; i += 2) {
            let tmp = 1;
            for (let j = 0; j < n; j++) {
                tmp *= pow((x >> (n - 1 - j)) & 1, polynome[i][j]);
            }
            res = (res + tmp) % k;
        }
        value[x] = res;
    }

    return value;
};