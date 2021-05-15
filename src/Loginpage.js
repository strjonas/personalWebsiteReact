import React, { Component, setState } from "react";
import { MdClose } from "react-icons/md";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "react-bootstrap/Button";

export default class Loginpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: "",
      open: false,
      message: "",
    };
    this.handleClose = this.handleClose.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
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
