import { pattern, invalidInputMsg, checkLimits, overLimitMsg } from "./helper.js";

export const isLinearFunction = input => {
    let [ k, n, value ] = input.split(pattern);
    let isLinear = 1;

    if (!k || !n || !value) {
        return invalidInputMsg;
    }

    k = Number(k); n = Number(n);

    if (!checkLimits(k, n)) {
        return overLimitMsg;
    }

    const matrix = [];

    for (let i = 0; i < value.length; i++) {
        matrix[i] = [];
        for (let j = 0; j < value.length; j++) {
            matrix[i][j] = 0;
        }

        matrix[i][0] = 0;
        matrix[0][i] = Number(value[i]);
    }

    for (let i = 1; i < value.length && isLinear; i++) {
        for (let j = i; j < value.length; j++) {
            matrix[i][j] = matrix[i - 1][j - 1] ^ matrix[i - 1][j];

            if (i == j) {
                if ((i & (i - 1)) && matrix[i][j]) {
                    isLinear = 0;
                    break;
                }
            }
        }
    }

    return isLinear;
};