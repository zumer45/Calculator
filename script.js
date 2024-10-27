const elements = {
    buttons: document.querySelectorAll('.btn'),
    display: document.querySelector('.display') 
};

let curr = ''
let prev = ''
let operatorValue = ''

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        alert("Cannot divide by zero");
        return null;
    }
    return a / b;
}

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return null;
    }
}

function addEventListeners() {
    elements.buttons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            let currElement = e.currentTarget; 
            let value = currElement.value;

            if (value === 'clear') {
                clearDisplay()
            }

            else if (Array.from(currElement.classList).includes('operand')) {
                curr += value;
                updateDisplay(curr)
            } else if (Array.from(currElement.classList).includes('operator')) {
                if (curr !== "") {
                    prev = curr;
                    operatorValue = value;
                    curr = "";
                }
            } else if (value === '=') {
                console.log(operate(operatorValue, prev, curr));
                updateDisplay(operate(operatorValue, prev, curr))
                
            } 
            
            
        });
    });
}

function updateDisplay(value) {
    elements.display.innerHTML = value || "0";
}

function clearDisplay() {
    elements.display.innerHTML = ''
    prev = ''
    curr = ''
    operatorValue = ''
}

addEventListeners();
