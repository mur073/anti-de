import { pattern, invalidInputMsg, checkLimits, overLimitMsg, powMod } from "./helper.js";

export const singleSetSave = input => {
    let [ k, n, m, ...polynome ] = input.split(pattern);

    if (!k || !n || !m || polynome.length < 2 * m) return invalidInputMsg;

    k = Number(k); n = Number(n); m = Number(m);

    if (k > 10 || !checkLimits(k, n)) return overLimitMsg;

    const ans = [];
    
    for (let i = 0; i < k; i++) {
        let sum = 0;
        for (let j = 0; j < 2 * m; j+= 2) {
            let tmp = 1;
            for (let l = 0; l < n; l++) {
                tmp =  (tmp * powMod(i, Number(polynome[j][l]), k)) % k;
            }
            tmp = (tmp * Number(polynome[j + 1])) % k;
            sum = (sum + tmp) % k;
        }
        if (sum === i) ans.push(i);
    }

    return ans;
}