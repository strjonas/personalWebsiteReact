import React, { Component } from "react";
import Footer from "./components/Footer";
import Pastebins from "./components/Pastebins";

const backendPath = "https://${process.env.REACT_APP_API}";

export default class PastebinHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bins: [],
      inpval: "",

      buttonType: "button",
    };
    this.getBins();
    this.deleteBin = this.deleteBin.bind(this);
    this.addBin = this.addBin.bind(this);
    this.getBins = this.getBins.bind(this);
    this.handlekey = this.handlekey.bind(this);
  }

  async getBins() {
    try {
      const response = await fetch(`https://${process.env.REACT_APP_API}/bins`);
      try {
        const jsonData = await response.json();
        this.setState({ bins: jsonData });
      } catch (error) {
        this.setState({ bins: [] });
        console.log(error);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async deleteReq(id) {
    try {
      await fetch(`https://${process.env.REACT_APP_API}/bins/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err);
    }
  }

  async deleteBin(id) {
    await this.deleteReq(id);
    const newList = [];
    this.state.bins.forEach((item) => {
      if (item.id !== id) {
        newList.push(item);
      }
    });
    this.setState({ bins: newList });
  }

  async addBin(e) {
    const bin = this.state.inpval;
    if (bin === "") return;

    const request = async () => {
      try {
        let description = bin;
        const body = { description };
        await fetch(`https://${process.env.REACT_APP_API}/bins`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } catch (err) {
        console.error(err.message);
      }
    };
    await request(e);
    await this.getBins();
    this.setState({ inpval: "" });
  }

  handlekey(e) {
    if (e.key === "Enter") {
      this.addBin();
    }
  }

  handleInput = (event) => {
    let str = JSON.stringify(event.target.value);
    if (str.includes("<script>") || str.includes(";")) {
      this.setState({ inpval: "" });
    } else {
      this.setState({ inpval: event.target.value });
    }
  };

  render() {
    if (
      (this.state.bins === undefined) |
      (this.state.bins === null) |
      (this.state.bins === "error occured")
    ) {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p> connection error</p>
        </div>
      );
    }
    return (
      <>
        <div style={{ height: "80vh" }}>
          <div className="CenterDiv">
            <div className="row inprow">
              <h2>Pastebin</h2>
              <div className="input-group mb-3 inp" style={{ width: "auto" }}>
                <input
                  id="pastebin-input"
                  type="text"
                  onChange={this.handleInput}
                  onKeyPress={(e) => this.handlekey(e)}
                  className="form-control pastebin-input-field"
                  value={this.state.inpval}
                  style={{ width: "auto" }}
                ></input>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-submit"
                  onClick={this.addBin}
                >
                  ADD
                </button>
              </div>
            </div>

            <Pastebins bins={this.state.bins} deleteBin={this.deleteBin} />
          </div>
        </div>
        <div className="third-seperator-tasks" />
        <div className="footer-tasks">
          <Footer />
        </div>
      </>
    );
  }
}
