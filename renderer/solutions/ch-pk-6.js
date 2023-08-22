import { pattern, invalidInputMsg, overLimitMsg, checkLimits, pow } from "./helper.js";

export const obolochkaPk = input => {
    let [ k, n, value ] = input.split(pattern);

    if (!k || !n || !value) return invalidInputMsg;

    k = Number(k); n = Number(n);

    if (value.length !== pow(k, n)) return invalidInputMsg;

    if (n !== 2) return "В этой задаче во всех тестах n = 2";
    if (k > 10) return overLimitMsg;

    const allFunctions = []; allFunctions[0] = [];
    const functions = new Set();
    const kk = pow(k, k);
    
    for (let i = 0; i < k; i++) allFunctions[0][i] = i;

    functions.add(kToDec(allFunctions[0], k));
    
    let getNew = true;

    while (allFunctions.length < kk && getNew) {
        let counter = [0,0];
        let cnt = pow(allFunctions.length, 2);
        let index = allFunctions.length - 1;
        
        getNew = false;
        
        for (let i = 0; i < cnt; i++) {
            const newFunction = [];

            for (let j = 0; j < k; j++) {
                newFunction[j] = Number(value[kToDec([allFunctions[counter[0]][j], allFunctions[counter[1]][j]], k)]);
            }

            let tmp = kToDec(newFunction, k);
            if (!functions.has(tmp)) {
                getNew = true;

                functions.add(tmp);
                allFunctions.push(newFunction);
            }

            counter = incArr(counter, index);
        }
    }

    allFunctions.sort();

    allFunctions.push(k);

    return allFunctions;
}

function kToDec(arr, k) {
    let ans = 0;
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        ans += arr[i] * pow(k, len - i - 1);
    }
    return ans;
}

const incArr = (counter, k) => {
    let i = counter.length - 1;
    while (counter[i] === k && i > 0) { counter[i] = 0; i--; }
    counter[i]++;
    return counter;
};