import { findEqualStates } from "../solutions/ch-dfa-1.js";
import { areEqualAutomatas } from "../solutions/ch-dfa-2.js";
import { Superposition } from "../solutions/ch-dfa-3.js";
import { McCluskey } from "../solutions/ch-minimization-1.js";
import { BlakeBegin } from "../solutions/ch-minimization-2.js";
import { BlakeEnd } from "../solutions/ch-minimization-3.js";
import { kernelDNF } from "../solutions/ch-minimization-4.js";
import { tupikDNF } from "../solutions/ch-minimization-5.js";
import { isMonotoneFunction } from "../solutions/ch-p2-1.js";
import { isLinearFunction } from "../solutions/ch-p2-2.js";
import { isSelfDualFunction } from "../solutions/ch-p2-3.js";
import { isShefferFunction } from "../solutions/ch-p2-4.js";
import { isBasisSystem } from "../solutions/ch-p2-5.js";
import { zhegalkin } from "../solutions/ch-p2-6.js";
import { obolochka } from "../solutions/ch-p2-7.js";
import { isMonotoneFunctionPk } from "../solutions/ch-pk-1.js";
import { setSave } from "../solutions/ch-pk-2.js";
import { singleSetSave } from "../solutions/ch-pk-3.js";
import { savePartition } from "../solutions/ch-pk-4.js";
import { isShefferFunctionPk } from "../solutions/ch-pk-5.js";
import { obolochkaPk } from "../solutions/ch-pk-6.js";
import { cntOnes, decToBin, pattern } from "../solutions/helper.js";

const chapterSelect = document.querySelector("select.chapter");
const taskSelect = document.querySelector("select.task");

const solveBtn = document.querySelector(".solve_test");
const testInput = document.querySelector("textarea.testInput"); // input tests
const testOutput = document.querySelector("textarea.result");

