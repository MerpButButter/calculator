let output = document.querySelector(".output");
let input = document.querySelector(".input");
let numbers = [...document.querySelectorAll(".num")];
let numberArray = numbers.map(element => Number(element.textContent));
let equal = document.querySelector(".equal");
let clear = document.querySelector(".clear");
let clearAll = document.querySelector(".clearAll");
let plus_minus = document.querySelector(".plus-minus");
let plus = document.querySelector(".plus");
let minus = document.querySelector(".minus");
let multiply = document.querySelector(".multiply");
let divide = document.querySelector(".divide");

let lastNum = 0;
let currentNum = 0;
let inOperation = false;
let calculated = false;
let canEnter = false;


//* SETUP DIGITS
numbers.forEach((num) => {
    window.addEventListener("keydown", setUpDigits);
    num.addEventListener("click", setUpDigits);
});

//* PLUS
setupEventKey(plus, "+", () => {
    if (inOperation) {
        operate();
    } else {
        enterEquation();
        inOperation = true;
        lastNum = Number(output.textContent);
        output.textContent += " +";
    }
});

//* PLUS MINUS
setupEventKey(plus_minus, "`", () => {
    if (output.textContent === "") return;
    output.textContent = -Number(output.textContent);
});

//* CLEAR_ALL
setupEventKey(clearAll, "Delete", () => {
    input.textContent = "0";
    output.textContent = "";
});
// * CLEAR 
setupEventKey(clear, "Backspace", () => input.textContent = input.textContent.substring(0, (input.textContent.length - 1)) || 0, "keydown");

//*EQUAL
setupEventKey(equal, "Enter", equalEquation);


//* FUNCTIONS

function equalEquation(params) {
    isCalc();
    if (inOperation) {
        operate();
    }
}

function enterEquation() {
    isCalc();
    if (inOperation) { operate(); } else {
        toOutput(input.textContent);
        input.textContent = 0;
    }
}
function setUpDigits(e) {
    let num = this;
    let foundNum = numberArray.find(n => String(n) == String(e.key));
    if (!(foundNum === undefined)) {
        isCalc();
        toInput(foundNum);
    } else if (e.type === "click") {
        isCalc();
        toInput(num.textContent);
    }
}

function isCalc() {
    if (calculated) {
        output.textContent = "";
        calculated = false;
        inOperation = false;
    }
}

function toInput(string) {
    input.textContent = String(Number((input.textContent + string)));
}

function toOutput(string) {
    output.textContent = Number(output.textContent + string);
}

// *----------------------------------------------------
function setupEventKey(element, key, callback, type = "keypress") {
    element.addEventListener("click", keyTemp.bind(this, key, callback));
    window.addEventListener(type, keyTemp.bind(this, key, callback));
}
function keyTemp(...args) {
    let [key, callback, e] = args;
    if (key === e.key) {
        callback();
    } else if (e.type === "click") {
        callback();
    }
}


function operate() {
    currentNum = Number(input.textContent);
    if (/[+]/.test(output.textContent)) {
        console.log(lastNum, currentNum);
        console.info("ADDING");
        output.textContent = output.textContent + " " + currentNum + " =";
        input.textContent = (lastNum + currentNum);
        calculated = true;
    }
    inOperation = false;
}