import { pattern, invalidInputMsg, overLimitMsg, checkLimits, pow, generateTable } from "./helper.js";

export const savePartition = input => {
    let [ k, n, value ] = input.split(pattern);

    if (!k || !n || !value) return invalidInputMsg;

    k = Number(k); n = Number(n);

    if (k > 10 || !checkLimits(k, n)) return overLimitMsg;

    const table = generateTable(k, n);

    const partitions = [];

    let part = [];
    for (let i = 0; i <= k; i++) part[i] = 0;
    part[k + 1] = 1;

    getAllPartitions(k, 0, part, partitions);

    let kn = pow(k, n);

    for (let i = 0; i < kn - 1; i++) {
        for (let j = i + 1; j < kn; j++) {
            for (let l = 1; l < partitions.length - 1; l++) {
                if (partitions[l][k + 1] === 0) continue;

                let condition1 = equivalentSets(k, n, table[i], table[j], partitions[l]);
                let condition2 = equivalentSets(k, 1, [value[i]], [value[j]], partitions[l]);

                if (condition1 && !condition2) partitions[l][k + 1] = 0;
            }
        }
    }

    return [ k, partitions ];
};

function getAllPartitions(k, index, part, partitions) {
    if (index === k) {
        partitions.push([...part]);
        return;
    }

    for (let i = 0; i < part[k]; i++) {
        part[i] |= (1 << (k - index - 1));

        getAllPartitions(k, index + 1, part, partitions);

        part[i] &= ~(1 << (k - index - 1));
    }

    part[part[k]] |= (1 << (k - index - 1));
    part[k]++;

    getAllPartitions(k, index + 1, part, partitions);

    part[k]--;
    part[part[k]] &= ~(1 << (k - index - 1));
};

const equivalentSets = (k, n, q, v, partition) => {
    let flag = false, symbol = n - 1;

    while (symbol >= 0) {
        flag = false;
        for (let i = 0; i < partition[k]; ++i) {
            let condition1 = (partition[i] >> (k - q[symbol] - 1)) & 1;
            let condition2 = (partition[i] >> (k - v[symbol] - 1)) & 1;

            if (condition1 && condition2) { flag = 1; break; }
        }

        if (flag) --symbol; else return false;
    }

    return true;
}