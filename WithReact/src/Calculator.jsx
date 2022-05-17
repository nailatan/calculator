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
    this.state = { value: "" };
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault;
    this.setState((prev) => {
      return { value: prev.value + event.value };
    });
  }
  render() {
    return (
      <div className="Calculadora">
        <Screen value={this.state.value} />
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
