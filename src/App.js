import React from "react";
import "./App.css";
import TabNav from "./components/TabNav";
import Tab from "./components/tab";
import { v4 as uuidv4 } from "uuid";

import Pastebins from "./components/Pastebins";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "Pastebin",
      bins: [
        { id: uuidv4(), text: "bsp" },
        { id: uuidv4(), text: "bsp" },
      ],
      inpval: "",
      buttonType: "button",
    };
    this.deleteBin = this.deleteBin.bind(this);
    this.addBin = this.addBin.bind(this);
  }
  deleteBin(id) {
    console.log(id);
    const newList = [];
    this.state.bins.forEach((item) => {
      if (item.id !== id) {
        newList.push(item);
      }
    });

    console.log(newList);
    this.setState({ bins: newList });
  }

  addBin() {
    const bin = this.state.inpval;
    if (bin === "") return;
    const newList = this.state.bins;
    newList.push({ id: uuidv4(), text: bin });
    this.setState({ bins: newList });
    this.setState({ inpval: "" });
  }

  handleInput = (event) => {
    this.setState({ inpval: event.target.value });
  };

  setSelected = (tab) => {
    this.setState({ selected: tab });
  };
  render() {
    return (
      <div className="App mt-4">
        <TabNav
          tabs={["Pastebin", "Notes", "Bookmarks", "Tasks", "Photo Pastebin"]}
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

          <Tab isSelected={this.state.selected === "Notes"}>Notes</Tab>
          <Tab isSelected={this.state.selected === "Bookmarks"}>Bookmarks</Tab>
          <Tab isSelected={this.state.selected === "Tasks"}>Tasks</Tab>
          <Tab isSelected={this.state.selected === "Photo Pastebin"}>
            Photo Pastebin
          </Tab>
        </TabNav>
      </div>
    );
  }
}

export default App;
