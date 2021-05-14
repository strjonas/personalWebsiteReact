import React, { Component } from "react";

export default class Loginpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: props.auth,
    };
  }
  render() {
    return (
      <div>
        <h1>LOGIN PAGE</h1>
        <button
          onClick={() => {
            this.props.auth.login(() => {
              this.props.setauth(true);
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
