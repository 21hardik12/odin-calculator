let operand1 = "";
let operand2 = "";
let operator = "";
let isOperand1OnDisplay = true;

const operatorKeys = document.querySelectorAll(".okey");
operatorKeys.forEach((key) => {
    key.addEventListener("click", (e) => {
        if (key.classList.contains("operator-enabled")) {            
            compute(key.value);
            key.classList.remove("operator-enabled");
            operator = "";            
            return;
        }

        document.querySelectorAll(".okey").forEach((k) => {
            if (k.classList.contains('operator-enabled')) {
                compute(k.value);
                k.classList.remove("operator-enabled");
            }            
        });
        key.classList.add("operator-enabled");
        operator = key.value;
    });
});

const backspaceKey = document.getElementById('key-backspace');
console.log(backspaceKey);
backspaceKey.addEventListener('click', e => {
    if (isOperand1OnDisplay) {
        operand1 = operand1.slice(0, -1);        
        setDisplayValue(operand1);
    } else {
        operand2 = operand2.slice(0, -1);        
        setDisplayValue(operand2);
    }
});

const acKey = document.getElementById('key-ac');
acKey.addEventListener('click', e => {
    operand1 = "";
    operand2 = "";
    operator = "";
    setDisplayValue('');
    document.querySelectorAll(".okey").forEach((k) => {
        if (k.classList.contains('operator-enabled')) {                    
            k.classList.remove("operator-enabled");
        }
    });
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
            if (operand1.length <= 10)
                operand1 += key.value;
            isOperand1OnDisplay = true;
            setDisplayValue(operand1);
        } else {
            if (operand2.length <= 10)
                operand2 += key.value;
            isOperand1OnDisplay = false;
            setDisplayValue(operand2);
        }
    });
});

function compute(value) {
    switch (value) {
        case "+":
            if (!operand2) break;
            operand1 = `${parseInt(operand1) + parseInt(operand2)}`;
            operand2 = '';
            isOperand1OnDisplay = true;
            setDisplayValue(operand1);
            console.log(`operand1:${operand1} operand2:${operand2}`);
            break;
        case "-":
            if (!operand2) break;
            operand1 = `${parseInt(operand1) - parseInt(operand2)}`;
            operand2 = '';
            isOperand1OnDisplay = true;
            setDisplayValue(operand1);
            console.log(`operand1:${operand1} operand2:${operand2}`);
            break;
        case "*":
            if (!operand2) break;
            operand1 = `${parseInt(operand1) * parseInt(operand2)}`;
            operand2 = '';
            isOperand1OnDisplay = true;
            setDisplayValue(operand1);
            console.log(`operand1:${operand1} operand2:${operand2}`);
            break;
        case "/":
            if (operand2 == '0') {
                operand1 = 'lol';
                isOperand1OnDisplay = true;
                setDisplayValue(operand1);
                break;
            }
            if (!operand2) break;
            operand1 = `${parseInt(operand1) / parseInt(operand2)}`;
            operand2 = '';
            isOperand1OnDisplay = true;
            setDisplayValue(operand1);
            console.log(`operand1:${operand1} operand2:${operand2}`);
            break;
        case '':
            break;
    }
}

function setDisplayValue(value) {    
    if(!value) value = '0';
    if (value.length > 11) value = value.substring(0, 7) + value.slice(-4);
    const event = new CustomEvent('displayUpdate', {detail: value});
    window.dispatchEvent(event);
}

window.addEventListener('displayUpdate', e => {
    const display = document.querySelector('.display p');
    display.textContent = e.detail;
});


