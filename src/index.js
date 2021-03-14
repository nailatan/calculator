let operation= [];
let operacionesAritmeticas = ["+", "-", "*", "/"]; 
let equalOperation = ["="];
let clearSigne = ["c"];
let clearLastDigit = ["<="];
let changeSigne = ["+/-"];
let pantalla;

let someOne  = (valores) =>((valor) => valores.some( (item) => { return item===valor}))
let isOperation =  (ope) => someOne(operacionesAritmeticas)(ope);
let isEqual = (ope)  => someOne(equalOperation)(ope);
let isClear = (ope) => someOne(clearSigne)(ope);
let isClearLastSigne = (ope) => someOne(clearLastDigit)(ope); 
let isChangeSigne = (ope) => someOne(changeSigne)(ope); 
let clearScreen = () => pantalla.innerHTML = "";
let writeIntoScreenAndClean = (value) =>{clearScreen(); writeIntoScreen(value);}
let writeIntoScreen = (value) => pantalla.innerHTML += value;
let getScreenValue = () =>pantalla.innerHTML;
let makeOperation = (a,b,c) => eval(`${a} ${b} ${c}`);
let clearAll = () => {operation=[]; clearScreen();}
let clearOperation = () => {operation = [];}
let clearLastValue = () => {
    let value = Array.from(getScreenValue());
    value.pop();
     return value.join('');  
    }
let doIntermediateOperation = () => {
    let resultado = makeOperation(...operation);
    clearOperation();
    operation.push(resultado);
}

function onClickButtonEvent(e) {
    if (!isNaN(this.value)) {
       writeIntoScreen(this.value)
    }
    else if (isOperation(this.value)) {
        operation.push(getScreenValue());
        if (operation.length ===3) {
            doIntermediateOperation();
        }
        operation.push(this.value);
        clearScreen();
    }
    else if (isEqual(this.value)) {
        operation.push(getScreenValue());
        writeIntoScreenAndClean(makeOperation(...operation));
        clearOperation();
    }
    else if (isClear(this.value)) {
        clearAll();
    }
    else if (isClearLastSigne(this.value)) {        
        writeIntoScreenAndClean(clearLastValue());
    }
    else if (isChangeSigne(this.value)) {   
        writeIntoScreenAndClean(makeOperation(getScreenValue(), "*", -1));
    }
}

document.addEventListener('DOMContentLoaded', function () {
    pantalla= document.querySelector(".pantalla");
    let elem = [...document.querySelectorAll('input[type="button"]')];
    elem.map((elem) => {elem.addEventListener('click',onClickButtonEvent)});
});
