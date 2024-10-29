const elements = {
  buttons: document.querySelectorAll(".btn"),
  display: document.querySelector(".display"),
};

let curr = "";
let prev = "";
let operatorValue = "";
let awaitingPercent = false;

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
    clearDisplay();
    return null;
  }
  return a / b;
}

function percent(a) {
  return parseFloat(a) / 100;
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
    btn.addEventListener("click", (e) => {
      let element = e.target;
      let value = element.value;
      console.log(value);

      if (value === "clear") {
        clearDisplay();
        return;
      }

      if (element.classList.contains("back")) {
        const currDisplay = elements.display.innerHTML;
        if (currDisplay.length > 0) {
          updateDisplay(currDisplay.slice(0, -1));
          curr = curr.slice(0, -1);
        }
      }

      if (value === ".") {
        if (curr != "" && !curr.includes(".")) {
          curr += value;
          return;
        }
      }

      if (value === "sign") {
        if (curr !== "") {
          curr = (parseFloat(curr) * -1).toString();
          updateDisplay(curr);
        }
        return;
      }

      if (value === "percent") {
        if (curr !== "" && !awaitingPercent) {
          curr = percent(curr).toFixed(2).toString();
          awaitingPercent = true;
        }
        updateDisplay(curr);
        return;
      }

      if (element.classList.contains("operand")) {
        if (awaitingPercent) {
          awaitingPercent = false;
        }
        curr += value;
        updateDisplay(curr);
      } else if (element.classList.contains("operator")) {
        if (curr !== "") {
          if (operatorValue && prev) {
            curr = operate(operatorValue, prev, curr).toString();
          }
          prev = curr;
          curr = "";
        }

        operatorValue = value;
        updateDisplay(prev + " " + operatorValue);
      }

      if (value === "=") {
        if (prev && curr && operatorValue) {
          const result = operate(operatorValue, prev, curr);
          updateDisplay(result);

          prev = "";
          curr = result.toString();
          operatorValue = "";
          awaitingPercent = false;
        }
      }
    });
  });
}

function updateDisplay(value) {
  elements.display.innerHTML = value || "0";
}

function clearDisplay() {
  elements.display.innerHTML = "0";
  prev = "";
  curr = "";
  operatorValue = "";
  awaitingPercent = false;
}

addEventListeners();
