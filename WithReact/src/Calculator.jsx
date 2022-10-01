import { Component, useEffect, useState } from "react";
import "./Calculator.css";

function Screen(props) {
  return <div className="pantalla">{props.value}</div>;
}

function Key(props) {
  const onClick = (event) => {
    return props.onKeyClick(event.target);
  };
  return <input type="button" value={props.value} onClick={onClick} />;
}

function Calculator(props) {
  const [operation, setOperation] = useState("");
  const [value, setValue] = useState("");
  const [allValues, setAllValues] = useState([]);
  const operacionesAritmeticas = ["+", "-", "*", "/"];
  const equalOperation = ["="];
  const clearSigne = ["c"];
  const changeSigne = ["+/-"];
  const clearLastDigit = ["<="];

  const someOne = (valores) => (valor) => {
    return valores.some((item) => {
      return item === valor;
    });
  };
  const isClear = (ope) => someOne(clearSigne)(ope);
  const isOperation = (ope) => someOne(operacionesAritmeticas)(ope);
  const isEqual = (ope) => someOne(equalOperation)(ope);
  const isClearLastSigne = (ope) => someOne(clearLastDigit)(ope);
  const isChangeSigne = (ope) => someOne(changeSigne)(ope);

  useEffect(
    (prev) => {
      if (!isNaN(value) || isOperation(value)) {
        setOperation((prev) => {
          return prev + value;
        });
      } else if (isEqual(value)) {
        setOperation((prev) => eval(prev));
      } else if (isClear(value)) {
        setOperation("");
      } else if (isClearLastSigne(value)) {
        setOperation((prev) => {
          let value = Array.from(prev);
          value.pop();
          value.join("");
          return value;
        });
      } else if (isChangeSigne(value)) {
        setOperation((prev) => {
          let val = `${prev}*-1`;
          return eval(val);
        });
      }
    },
    [allValues, value]
  );

  const onClick = (event) => {
    event.preventDefault;
    setValue(event.value);
    setAllValues((prev) => {
      const newAllValues = [...prev];
      newAllValues.push(event.value);
      return newAllValues;
    });
    //setOperation((prev) => prev + event.value);
  };

  return (
    <div className="Calculadora">
      <Screen value={operation} />
      <div className="botones">
        <p>
          <Key value="c" onKeyClick={onClick} />
          <Key value="<=" onKeyClick={onClick} />
        </p>
      </div>
      <div className="botones">
        <p>
          <Key value="7" onKeyClick={onClick} />
          <Key value="8" onKeyClick={onClick} />
          <Key value="9" onKeyClick={onClick} />
          <Key value="/" onKeyClick={onClick} />
        </p>
        <p>
          <Key value="4" onKeyClick={onClick} />
          <Key value="5" onKeyClick={onClick} />
          <Key value="6" onKeyClick={onClick} />
          <Key value="*" onKeyClick={onClick} />
        </p>
        <p>
          <Key value="1" onKeyClick={onClick} />
          <Key value="2" onKeyClick={onClick} />
          <Key value="3" onKeyClick={onClick} />
          <Key value="-" onKeyClick={onClick} />
        </p>
        <p>
          <Key value="+/-" onKeyClick={onClick} />
          <Key value="0" onKeyClick={onClick} />
          <Key value="+" onKeyClick={onClick} />
          <Key value="=" onKeyClick={onClick} />
        </p>
      </div>
    </div>
  );
}

export default Calculator;
