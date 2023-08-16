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

const equalsKey = document.getElementById('key-equals');
equalsKey.addEventListener('click', e => {
    compute(operator);
    document.querySelectorAll('.okey').forEach(k => k.classList.remove('operator-enabled'));
});

const numericKeys = document.querySelectorAll(".nkey");
numericKeys.forEach((key) => {
    key.addEventListener("click", (e) => {
        if (!operator) operand1 += key.value;
        else operand2 += key.value;
    });
});

function compute(value) {
    switch (value) {
        case "+":
            operand1 = `${parseInt(operand1) + parseInt(operand2)}`;
            operand2 = '';
            console.log(`operand1:${operand1} operand2:${operand2}`);
            break;
        case "-":
            operand1 = `${parseInt(operand1) - parseInt(operand2)}`;
            operand2 = '';
            console.log(`operand1:${operand1} operand2:${operand2}`);
            break;
        case "*":
            operand1 = `${parseInt(operand1) * parseInt(operand2)}`;
            operand2 = '';
            console.log(`operand1:${operand1} operand2:${operand2}`);
            break;
        case "/":
            operand1 = `${parseInt(operand1) / parseInt(operand2)}`;
            operand2 = '';
            console.log(`operand1:${operand1} operand2:${operand2}`);
            break;
        case '':
            break;
    }
}


