var eqSpan = document.getElementById("equation");
var currentNumberSpan = document.getElementById("currentNumber");

function clearScreen() {
    eqSpan.innerText = '';
    currentNumberSpan.innerText = '';
}
function clearLastElement() {
    currentNumberSpan.innerText = '';
}

function back() {
    currentNumberSpan.innerText = currentNumberSpan.innerText.slice(0, -1);
}

function display(value) {
    if(eqSpan.innerText[eqSpan.innerText.length - 1] == '='){
        eqSpan.innerText = currentNumberSpan.innerText;
        currentNumberSpan.innerText = '';
        clearScreen();
    } 
    currentNumberSpan.innerText += value;
}

function addAction(action) {
    if (currentNumberSpan.innerText == ''){
        if(!compareToLastAction()){
            eqSpan.innerText = eqSpan.innerText.slice(0, eqSpan.innerText.length - 1) + action;
        } 
       return;
    }
    if (!compareToLastAction() || currentNumberSpan.innerText !='') {    
        display(action);
        moveToEqSpan();
    }
}

function compareToLastAction(action) {
    return eqSpan.innerText[eqSpan.innerText.length - 1] == action;
}

function moveToEqSpan() {
    eqSpan.innerText += currentNumberSpan.innerText;
    currentNumberSpan.innerHTML = '';
}

function calculate() {
    if (currentNumberSpan.innerText === '') {
        currentNumberSpan.innerText = '';
    } else {
        let eq = eqSpan.innerText + currentNumberSpan.innerText;
        let result = eval(eq);
        currentNumberSpan.innerText = result;
        eqSpan.innerText = eq + ' =';
    }
}

function negative() {
    currentNumberSpan.innerText = 0 - currentNumberSpan.innerText;
}

function sqrt() {
    currentNumberSpan.innerText = Math.sqrt(currentNumberSpan.innerText)  ;
}

function reciprocally() {
    currentNumberSpan.innerText = 1 / currentNumberSpan.innerText;
}

function exponentiation() {
    currentNumberSpan.innerText *= currentNumberSpan.innerText;
}