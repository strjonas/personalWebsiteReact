import React from "react";
import "./App.css";
import "./index.scss";
import TabNav from "./components/TabNav";
import Tab from "./components/tab";
import Pastebins from "./components/Pastebins";
import TasksHandler from "./components/TasksHandler";
import BookmarkHandler from "./components/BookmarkHandler";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "Pastebin",
      bins: [],
      inpval: "",

      buttonType: "button",
    };
    this.getBins();
    this.deleteBin = this.deleteBin.bind(this);
    this.addBin = this.addBin.bind(this);
    this.getBins = this.getBins.bind(this);
  }

  async getBins() {
    try {
      const response = await fetch("http://192.168.178.41:5000/bins");
      const jsonData = await response.json();
      this.setState({ bins: jsonData });
    } catch (err) {
      console.error(err.message);
    }
  }

  async deleteReq(id) {
    try {
      await fetch(`http://192.168.178.41:5000/bins/${id}`, {
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

    const request = async (e) => {
      e.preventDefault();
      try {
        let description = bin;
        const body = { description };
        await fetch("http://192.168.178.41:5000/bins", {
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

  handleInput = (event) => {
    let str = JSON.stringify(event.target.value);
    if (str.includes("<script>") || str.includes(";")) {
      this.setState({ inpval: "" });
    } else {
      this.setState({ inpval: event.target.value });
    }
  };

  setSelected = (tab) => {
    this.setState({ selected: tab });
  };
  render() {
    return (
      <div>
        <div className="App mt-4">
          <TabNav
            tabs={["Pastebin", "Bookmarks", "Tasks", "Photo"]}
            selected={this.state.selected}
            setSelected={this.setSelected}
          >
            <Tab isSelected={this.state.selected === "Pastebin"}>
              <div style={{ height: "80vh" }}>
                <div className="CenterDiv">
                  <div className="row inprow">
                    <h2>Pastebin</h2>
                    <div
                      className="input-group mb-3 inp"
                      style={{ width: "auto" }}
                    >
                      <input
                        id="pastebin-input"
                        type="text"
                        onChange={this.handleInput}
                        className="form-control"
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

                  <Pastebins
                    bins={this.state.bins}
                    deleteBin={this.deleteBin}
                  />
                </div>
              </div>
            </Tab>

            <Tab isSelected={this.state.selected === "Bookmarks"}>
              <BookmarkHandler style={{ width: "100vh", height: "100vh" }} />
            </Tab>
            <Tab isSelected={this.state.selected === "Tasks"}>
              <TasksHandler />
            </Tab>
            <Tab isSelected={this.state.selected === "Photo"}>
              <div style={{ height: "80vh" }}>
                https://mlaursen.github.io/react-md-v1-docs/#/components/file-inputs
              </div>
            </Tab>
          </TabNav>
        </div>
        <div className="third-seperator-tasks" />
        <div className="footer-tasks">
          <div className="div-tasks-footer">
            <div className="inner-footer">
              <a
                href="mailto:dev.jonas.str@gmail.com"
                className="mail-tasks"
                target="_blank"
                rel="noopener noreferrer"
                data-darkreader-inline-border-top=""
                data-darkreader-inline-border-right=""
                data-darkreader-inline-border-bottom=""
                data-darkreader-inline-border-left=""
                data-darkreader-inline-color=""
                data-darkreader-inline-bgcolor=""
              >
                <svg
                  className="niftybutton-email mail-tasks-svg"
                  data-donate="true"
                  data-tag="ema"
                  data-name="Email"
                  viewBox="0 0 512 512"
                  preserveAspectRatio="xMidYMid meet"
                  data-darkreader-inline-fill=""
                >
                  {" "}
                  <path d="M101.3 141.6v228.9h0.3 308.4 0.8V141.6H101.3zM375.7 167.8l-119.7 91.5 -119.6-91.5H375.7zM127.6 194.1l64.1 49.1 -64.1 64.1V194.1zM127.8 344.2l84.9-84.9 43.2 33.1 43-32.9 84.7 84.7L127.8 344.2 127.8 344.2zM384.4 307.8l-64.4-64.4 64.4-49.3V307.8z"></path>{" "}
                </svg>
              </a>
              <a
                href="https://github.com/strjonas"
                target="_blank"
                rel="noopener noreferrer"
                className="github-icon"
                data-darkreader-inline-border-top=""
                data-darkreader-inline-border-right=""
                data-darkreader-inline-border-bottom=""
                data-darkreader-inline-border-left=""
                data-darkreader-inline-color=""
                data-darkreader-inline-bgcolor=""
              >
                <svg
                  className="niftybutton-github github-icon-svg"
                  data-donate="true"
                  data-tag="git"
                  data-name="Github"
                  viewBox="0 0 512 512"
                  preserveAspectRatio="xMidYMid meet"
                  data-darkreader-inline-fill=""
                >
                  {" "}
                  <path d="M256 70.7c-102.6 0-185.9 83.2-185.9 185.9 0 82.1 53.3 151.8 127.1 176.4 9.3 1.7 12.3-4 12.3-8.9V389.4c-51.7 11.3-62.5-21.9-62.5-21.9 -8.4-21.5-20.6-27.2-20.6-27.2 -16.9-11.5 1.3-11.3 1.3-11.3 18.7 1.3 28.5 19.2 28.5 19.2 16.6 28.4 43.5 20.2 54.1 15.4 1.7-12 6.5-20.2 11.8-24.9 -41.3-4.7-84.7-20.6-84.7-91.9 0-20.3 7.3-36.9 19.2-49.9 -1.9-4.7-8.3-23.6 1.8-49.2 0 0 15.6-5 51.1 19.1 14.8-4.1 30.7-6.2 46.5-6.3 15.8 0.1 31.7 2.1 46.6 6.3 35.5-24 51.1-19.1 51.1-19.1 10.1 25.6 3.8 44.5 1.8 49.2 11.9 13 19.1 29.6 19.1 49.9 0 71.4-43.5 87.1-84.9 91.7 6.7 5.8 12.8 17.1 12.8 34.4 0 24.9 0 44.9 0 51 0 4.9 3 10.7 12.4 8.9 73.8-24.6 127-94.3 127-176.4C441.9 153.9 358.6 70.7 256 70.7z"></path>{" "}
                </svg>
              </a>
            </div>
            <div style={{ paddingLeft: "85%", fontSize: "10px" }}>
              jonix development LLC
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
