import { Component } from "react";
import "./Calculator.css";

class Screen extends Component {
  render() {
    return <div className="pantalla">{this.props.value}</div>;
  }
}

class Key extends Component {
  constructor(props) {
    super(props);
    this.value = props.value;
    this.onClick = this.onClick.bind(this);
  }
  render() {
    return <input type="button" value={this.value} onClick={this.onClick} />;
  }

  onClick(event) {
    this.props.onKeyClick(event.target);
  }
}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = { operation: "" };
    this.onClick = this.onClick.bind(this);
    this.operacionesAritmeticas = ["+", "-", "*", "/"];
    this.equalOperation = ["="];
    this.clearSigne = ["c"];
    this.changeSigne = ["+/-"];
    this.clearLastDigit = ["<="];
  }

  someOne = (valores) => (valor) => {
    return valores.some((item) => {
      return item === valor;
    });
  };

  isClear = (ope) => this.someOne(this.clearSigne)(ope);
  isOperation = (ope) => this.someOne(this.operacionesAritmeticas)(ope);
  isEqual = (ope) => this.someOne(this.equalOperation)(ope);
  isClearLastSigne = (ope) => this.someOne(this.clearLastDigit)(ope);
  isChangeSigne = (ope) => this.someOne(this.changeSigne)(ope);

  onClick = (event) => {
    event.preventDefault;
    console.log(event.value);
    if (!isNaN(event.value) || this.isOperation(event.value)) {
      this.setState((prev) => {
        return { operation: prev.operation + event.value };
      });
    } else if (this.isEqual(event.value)) {
      this.setState((prev) => {
        return { operation: eval(prev.operation) };
      });
    } else if (this.isClear(event.value)) {
      this.setState((prev) => {
        return { operation: "" };
      });
    } else if (this.isClearLastSigne(event.value)) {
      this.setState((prev) => {
        let value = Array.from(prev.operation);
        value.pop();
        value.join("");
        return { operation: value };
      });
    } else if (this.isChangeSigne(event.value)) {
      this.setState((prev) => {
        let val = `${prev.operation}*-1`;
        return { operation: eval(val) };
      });
    }
  };
  render() {
    return (
      <div className="Calculadora">
        <Screen value={this.state.operation} />
        <div className="botones">
          <p>
            <Key value="c" onKeyClick={this.onClick} />
            <Key value="<=" onKeyClick={this.onClick} />
          </p>
        </div>
        <div className="botones">
          <p>
            <Key value="7" onKeyClick={this.onClick} />
            <Key value="8" onKeyClick={this.onClick} />
            <Key value="9" onKeyClick={this.onClick} />
            <Key value="/" onKeyClick={this.onClick} />
          </p>
          <p>
            <Key value="4" onKeyClick={this.onClick} />
            <Key value="5" onKeyClick={this.onClick} />
            <Key value="6" onKeyClick={this.onClick} />
            <Key value="*" onKeyClick={this.onClick} />
          </p>
          <p>
            <Key value="1" onKeyClick={this.onClick} />
            <Key value="2" onKeyClick={this.onClick} />
            <Key value="3" onKeyClick={this.onClick} />
            <Key value="-" onKeyClick={this.onClick} />
          </p>
          <p>
            <Key value="+/-" onKeyClick={this.onClick} />
            <Key value="0" onKeyClick={this.onClick} />
            <Key value="+" onKeyClick={this.onClick} />
            <Key value="=" onKeyClick={this.onClick} />
          </p>
        </div>
      </div>
    );
  }
}

export default Calculator;
