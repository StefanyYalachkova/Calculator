const CALCULATOR_TYPES = {
    SIMPLE: 'simple',
    STANDARD: 'standard'
}

const CALCULATOR_BTN = {
    ACTION: 0,
    NUMBER: 1
}

const SIMPLE_CALCULATOR_CONFIG = [
    //row 1
    [
        {type: CALCULATOR_BTN.ACTION, text: 'CE', fn: 'calculator.clearLastElement()', class:'btn'},
        {type: CALCULATOR_BTN.ACTION, text: 'C', fn: 'calculator.clearScreen()', class:'btn'},
        {type: CALCULATOR_BTN.ACTION, text: '/', fn: 'calculator.addAction()', class:'btn'},
        {type: CALCULATOR_BTN.ACTION, text: 'Back', fn: 'calculator.back()', class:'btn'},
    ],
    //row 2
    [
        {type: CALCULATOR_BTN.NUMBER, text: '7', fn: 'calculator.display(event)', class:'num'},
        {type: CALCULATOR_BTN.NUMBER, text: '8', fn: 'calculator.display(event)', class:'num'},
        {type: CALCULATOR_BTN.NUMBER, text: '9', fn: 'calculator.display(event)', class:'num'},
        {type: CALCULATOR_BTN.ACTION, text: '*', fn: 'calculator.addAction()', class:'btn'},
    ],
    //row 3
    [
        {type: CALCULATOR_BTN.NUMBER, text: '4', fn: 'calculator.display(event)', class:'num'},
        {type: CALCULATOR_BTN.NUMBER, text: '5', fn: 'calculator.display(event)', class:'num'},
        {type: CALCULATOR_BTN.NUMBER, text: '6', fn: 'calculator.display(event)', class:'num'},
        {type: CALCULATOR_BTN.ACTION, text: '-', fn: 'calculator.addAction()', class:'btn'},
    ],
    //row 4
    [
        {type: CALCULATOR_BTN.NUMBER, text: '1', fn: 'calculator.display(event)', class:'num'},
        {type: CALCULATOR_BTN.NUMBER, text: '2', fn: 'calculator.display(event)', class:'num'},
        {type: CALCULATOR_BTN.NUMBER, text: '3', fn: 'calculator.display(event)', class:'num'},
        {type: CALCULATOR_BTN.ACTION, text: '+', fn: 'calculator.addAction()', class:'btn'},
    ],
    //row 5
    [
        {type: CALCULATOR_BTN.ACTION, text: '+/-', fn: 'calculator.negative()', class:'num'},
        {type: CALCULATOR_BTN.NUMBER, text: '0', fn: 'calculator.display(event)', class:'num'},
        {type: CALCULATOR_BTN.NUMBER, text: '.', fn: 'calculator.display(event)', class:'num'},
        {type: CALCULATOR_BTN.ACTION, text: '=', fn: 'calculator.calculate()', class:'btn'},
    ]
]

