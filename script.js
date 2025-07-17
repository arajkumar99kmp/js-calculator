document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('button:not(.equals):not(.clear):not(.backspace)');
    const clearButton = document.querySelector('.clear');
    const backspaceButton = document.querySelector('.backspace');
    const equalsButton = document.querySelector('.equals');
    
    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let resetScreen = false;

    // Update display
    function updateDisplay() {
        display.value = currentInput;
    }

    // Append number to current input
    function appendNumber(number) {
        if (currentInput === '0' || resetScreen) {
            currentInput = number;
            resetScreen = false;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }

    // Append decimal point
    function appendDecimal() {
        if (resetScreen) {
            currentInput = '0.';
            resetScreen = false;
            updateDisplay();
            return;
        }
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay();
        }
    }

    // Handle percentage operation
    function handlePercentage() {
        const value = parseFloat(currentInput);
        if (!isNaN(value)) {
            currentInput = (value / 100).toString();
            updateDisplay();
        }
    }

    // Handle operator selection
    function selectOperator(op) {
        if (operation !== null) calculate();
        previousInput = currentInput;
        operation = op;
        currentInput = '0'; // Clear display immediately when operator is clicked
        updateDisplay();
    }

    // Perform calculation
    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            case '%':
                result = prev * (current / 100);
                break;
            default:
                return;
        }
        
        currentInput = result.toString();
        operation = null;
        updateDisplay();
    }

    // Clear calculator
    function clear() {
        currentInput = '0';
        previousInput = '';
        operation = null;
        updateDisplay();
    }

    // Backspace function
    function backspace() {
        if (currentInput.length === 1 || (currentInput.length === 2 && currentInput.startsWith('-'))) {
            currentInput = '0';
        } else {
            currentInput = currentInput.slice(0, -1);
        }
        updateDisplay();
    }

    // Number buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent === '%') {
                handlePercentage();
            } else if (button.classList.contains('operator')) {
                selectOperator(button.textContent);
            } else if (button.textContent === '.') {
                appendDecimal();
            } else {
                appendNumber(button.textContent);
            }
        });
    });

    // Equals button
    equalsButton.addEventListener('click', () => {
        calculate();
        resetScreen = true;
    });

    // Clear button
    clearButton.addEventListener('click', clear);

    // Backspace button
    backspaceButton.addEventListener('click', backspace);

    // Initialize display
    updateDisplay();
});