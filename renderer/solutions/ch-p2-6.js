import { pattern, invalidInputMsg, checkLimits, overLimitMsg } from "./helper.js";

export const zhegalkin = input => {
    let [ k, n, value ] = input.split(pattern);

    if (!k || !n || !value) return invalidInputMsg;

    k = Number(k); n = Number(n);
    
    if (!checkLimits(k, n)) return overLimitMsg;

    const matrix = [];


    for (let i = 0; i < value.length; i++) {
        matrix[i] = [];
        for (let j = 0; j < value.length; j++) {
            matrix[i][j] = 0;
        }

        matrix[i][0] = 0;
        matrix[0][i] = Number(value[i]);
    }

    let cnt = matrix[0][0];

    for (let i = 1; i < value.length; i++) {
        for (let j = i; j < value.length; j++) {
            matrix[i][j] = matrix[i - 1][j - 1] ^ matrix[i - 1][j];

            if (i == j) cnt += matrix[i][j];
        }
    }

    let ans = ["2 ", `${n} `, cnt, "\n"];

    for (let i = 0; i < value.length; i++) {
        if (matrix[i][i]) {
            let tmp = [];
            for (let j = 0; j < n; j++) {
                tmp[j] = (i >> (n - j - 1) & 1);
            }
            ans.push(tmp.join(""), " 1", "\n");
        }
    }

    return ans;
}