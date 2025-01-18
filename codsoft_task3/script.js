// Select the display and buttons
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = ""; // To store the current input
let previousInput = ""; // To store the previous input
let operator = null; // To store the operator

// Loop through buttons and add event listeners
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        // Handle Clear Button
        if (value === "C") {
            currentInput = "";
            previousInput = "";
            operator = null;
            display.value = "";
            return;
        }

        // Handle Equals Button
        if (value === "=") {
            if (currentInput && previousInput && operator) {
                currentInput = calculate(previousInput, currentInput, operator);
                display.value = currentInput;
                previousInput = "";
                operator = null;
            }
            return;
        }

        // Handle Operators
        if (["+", "-", "*", "/"].includes(value)) {
            if (currentInput) {
                if (previousInput && operator) {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.value = currentInput;
                }
                operator = value;
                previousInput = currentInput;
                currentInput = "";
            }
            return;
        }

        // Handle Numbers and Decimal
        currentInput += value;
        display.value = currentInput;
    });
});

// Calculation Logic
function calculate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return b !== 0 ? a / b : "Error";
        default:
            return b;
    }
}
