let currentInput = '0';
let display = document.getElementById("display");

function updateDisplay() {
    display.value = currentInput;
}

function isValidInput(value) {
    // Check if the input is a valid number or operator
    return /^[\d+\-*/.]+$/.test(value);
}

function appendToDisplay(value) {
    // Check for multiple leading zeros
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        // Check if the input is valid
        if (isValidInput(value)) {
            // Check if the last character is a decimal point
            const lastChar = currentInput.slice(-1);

            // Check if the input is a decimal point and the last character is also a decimal point
            if (value === '.' && lastChar === '.') {
                // Do nothing if there's already a decimal point
                return;
            }

            currentInput += value;
        }
    }
    updateDisplay();
}

function appendDecimal() {
    // Split the input into an array of numbers and operators
    const inputParts = currentInput.split(/([\+\-\*\/])/);

    // Get the last part (could be a number or an operator)
    const lastPart = inputParts[inputParts.length - 1];

    // Check if the last part is a valid number and does not already contain a decimal point
    if (isValidInput(lastPart) && !lastPart.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

function clearEntry() {
    // Remove the last character from the current input
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') {
        currentInput = '0';
    }
    updateDisplay();
}

function calculateResult() {
    try {
        // Use a more robust method to evaluate expressions
        const result = Function('"use strict";return (' + currentInput + ')')();

        // Check for division by zero
        if (!isFinite(result)) {
            throw new Error('Cannot divide by zero');
        }

        currentInput = result.toString();
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        updateDisplay();
        console.error('Calculation error:', error.message);
    }
}

function handleOperator(value) {
    const lastChar = currentInput.slice(-1);

    // Check if the last character is an operator
    if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/' || lastChar === '%') {
        // If the new value is '-', append it (negative sign)
        // Otherwise, replace the last operator with the new one
        if (value === '-') {
            currentInput += value;
        } else {
            // Remove all consecutive operators before appending the new one
            currentInput = currentInput.replace(/[\+\-\*\/\%]+$/, '') + value;
        }
    } else {
        // Append the operator
        currentInput += value;
    }

    updateDisplay();
}