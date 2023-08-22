import { pattern, invalidInputMsg, checkLimits, overLimitMsg } from "./helper.js";
import { isMonotoneFunction } from "./ch-p2-1.js";
import { isLinearFunction } from "./ch-p2-2.js";

export const isShefferFunction = input => {
    let [ k, n, value] = input.split(pattern);

    if (!k || !n || !value) return invalidInputMsg;

    k = Number(k); n = Number(n);

    if (!checkLimits(k, n)) return overLimitMsg;

    let len = value.length
    let isT0 = value[0] === "0";
    let isT1 = value[len - 1] === "1";

    let isSelfDual = 1;
    for (let i = 0; i < len / 2; i++) {
        if (value[i] === value[len - i - 1]) isSelfDual = 0;
    }

    
    return Number(!isT0 && !isT1 && !isMonotoneFunction(input) && !isLinearFunction(input) && !isSelfDual);
};