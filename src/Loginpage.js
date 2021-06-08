import React, { Component } from "react";
import { MdClose } from "react-icons/md";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "react-bootstrap/Button";
import bcrypt from "bcryptjs";

export default class Loginpage extends Component {
  constructor(props) {
    super(props);
    localStorage.setItem("path", window.location.pathname);
    this.state = {
      val: "",
      open: false,
      message: "",
    };
    this.checkIfAuthenticatet();

    this.handleClose = this.handleClose.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  async checkIfAuthenticatet() {
    let isauth = false;
    const session = localStorage.getItem("session");
    try {
      var hash = "$2b$10$4A0FP3u6FE4frp1JqNR7.e.Rz9sugbTKmHYySjhAzisX0JyNf0VlK";
      isauth = bcrypt.compareSync(session, hash);
    } catch {
      return false;
    }

    if (isauth) {
      this.props.auth.authenticated = true;
      this.props.setisauth(true);
      this.props.props.history.push("/tasks");
    } else {
      this.props.auth.authenticated = false;
      this.props.setisauth(false);
      this.props.props.history.push("/");
    }
  }

  handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  }
  valchange(e) {
    if (
      e.target.value.includes(";") |
      e.target.value.includes("<") |
      e.target.value.includes(">")
    )
      return;
    this.setState({ val: e.target.value });
  }

  onsubmit() {
    this.props.auth.login(this.state.val, (isRight) => {
      if (isRight) {
        this.props.setisauth(true);

        this.props.props.history.push("/tasks");
      } else {
        this.setState({
          message: "Wrong Password, please try again!",
          open: true,
        });
      }
    });
  }

  onKeyPress(e) {
    if (e.key === "Enter") {
      this.onsubmit();
    }
  }

  render() {
    return (
      <div>
        <div className="login-container">
          <div className="login-inner-container">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h1 className="login-heading">LOGIN</h1>
            </div>

            <input
              type="password"
              className="login-input"
              onKeyPress={this.onKeyPress}
              value={this.state.val}
              onChange={(e) => this.valchange(e)}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button className="login-button" onClick={() => this.onsubmit()}>
                Login
              </Button>
            </div>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.open}
          autoHideDuration={2000}
          onClose={this.handleClose}
          message={this.state.message}
          action={
            <React.Fragment>
              <IconButton onClick={this.handleClose}>
                <MdClose style={{ color: "white" }} />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    );
  }
}
