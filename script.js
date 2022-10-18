let output = document.querySelector(".output");
let input = document.querySelector(".input");
let numbers = [...document.querySelectorAll(".num")];
let numberArray = numbers.map(element => Number(element.textContent));
let equal = document.querySelector(".equal");

numbers.forEach((num) => {
    console.log(num);
    window.addEventListener("keydown", setUpDigits);
    num.addEventListener("click", setUpDigits);
});

equal.addEventListener("click", submitResults);
window.addEventListener("keyup", submitResults);

function setUpDigits(e) {
    let num = this;
    console.log(e.key, num);
    if (numberArray.find(n => n == e.key)) {
        toInput(e.key);
    } else if (e.type === "click") {
        toInput(num.textContent);
    }
}

function submitResults(e) {
    console.log(e.key, this);
    if ("Enter" === e.key) {
        toOutput(input.textContent);
        input.textContent = ""
    } else if (e.type === "click") {
        toOutput(input.textContent);
        input.textContent = ""
    }
}

function toInput(string) {
    input.textContent = (input.textContent + string).substr(0, 30);
}

function toOutput(string) {
    output.textContent = (output.textContent + string);
}