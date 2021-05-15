import React, { Component } from "react";

export default class Loginpage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>LOGIN PAGE</h1>
        <button
          onClick={() => {
            console.log(this.props);
            this.props.auth.login(() => {
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
