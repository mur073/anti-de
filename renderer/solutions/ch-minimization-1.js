import { pattern, invalidInputMsg } from "./helper.js";

export const McCluskey = input => {
    let [ k, n, value ] = input.split(pattern);

    if (!k || !n || !value) return invalidInputMsg;

    k = Number(k); n = Number(n);

    const set = new Set();

    let table = init(n, value);
    let limit = 1 << n;

    while (table.size && limit) {
        const classes = [];
        const newTable = new Set();
    
        for (let i = 0; i <= n; i++) classes[i] = [];
    
        for (let item of table) classes[foo(item)].push(item);

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < classes[i].length; j++) {
                for (let l = 0; l < classes[i + 1].length; l++) {
                    let tmp = canGlue(classes[i][j], classes[i + 1][l]);
                    if (tmp >= 0) {
                        const tmpArr = [...classes[i][j]]; 
                        classes[i][j][n] = "*";
                        classes[i + 1][l][n] = "*";

                        tmpArr[tmp] = "*"; 
                        tmpArr[n] = "+"; 
                        newTable.add(tmpArr);
                    }
                }
            }
        }

        for (let item of table) 
            if (item[n] === "+") set.add([...item]);

        table = newTable;
        limit--;
    }

    const ans = Array.from(set);
    let num = ans.length;
    ans.sort(cmp);

    for (let i = 0; i < ans.length - 1; i++) {
        let cnt = 0;
        for (let j = 0; j < n; j++) {
            if (ans[i][j] === ans[i + 1][j]) cnt++;
        }

        if (cnt === n) { ans[i + 1][n] = "-"; num--; }
    }

    return [ n, num, ans];
};

const init = (n, value) => {
    const table = new Set();
    const sdnf = [];

    for (let i = 0; i < value.length; i++) {
        if (value[i] === "1") {
            sdnf.push(i);

            const tmp = [];  tmp[n] = "+";
            for (let j = 0; j < n; j++) {
                const a = (i >> (n - j - 1)) & 1;
                tmp[j] = a;
            }
            table.add(tmp);
        }
    }

    return table;
}

const canGlue = (a, b) => {
    let cnt = 0;
    let pos = -1;

    for (let i = 0; i < a.length - 1; i++) {
        if (a[i] != b[i]) {
            pos = i;
            cnt++;
            if (cnt > 1) break;
        }
    }

    return cnt === 1 ? pos : -1;
};

const binToDec = arr => {
    let res = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        res += arr[i] * (1 << (arr.length - i - 2));
    }

    return res;
}

const foo = a => a.filter(x => x === 1).length

const cmp = (a, b) => {
    for (let i = 0; i < a.length - 1; i++) {
        if (a[i] === "*" && b[i] !== "*") return 1;
        if (a[i] !== "*" && b[i] === "*") return -1;

        if (a[i] > b[i]) return 1;
        if (a[i] < b[i]) return -1;
    }

    return 0;
}