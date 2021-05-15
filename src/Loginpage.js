import React, { Component } from "react";

export default class Loginpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: "",
    };
  }

  valchange(e) {
    this.setState({ val: e.target.value });
  }

  render() {
    return (
      <div>
        <h1>LOGIN PAGE</h1>
        <input value={this.state.val} onChange={(e) => this.valchange(e)} />
        <button
          onClick={() => {
            this.props.auth.login(this.state.val, () => {
              this.props.setisauth(true);

              this.props.props.history.push("/tasks");
            });
          }}
        >
          Login
        </button>
      </div>
    );
  }
}
