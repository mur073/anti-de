const { execFile } = require('child_process');
const fs = require("fs");

import { currentTask, currentChapter } from './choose.js';
import { pattern } from '../solutions/helper.js';

import { ch_p2_1_tests, ch_p2_1_answers } from '../testing/ch-p2-1.js';


const runExeBtn = document.querySelector(".run-exe");
const fileInput = document.querySelector("#file-input");
const testOutput = document.querySelector("textarea.result");
const testInput = document.querySelector("textarea.testInput");

let filePath = testInput.value;

runExeBtn.addEventListener("click", () => {
    filePath = testInput.value;

    if (filePath === "") {
        testOutput.value = "Чтобы прогнать exe, необходимо ввести полный путь до этого файла\nв поле для ввода тестов (без кавычек)";
        testInput.select();
        testOutput.classList.add("error");
    } else if (currentTask === "-") {
        testOutput.value = "Ошибка! Пожалуйста, выберите раздел и задачу.";
        testOutput.classList.add("error");
    } else {
        testOutput.value = "";
        testOutput.classList.remove("error");

        if (currentChapter === "ch-p2" && currentTask === "1. Монотонность") {
            let err_code = test(filePath, ch_p2_1_tests, ch_p2_1_answers);
        }
    }
});

function test(filePath, tests, answers) {
    let err_code = 0;

    for (let i = 0; i < tests.length; i++) {
        fs.writeFile("/Users/mur_io/projects/a.txt", tests[i], (err) => {
            if (err) err_code = 1;

            runTests(filePath);
    
            if (!cmpAnswers(answers[i])) {
                console.log("error on ", i+1);
            }
        });
        if (err_code) break;
    }

    return err_code;
}

const runTests = (filepath) => {
    let err_code = 0;

    execFile(filepath, ["/Users/mur_io/projects/a.txt", "/Users/mur_io/projects/b.txt"], (error, stdout, stderr) => {
        if (error) {
            err_code = 1;
        }
    });

    return err_code;
}

const cmpAnswers = (answer) => {
    let ok = true;

    fs.readFile("/Users/mur_io/projects/b.txt", "utf-8", (err, content) => {
        const data = content.split(pattern);
        answer = answer.split(pattern);

        console.log(data);
        console.log(answer);

        let i = 0;

        while (i < answer.length) {
            console.log(i);

            if (data[i] != answer[i]) { ok = false; break; }

            i++;
        }
    });

    return ok;
}