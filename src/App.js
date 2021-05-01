import React from "react";
import "./App.css";
import "./index.scss";
import TabNav from "./components/TabNav";
import Tab from "./components/tab";
import NoteHandler from "./noteHandler";
import Pastebins from "./components/Pastebins";
import TasksHandler from "./components/TasksHandler";
import DateRows from "./components/DateRows";

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
      const response = await fetch("http://localhost:5000/bins");
      const jsonData = await response.json();
      this.setState({ bins: jsonData });
    } catch (err) {
      console.error(err.message);
    }
  }

  async deleteReq(id) {
    try {
      await fetch(`http://localhost:5000/bins/${id}`, {
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
        await fetch("http://localhost:5000/bins", {
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
    //return <DateRows />;
    return (
      <div className="App mt-4">
        <TabNav
          tabs={["Pastebin", "Bookmarks", "Tasks", "Photo"]}
          selected={this.state.selected}
          setSelected={this.setSelected}
        >
          <Tab isSelected={this.state.selected === "Pastebin"}>
            <div className="CenterDiv">
              <div className="row inprow">
                <h2>Pastebin</h2>
                <div className="input-group mb-3 inp" style={{ width: "auto" }}>
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

              <Pastebins bins={this.state.bins} deleteBin={this.deleteBin} />
            </div>
          </Tab>

          <Tab isSelected={this.state.selected === "Bookmarks"}>Bookmarks</Tab>
          <Tab isSelected={this.state.selected === "Tasks"}>
            <TasksHandler />
          </Tab>
          <Tab isSelected={this.state.selected === "Photo"}>Photo</Tab>
        </TabNav>
      </div>
    );
  }
}
export default App;