solveBtn.addEventListener("click", e => {
    if (chapterSelect.value === "ch-none" || taskSelect.value === "-") {
        testOutput.value = "Ошибка! Пожалуйста, выберите раздел и задачу.";
        testOutput.classList.add("error");
    } else {
        testOutput.classList.remove("error");
    }
    
    if (chapterSelect.value === "ch-p2" && taskSelect.value === "1. Монотонность") {
        testOutput.value = isMonotoneFunction(testInput.value);
    } else if (chapterSelect.value === "ch-p2" && taskSelect.value === "2. Линейность") {
        testOutput.value = isLinearFunction(testInput.value);
    } else if (chapterSelect.value === "ch-p2" && taskSelect.value === "3. Самодвойственность") {
        testOutput.value = isSelfDualFunction(testInput.value);
    } else if (chapterSelect.value === "ch-p2" && taskSelect.value === "4. Шефферовость") {
        testOutput.value = isShefferFunction(testInput.value);
    } else if (chapterSelect.value === "ch-p2" && taskSelect.value === "5. Базис") {
        testOutput.value = isBasisSystem(testInput.value);
    } else if (chapterSelect.value === "ch-p2" && taskSelect.value === "6. Полином Жегалкина") {
        const tmp = zhegalkin(testInput.value);
        if (typeof(tmp) === "string") testOutput.value = tmp;
        else testOutput.value = tmp.join("");
    } else if (chapterSelect.value === "ch-p2" && taskSelect.value === "7. Оболочка") {
        const out = obolochka(testInput.value);
        if (typeof(out) === "string") testOutput.value = out;
        else {
            testOutput.value = "";
            for (let i = 0; i < out.length; i++) testOutput.value += `2 2 ${out[i].join("")}\n`;
        }
    } else if (chapterSelect.value === "ch-pk" && taskSelect.value === "1. Монотонность") {
        testOutput.value = isMonotoneFunctionPk(testInput.value);
    } else if (chapterSelect.value === "ch-pk" && taskSelect.value === "2. Сохранение") {
        testOutput.value = "";
        const tmp = setSave(testInput.value);
        if (typeof(tmp) === "string") testOutput.value = tmp;
        else {
            let [ k, st ] = tmp;

            for (let i = 1; i < (1 << k) - 1; i++) {
                if (!st.has(i)) {
                    for (let j = 0; j < k; j++) if ((i >> (k - j - 1)) & 1) testOutput.value += j

                    if (i !== (1 << k) - 2) testOutput.value += "\n";
                }
            }
            
            const output = testOutput.value.split(pattern);
            output.sort();
            testOutput.value = output.join("\n");
        }
    } else if (chapterSelect.value === "ch-pk" && taskSelect.value === "3. Сохранение 2") {
        const tmp = singleSetSave(testInput.value);
        if (typeof(tmp) === "string") testOutput.value = tmp;
        else if (tmp.length === 0) testOutput.value = -1;
        else testOutput.value = tmp.join(" ");
    } else if (chapterSelect.value === "ch-pk" && taskSelect.value === "4. Сохранение 3") {
        testOutput.value = "";
        let [ k, partitions ] = savePartition(testInput.value);
        const partitions_cnt = partitions.length;

        if (typeof(partitions) === "string") testOutput.value = partitions;
        else {
            for (let i = partitions_cnt - 1; i >= 0; --i) {
                if (partitions[i][k + 1] === 0) continue;
        
                for (let j = 0; j < partitions[i][k]; ++j) {
                    if (j) testOutput.value += " ";
                    let idx = k-1;
                    while (idx >= 0) {
                        if ((partitions[i][j] >> idx) & 1) {
                            testOutput.value += k - idx - 1;
                        }
                        --idx;
        
                    }
                }
                if (i) testOutput.value += "\n";
            }

            const tmp = testOutput.value.split("\n");
            tmp.sort();
            if (tmp[0] == "") testOutput.value = tmp.slice(1).join("\n");
            else testOutput.value = tmp.join("\n");
        }
    } else if (chapterSelect.value === "ch-pk" && taskSelect.value === "6. Оболочка") {
        const tmp = obolochkaPk(testInput.value);
        testOutput.value = "";
        if (typeof(tmp) === "string") testOutput.value = tmp;
        else {
            for (let i = 0; i < tmp.length - 1; i++) {
                testOutput.value += `${tmp[tmp.length - 1]} 1 ${tmp[i].join("")}\n`;
            }
        }
    } else if (chapterSelect.value === "ch-pk" && taskSelect.value === "5. Шефферовость") {
        testOutput.value = isShefferFunctionPk(testInput.value);
    } else if (chapterSelect.value === "ch-dfa" && taskSelect.value === "1. Состояния") {
        testOutput.value = "";

        const tmp = findEqualStates(testInput.value);
        if (typeof(tmp) === "string") testOutput.value = tmp;
        else {
            const kn = 1 << tmp[0][0];

            let found = false;
            for (let i = 0; i < kn - 1; i++) {
                for (let j = i + 1; j < kn; j++) {
                    if (tmp[j][i] === 0) {
                        found = true;
                        testOutput.value += `${decToBin(i, tmp[0][0]).join("")} `;
                        testOutput.value += `${decToBin(j, tmp[0][0]).join("")} `;
                    }
                }
            }

            if (!found) {
                testOutput.value = "-1";
            }
    }
    } else if (chapterSelect.value === "ch-dfa" && taskSelect.value === "2. Эквивалентность") {
        testOutput.value = areEqualAutomatas(testInput.value);
    } else if (chapterSelect.value === "ch-dfa" && taskSelect.value === "3. Суперпозиция") {
        testOutput.value = "";
        const tmp = Superposition(testInput.value);
        if (typeof(tmp) === "string") testOutput.value = tmp;
        else {
            const n = tmp[tmp.length - 1];
            const kn = 2 << n;

            testOutput.value += `${n} ${tmp[tmp.length - 2]}\n`;

            for (let i = 0; i <= n; i++) {
                testOutput.value += `2 ${n + 1} `;
                for (let j = 0; j < kn; j++) {
                    testOutput.value += tmp[j][i];
                }
                testOutput.value += "\n";
            }
        }
    } else if (taskSelect.value === "1. Алгоритм Квайна-МакКласки") {
        testOutput.value = "";
        const tmp = McCluskey(testInput.value);
        if (typeof(tmp) === "string") testOutput.value = tmp;
        else {
            let [ n, num, ans ] = tmp;
            testOutput.value += `${n} ${num}\n`;

            for (let i = 0; i < ans.length; i++) {
                if (ans[i][n] !== "-") testOutput.value += `${ans[i].slice(0, n).join("")}\n`;
            }
        }
    } else if (taskSelect.value === "2. Алгоритм Блейка") {
        testOutput.value = "";
        
        const data = BlakeBegin(testInput.value);
        if (typeof(data) === "string") testOutput.value = data;
        else {
            let [ n, tmp ] = data;
            let m = tmp.length

            testOutput.value = `${n} ${m}\n`;
            for (let i = 0; i < m; i++)  testOutput.value += `${tmp[i]}\n`;
        }
    } else if (taskSelect.value === "3. Алгоритм Блейка 2") {
        const tmp = BlakeEnd(testInput.value);
        
        testOutput.value = "";
        if (typeof(tmp) === "string") testOutput.value = tmp;
        else {
            let [ n, dnf ] = tmp;
            let m = dnf.filter(k => k[n] === "+").length;
            
            testOutput.value += `${n} ${m}\n`;
            for (let i = 0; i < dnf.length; i++) {
                if (dnf[i][n] === "+") testOutput.value += `${dnf[i].slice(0, n).join("")}\n`;
            }
        }
    } else if (taskSelect.value === "4. Ядро") {
        testOutput.value = "";

        const tmp = kernelDNF(1, testInput.value);
        if (typeof(tmp) === "string") testOutput.value = tmp;
        else {
            let [ n, kernel ] = tmp;

            testOutput.value = `${n} ${kernel.length}\n`;
            for (let i = 0; i < kernel.length; i++) {
                testOutput.value += `${kernel[i]}\n`;
            }
        }
    } else if (taskSelect.value === "5. Тупиковые ДНФ") {
        testOutput.value = "";

        const tmp = tupikDNF(testInput.value);
        if (typeof(tmp) === "string") testOutput.value = tmp;
        else {
            let [ n, dnf, ans ] = tmp;

            for (let i = 0; i < ans.length; i++) {
                let m = cntOnes(ans[i], dnf.length);

                testOutput.value += `${n} ${m}\n`;

                for (let j = 0; j < dnf.length; j++) {
                    if ((ans[i] >> (dnf.length - j - 1)) & 1) {
                        testOutput.value += `${dnf[j]}\n`;
                    }
                }
            }
        }
    }
});