const STANDARD_CALCULATOR_CONFIG = [
    //row 1
    [
        {type: CALCULATOR_BTN.ACTION, text: '%', fn: 'calculator.addAction()', class:'btn'},
        {type: CALCULATOR_BTN.ACTION, text: 'CE', fn: 'calculator.clearLastElement()', class:'btn'},
        {type: CALCULATOR_BTN.ACTION, text: 'C', fn: 'calculator.clearScreen()', class:'btn'},
        {type: CALCULATOR_BTN.ACTION, text: 'Back', fn: 'calculator.back()', class:'btn'},
    ],
    //row 2
    [
        {type: CALCULATOR_BTN.ACTION, text: '1/x', fn: 'calculator.reciprocally()', class:'btn'},
        {type: CALCULATOR_BTN.ACTION, text: 'x^2', fn: 'calculator.exponentiation()', class:'btn'},
        {type: CALCULATOR_BTN.ACTION, text: 'sqrt', fn: 'calculator.sqrt()', class:'btn'},
        {type: CALCULATOR_BTN.ACTION, text: '/', fn: 'calculator.addAction()', class:'btn'},
    ],
    //row 3
    [
        {type: CALCULATOR_BTN.NUMBER, text: '7', fn: 'calculator.display(event)', class:'num'},
        {type: CALCULATOR_BTN.NUMBER, text: '8', fn: 'calculator.display(event)', class:'num'},
        {type: CALCULATOR_BTN.NUMBER, text: '9', fn: 'calculator.display(event)', class:'num'},
        {type: CALCULATOR_BTN.ACTION, text: '*', fn: 'calculator.addAction()', class:'btn'},
    ],
    //row 4
    [
        {type: CALCULATOR_BTN.NUMBER, text: '4', fn: 'calculator.display(event)', class:'num'},
        {type: CALCULATOR_BTN.NUMBER, text: '5', fn: 'calculator.display(event)', class:'num'},
        {type: CALCULATOR_BTN.NUMBER, text: '6', fn: 'calculator.display(event)', class:'num'},
        {type: CALCULATOR_BTN.ACTION, text: '-', fn: 'calculator.addAction()', class:'btn'},
    ],
    //row 5
    [
        {type: CALCULATOR_BTN.NUMBER, text: '1', fn: 'calculator.display(event)', class:'num'},
        {type: CALCULATOR_BTN.NUMBER, text: '2', fn: 'calculator.display(event)', class:'num'},
        {type: CALCULATOR_BTN.NUMBER, text: '3', fn: 'calculator.display(event)', class:'num'},
        {type: CALCULATOR_BTN.ACTION, text: '+', fn: 'calculator.addAction()', class:'btn'},
    ],
    //row 6
    [
        {type: CALCULATOR_BTN.ACTION, text: '+/-', fn: 'calculator.negative()', class:'num'},
        {type: CALCULATOR_BTN.NUMBER, text: '0', fn: 'calculator.display(event)', class:'num'},
        {type: CALCULATOR_BTN.NUMBER, text: '.', fn: 'calculator.display(event)', class:'num'},
        {type: CALCULATOR_BTN.ACTION, text: '=', fn: 'calculator.calculate()', class:'btn'},
    ]
]

const CONFIG_MAP = {
    [CALCULATOR_TYPES.SIMPLE]: SIMPLE_CALCULATOR_CONFIG,
    [CALCULATOR_TYPES.STANDARD]: STANDARD_CALCULATOR_CONFIG
}


const Utils = {
    createStyledActionButton: (action, fn) => {
        //return createButton(action, 'btn', fn)
    },
    createStyledNumberButton: (number) => {
        //return Utils.createButton(number, 'num', 'calculator.display(event)')
    },
    createElement: (element, attrMap) => {
        let elem = document.createElement(element);
        for (var key in attrMap){
            elem.setAttribute(key, attrMap[key]);
        }
        return elem;
    },
    appendTdinTr: (tdElem, trElem) => {
        trElem.appendChild(tdElem);
    },
    appendTrInTbody: () => {}
}

class Calculator{
    constructor(settings){ //settingsObj = {calculatorType: 0 || 1, containerElement}
        this.init(settings);
        this.render();
    }

    init(settings){
        this.containerDiv = settings.containerElement;
        this.type = settings.calculatorType;
        this.eqSpan = null;
        this.currentNumberSpan = null;
    }
    
    display(event) {
        event = event || window.event;
        let value = event.target.value;

        if(this.eqSpan.innerText[this.eqSpan.innerText.length - 1] == '='){
            this.eqSpan.innerText = this.currentNumberSpan.innerText;
            this.currentNumberSpan.innerText = '';
        } 

        this.currentNumberSpan.innerText += value;
    }    

    addAction(action) {
        if (this.currentNumberSpan.innerText == ''){
            if(!this.compareToLastAction()){
                this.eqSpan.innerText = this.eqSpan.innerText.slice(0, this.eqSpan.innerText.length - 1) + action; // ???
            } 
           return;
        }
        if (!this.compareToLastAction() || this.currentNumberSpan.innerText !='') {    
            this.display();
            this.moveToEqSpan();
        }
    }

