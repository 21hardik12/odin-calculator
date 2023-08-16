let operand1 = "";
let operand2 = "";
let operator = "";
let displayValue = "";

const operatorKeys = document.querySelectorAll(".okey");
operatorKeys.forEach((key) => {
    key.addEventListener("click", (e) => {
        if (key.classList.contains("operator-enabled")) {
            compute(key.value);
            key.classList.remove("operator-enabled");
            operator = "";
            return;
        }

        document
            .querySelectorAll(".okey")
            .forEach((k) => {
                if (k.classList.contains('operator-enabled')) {
                    compute(k.value);
                    k.classList.remove("operator-enabled")
                }
            });
        key.classList.add("operator-enabled");
        operator = key.value;
    });
});

const acKey = document.getElementById('key-ac');
acKey.addEventListener('click', e => {
    operand1 = '';
    operand2 = '';
    setDisplayValue('0');
    document.querySelectorAll('okey').forEach(k => k.classList.remove('operator-enabled'));
});

const equalsKey = document.getElementById('key-equals');
equalsKey.addEventListener('click', e => {
    compute(operator);
    document.querySelectorAll('.okey').forEach(k => k.classList.remove('operator-enabled'));
});

const numericKeys = document.querySelectorAll(".nkey");
numericKeys.forEach((key) => {
    key.addEventListener("click", (e) => {
        if (!operator) {
            operand1 += key.value;
            setDisplayValue(operand1);
        }
        else {
            operand2 += key.value;
            setDisplayValue(operand2);
        }
    });
});

function compute(value) {
    switch (value) {
        case "+":
            operand1 = `${parseInt(operand1) + parseInt(operand2)}`;
            operand2 = '';
            setDisplayValue(operand1);
            console.log(`operand1:${operand1} operand2:${operand2}`);
            break;
        case "-":
            operand1 = `${parseInt(operand1) - parseInt(operand2)}`;
            operand2 = '';
            setDisplayValue(operand1);
            console.log(`operand1:${operand1} operand2:${operand2}`);
            break;
        case "*":
            operand1 = `${parseInt(operand1) * parseInt(operand2)}`;
            operand2 = '';
            setDisplayValue(operand1);
            console.log(`operand1:${operand1} operand2:${operand2}`);
            break;
        case "/":
            operand1 = `${parseInt(operand1) / parseInt(operand2)}`;
            operand2 = '';
            setDisplayValue(operand1);
            console.log(`operand1:${operand1} operand2:${operand2}`);
            break;
        case '':
            break;
    }
}

function setDisplayValue(value) {    
    const event = new CustomEvent('displayUpdate', {detail: value});
    window.dispatchEvent(event);
}

window.addEventListener('displayUpdate', e => {
    const display = document.querySelector('.display p');
    display.textContent = e.detail;
});


