let operacion= [];
let operacionesAritmeticas = ["+", "-", "*", "/"]; 
let equalOperation = ["="];
let clearOperation = ["c"];
let pantalla;

let someOne  = (valores) =>((valor) => valores.some( (item) => { return item===valor}))
let isOperation =  (ope) => someOne(operacionesAritmeticas)(ope);
let isEqual = (ope)  => someOne(equalOperation)(ope);
let isClear = (ope) => someOne(clearOperation)(ope);
let clearPantalla = () => pantalla.innerHTML = "";
let writePantalla = (value) => pantalla.innerHTML += value;
let getPantalla = () =>pantalla.innerHTML;
let makeOperation = (a,b,c) => eval(`${a} ${b} ${c}`);

function onClickButtonEvent(e) {
    if (!isNaN(this.value)) {
       writePantalla(this.value)
    }
    else if (isOperation(this.value)) {
            operacion.push(getPantalla(), this.value);
            clearPantalla();
    }
    else if (isEqual(this.value)) {
        operacion.push(getPantalla());
        clearPantalla();
        writePantalla(makeOperation(...operacion));
        operacion = [];
    }
    else if (isClear(this.value)) {
        operacion = []
        clearPantalla();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    pantalla= document.querySelector(".pantalla");
    let elem = [...document.querySelectorAll('input[type="button"]')];
    elem.map((elem) => {elem.addEventListener('click',onClickButtonEvent)});
});
