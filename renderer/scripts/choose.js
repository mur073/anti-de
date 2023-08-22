import { obj } from "./tests.js";

const chapterSelect = document.querySelector("select.chapter");
const chapterLabel = document.querySelector(".chapter-lbl");
const taskSelect = document.querySelector("select.task");
const taskLabel = document.querySelector(".task-lbl"); 
const loadTestsBtn = document.querySelector("button.load-btn"); // loads all tests
const copyBtn = document.querySelectorAll(".copy");

const modal = document.querySelector(".modal");
const infoImg = document.querySelector(".info img");
const modalClose = document.querySelector(".modal-close img");
const tgBtn = document.querySelector(".telegram img");
// const gitBtn = document.querySelector(".github img"); soon

const testOutput = document.querySelector("textarea.result"); // textarea for printing the answer of custom test
const testsInput = document.querySelector("textarea.tests"); // textarea for printing all available tests

export let currentChapter = "ch-none";
export let currentTask = "-";

export const chapters = {
    "ch-minimization": ["-", "1. Алгоритм Квайна-МакКласки", "2. Алгоритм Блейка", "3. Алгоритм Блейка 2", "4. Ядро", "5. Тупиковые ДНФ"],
    "ch-dfa": ["-", "1. Состояния", "2. Эквивалентность", "3. Суперпозиция"],
    "ch-pk": ["-", "1. Монотонность", "2. Сохранение", "3. Сохранение 2", "4. Сохранение 3", "5. Шефферовость", "6. Оболочка"],
    "ch-p2": ["-", "1. Монотонность", "2. Линейность", "3. Самодвойственность", "4. Шефферовость", "5. Базис", "6. Полином Жегалкина", "7. Оболочка"],
    "ch-none": ["-"]
}

const indexes = {
    "1. Алгоритм Квайна-МакКласки": 0, "2. Алгоритм Блейка": 1, "3. Алгоритм Блейка 2": 2, "4. Ядро": 3, "5. Тупиковые ДНФ": 4,
    "1. Монотонность": 0, "2. Линейность": 1, "3. Самодвойственность": 2, "4. Шефферовость": 3, "5. Базис": 4, "6. Полином Жегалкина": 5, "7. Оболочка": 6,
    "2. Сохранение": 1, "3. Сохранение 2": 2, "4. Сохранение 3": 3, "5. Шефферовость": 4, "6. Оболочка": 5,
    "1. Состояния": 0, "2. Эквивалентность": 1, "3. Суперпозиция": 2
}

chapterSelect.addEventListener("change", (e) => {
    currentChapter = e.target.value;

    taskLabel.textContent = "Задача ▾";
    currentTask = "-";

    if (currentChapter === "ch-none") {
        chapterLabel.textContent = "Раздел ▾";
    } else if (currentChapter === "ch-p2") {
        chapterLabel.textContent = "P2";
    } else if (currentChapter === "ch-pk") {
        chapterLabel.textContent = "Pk";
    } else if (currentChapter === "ch-dfa") {
        chapterLabel.textContent = "Автоматы";
    } else if (currentChapter === "ch-minimization") {
        chapterLabel.textContent = "Минимизация ДНФ";
    }

    while (taskSelect.firstChild) {
        taskSelect.removeChild(taskSelect.firstChild);
    }

    for (let i = 0; i < chapters[currentChapter].length; i++) {
        const newOption = document.createElement("option");
        const optionValue = document.createTextNode(`${chapters[currentChapter][i]}`);

        newOption.classList.add(`${currentChapter}_${i}`);
        newOption.appendChild(optionValue);
        taskSelect.appendChild(newOption);
    }
});


taskSelect.addEventListener("change", (e) => {
    currentTask = e.target.value;

    if (currentTask === "-") {
        taskLabel.textContent = "Задача ▾";
    } else {
        taskLabel.textContent = currentTask.slice(2);
    }
});


loadTestsBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (currentChapter === "ch-none" || currentTask === "-") {
        testsInput.value = "Ошибка! Пожалуйста, выберите раздел и задачу.";
        testsInput.classList.add("error");
    } else {
        testsInput.classList.remove("error");
        testsInput.value = obj[currentChapter][indexes[currentTask]];
    }

});

copyBtn.forEach(elem => {
    elem.addEventListener("click", () => {
        if (elem.className === "copy c1") {
            testOutput.select();
            navigator.clipboard.writeText(testOutput.value);
        } else {
            testsInput.select();
            navigator.clipboard.writeText(testsInput.value);
        }
    });
});


infoImg.addEventListener("click", closeModal);
modalClose.addEventListener("click", closeModal);

function closeModal() {
    modal.classList.toggle("closed");
}

tgBtn.addEventListener("click", () => {
    require('electron').shell.openExternal("https://t.me/+nsrvZp29GNoyMDYy");
});