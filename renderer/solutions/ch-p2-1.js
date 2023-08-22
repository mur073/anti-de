import { pattern, invalidInputMsg, checkLimits, overLimitMsg } from "./helper.js";

export const isMonotoneFunction = input => {
    let [ k, n, value ] = input.split(pattern);

    if (!k || !n || !value) {
        return invalidInputMsg;
    }

    k = Number(k); n = Number(n);

    if (!checkLimits(k, n)) {
        return overLimitMsg;
    }

    let isMonotone = 1;

    for (let i = 0; i < value.length - 1; i++) {
        for (let j = i + 1; j < value.length; j++) {
            if (canCmp(n, i, j) && value[i] > value[j]) {
                isMonotone = 0;
            }
        }
    }

    return isMonotone;
};

const canCmp = (n, a, b) => {
    for (let i = 0; i < n; i++) {
        if (((a >> i) & 1) && !((b >> i) & 1)) return 0;
    }

    return 1;
};