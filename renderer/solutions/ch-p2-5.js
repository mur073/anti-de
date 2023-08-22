import { isMonotoneFunction } from "./ch-p2-1.js";
import { isLinearFunction } from "./ch-p2-2.js";
import { pattern, invalidInputMsg, checkLimits, overLimitMsg } from "./helper.js";

export const isBasisSystem = input => {
    let [ cnt, ...functions ] = input.split(pattern);

    if (!cnt || functions.length < 3 * cnt) return invalidInputMsg;
    
    cnt = Number(cnt);
    
    if (!checkLimits(2, cnt)) return overLimitMsg;

    const table = [];
    let isBasis = 1;

    for (let i = 0; i < cnt; i++) table[i] = [];

    for (let i = 0; i < cnt; i++) {
        table[i][0] = isT0(functions[3 * i + 2]);
        table[i][1] = isT1(functions[3 * i + 2]);
        table[i][2] = isLinearFunction([2, functions[3 * i + 1], functions[3 * i + 2]].join(" "));
        table[i][3] = isMonotoneFunction([2, functions[3 * i + 1], functions[3 * i + 2]].join(" "));
        table[i][4] = isSelfDualFunction(functions[3 * i + 2]);
    }

    for (let i = 0; i < 5; i++) {
        let tmp = 0;
        for (let j = 0; j < cnt; j++) {
            tmp += table[j][i];
        }

        if (tmp === cnt) return 0;
    }

    let stc = 1 << cnt; // SeT Count - number of elements in the set of given functions
    for (let i = 1; i < stc - 1; i++) {
        if (foo(i, table)) {
            isBasis = 0;
            break;
        }
    }

    return isBasis;
};

const isT0 = value => Number(value[0] === "0");
const isT1 = value => Number(value[value.length - 1] === "1");

const isSelfDualFunction = value => {
    let len = value.length;
    for (let i = 0; i < len / 2; i++) {
        if (value[i] === value[len - i - 1]) return 0;
    }

    return 1;
};

// check all possible subsets of the set of given functions if one of them is also basis
const foo = (mask, table) => {
    let cnt = table.length;

    let n = 0;
    for (let i = 0; i < cnt; i++) n += (mask >> i) & 1;

    for (let i = 0; i < 5; i++) {
        let tmp = 0;
        for (let j = 0; j < cnt; j++) {
            if ((mask >> (cnt - j - 1)) & 1) tmp += table[j][i];
        }

        if (tmp === n) return 0;
    }

    return 1;
};