    compareToLastAction(action) {
        return this.eqSpan.innerText[this.eqSpan.innerText.length - 1] == action;
    }

    moveToEqSpan() {
        this.eqSpan.innerText += this.currentNumberSpan.innerText;
        this.currentNumberSpan.innerHTML = '';
    }

    clearScreen() {
        this.eqSpan.innerText = '';
        this.currentNumberSpan.innerText = '';
    }

    clearLastElement() {
        this.currentNumberSpan.innerText = '';
    }

    negative() {
        this.currentNumberSpan.innerText = 0 - this.currentNumberSpan.innerText;
    }

    reciprocally() {
        this.currentNumberSpan.innerText = 1 / this.currentNumberSpan.innerText;
    }

    exponentiation() {
        this.currentNumberSpan.innerText *= this.currentNumberSpan.innerText;
    }

    sqrt() {
        this.currentNumberSpan.innerText = Math.sqrt(this.currentNumberSpan.innerText);
    }

    calculate() {
        if (this.currentNumberSpan.innerText === '') {
            this.currentNumberSpan.innerText = '';
        } else {
            let eq = this.eqSpan.innerText + this.currentNumberSpan.innerText;
            let result = eval(eq);
            this.currentNumberSpan.innerText = result;
            this.eqSpan.innerText = eq + ' =';
        }
    }

    back() {
        this.currentNumberSpan.innerText = this.currentNumberSpan.innerText.slice(0, -1);
    }

    changeType(type , body) {
            this.type = type;
            let btn = document.querySelector('tbody');
            btn.innerHTML = '';

            this.createDisplayelement(body);
            this.createRows(body);
    }

    createDisplayelement(body) {
        let displayRow = Utils.createElement('tr', {name: 'screen', class: 'display'});
        let dataElement = Utils.createElement('td', {colspan:4});

        displayRow.appendChild(dataElement);
        
        let divContainer = Utils.createElement('div', {class:'res'});

        this.eqSpan = Utils.createElement('div', {class:'res-span'});
        this.currentNumberSpan = Utils.createElement('div' , {class:'res-span'});
        
        dataElement.appendChild(divContainer);
        divContainer.appendChild(this.eqSpan);
        divContainer.appendChild(this.currentNumberSpan);
        console.log(this.eqSpan.innerText);

        body.appendChild(displayRow);
    }

    createRows(body) {
        let config = CONFIG_MAP[this.type] || [];
        
        config.forEach(rowElements => {
            let trElem = Utils.createElement('tr', {name: 'tr-button'});
            
            rowElements.forEach(element => {
                let tdElem = Utils.createElement('td', {});
                let btn = Utils.createElement('input', {type:'button', value: element.text, onclick: element.fn, class:element.class}); //create input element

                tdElem.appendChild(btn);
                trElem.appendChild(tdElem);
                body.appendChild(trElem);
            });
        });
    }

    createMode(body) {
        let navElement = document.createElement('div');
        navElement.setAttribute('class', 'sidenav');

        let selectElem = Utils.createElement('select', { id: 'nav', form: 'calcMode' });

        Object.entries(CALCULATOR_TYPES).forEach(([type, value]) => {
            let option = document.createElement('option');
            option.value = value;
            option.innerText = type;
            option.selected = value === this.type;

            selectElem.appendChild(option);
        });

        selectElem.addEventListener('change', (event) => {
            const selectedValue = event.target.value;
            this.changeType(selectedValue, body);
        });

        navElement.appendChild(selectElem);
        this.containerDiv.appendChild(navElement);
    }

    render(){
        let calculatorElement = document.createElement('table');
        calculatorElement.setAttribute('class', 'calculator');

        let body = document.createElement('tbody');
        calculatorElement.appendChild(body);
        
        this.createMode(body);

        this.createDisplayelement(body);
        
        this.createRows(body);
       
        this.containerDiv.appendChild(calculatorElement);
    }
}

const calculator = new Calculator({calculatorType: CALCULATOR_TYPES.STANDARD, containerElement: document.getElementById('calculatorContainer')});



