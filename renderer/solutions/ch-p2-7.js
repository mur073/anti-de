import { pattern, invalidInputMsg, pow } from "./helper.js";

export const obolochka = input => {
    let [ k, n, value ] = input.split(pattern);

    if (!k || !n || !value) return invalidInputMsg;

    k = Number(k); n = Number(n);

    if (k !== 2 || n !== 3) {
        return "В этой задаче во всех тестах k = 2 и n = 3"
    }

    const allFunctions = [];
    allFunctions[0] = [0, 0, 1, 1]; allFunctions[1] = [0, 1, 0, 1];

    const functions = new Set();
    functions.add(binToDec(...allFunctions[0])); functions.add(binToDec(...allFunctions[1]));

    let getNew = true;
    
    while (getNew) {
        let counter = [0,0,0];
        let cnt = pow(allFunctions.length, 3);
        let index = allFunctions.length - 1;
        
        getNew = false;
        
        for (let i = 0; i < cnt - 1; i++) {
            const newFunction = [];

            for (let j = 0; j < 4; j++) {
                newFunction[j] = Number(value[binToDec(allFunctions[counter[0]][j],allFunctions[counter[1]][j],allFunctions[counter[2]][j])]);
            }

            let tmp = binToDec(...newFunction);
            if (!functions.has(tmp)) {
                getNew = true;

                functions.add(tmp);
                allFunctions.push(newFunction);
            }

            counter = incArr(counter, index);
        }
    }

    allFunctions.sort();

    return allFunctions;
}

function binToDec() {
    let ans = 0;
    let len = arguments.length;
    for (let i = 0; i < len; i++) {
        ans += arguments[i] * (1 << (len - i - 1));
    }
    return ans;
}

const incArr = (counter, k) => {
    let i = counter.length - 1;
    while (counter[i] === k && i > 0) { counter[i] = 0; i--; }
    counter[i]++;
    return counter;
};