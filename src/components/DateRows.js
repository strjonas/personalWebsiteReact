import TaskClumnDays from "./TaskClumnDays";
import React, { Component } from "react";
import TaskColumnOthers from "./TaskClumnOthers";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import AddCatModal from "./addCatModal";

export class DateRows extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: {},
      dates: [],
      otherCats: [],
      datumVerschiebung: -1,
      othersVerschiebung: 0,
    };

    this.setDates();
    this.getOtherCats();
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.toogleDone = this.toogleDone.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.reorderTasks = this.reorderTasks.bind(this);
    this.getOtherCats = this.getOtherCats.bind(this);
    this.rightClick = this.rightClick.bind(this);
    this.leftClick = this.leftClick.bind(this);
    this.rightClickothers = this.rightClickothers.bind(this);
    this.leftClickothers = this.leftClickothers.bind(this);
    this.addOtherCat = this.addOtherCat.bind(this);
    this.deletekategorie = this.deletekategorie.bind(this);
  }

  async updateDateShift(val) {
    // val is passed by the arrows and is either 1 or -1
    let temp = this.state.datumVerschiebung + val;
    this.state.datumVerschiebung = temp;
    this.setState({ datumVerschiebung: temp });
    this.setDates();
    this.getTasks();
  }

  async getOtherCats() {
    await this.getTasks();
    let temp = this.state.tasks;
    let cats = [];
    for (let key in temp) {
      if (!key.includes("-") && key !== "null") {
        cats.push(key);
      }
    }
    temp = [];

    for (
      let i = this.state.othersVerschiebung;
      i < this.state.othersVerschiebung + 5;
      i++
    ) {
      if (cats[i] !== undefined) {
        temp.push(cats[i]);
      }
    }
    this.state.otherCats = temp;
    this.setState({ otherCats: temp });
  }
  setDates() {
    const weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var result = [];
    var dV = this.state.datumVerschiebung;
    for (var i = dV; i < 5 + dV; i++) {
      var d = new Date();
      d.setDate(d.getDate() + i);
      let temp =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        "-" +
        weekDays[d.getDay()];
      result.push(temp);
      temp = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    }
    this.state.dates = result;
  }

  async sortTasks(tasks) {
    let oTasks = {};
    try {
      tasks.forEach((task) => {
        let temp = task.kategorie;
        if (!oTasks[temp]) {
          oTasks[temp] = [task];
        } else {
          let name = task.kategorie;
          let temp = oTasks[name];
          temp.push(task);
          oTasks[name] = temp;
        }
      });
    } catch (e) {
      console.log(e);
    }
    this.state.tasks = oTasks;
    this.setState((tasks = oTasks));
  }

  async getTasks() {
    try {
      const response = await fetch("http://localhost:5000/tasks");
      const jsonData = await response.json();
      if (jsonData !== undefined) {
        await this.sortTasks(jsonData);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async addTask(obj, kategorie) {
    const task = obj.target.value;
    const gmacht = "FALSE";
    let temp =
      kategorie.split("-")[0] +
      "-" +
      kategorie.split("-")[1] +
      "-" +
      kategorie.split("-")[2];

    if (temp.includes("undefined")) {
      temp = temp.split("-")[0];
    }

    kategorie = temp;
    const request = async (obj) => {
      obj.preventDefault();
      try {
        let inhalt = task;
        const body = { kategorie, inhalt, gmacht };
        const response = await fetch("http://localhost:5000/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } catch (err) {
        console.error(err.message);
      }
    };
    await request(obj);
    await this.getTasks();
  }

  async removeTask(id) {
    try {
      const deleteTask = await fetch(
        `http://localhost:5000/tasks/${id["id"]}`,
        {
          method: "DELETE",
        }
      );
    } catch (err) {
      console.error(err);
    }
    await this.getTasks();
  }

  async reorderTasks(result, obj) {
    let os = obj[result.source.index];
    let od = obj[result.destination.index];
    if (result.source.index === result.destination.index) return;
    if (os.kategorie === "ff" || od.kategorie === "ff") {
      return;
    }
    try {
      let body = { os: os, od: od };
      const response = await fetch(`http://localhost:5000/switch/tasks`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log(error);
    }
    await this.getTasks();
  }

  async updateTask(obj, newInhalt) {
    try {
      const body = { newInhalt };
      const response = await fetch(`http://localhost:5000/tasks/${obj["id"]}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }

    await this.getTasks();
  }

  async toogleDone(obj) {
    let gmacht = obj.gmacht;
    let param;
    gmacht ? (param = "FALSE") : (param = "TRUE");
    const body = { param };
    try {
      const response = await fetch(
        `http://localhost:5000/tasks/state/${obj["id"]}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
    } catch (error) {
      console.error(error.message);
    }
    await this.getTasks();
  }

  async deletekategorie(kategorie) {
    try {
      const body = { kategorie };
      await fetch(`http://localhost:5000/all/tasks`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await this.getOtherCats();
    } catch (error) {
      console.error(error.message);
    }
  }

  leftClick() {
    this.updateDateShift(-1);
  }
  rightClick() {
    this.updateDateShift(1);
  }
  updateDateShiftothers(val) {
    if (val === -1 && this.state.othersVerschiebung === 0) return;
    this.state.othersVerschiebung = this.state.othersVerschiebung + val;
    this.getOtherCats();
  }
  leftClickothers() {
    this.updateDateShiftothers(-1);
  }
  rightClickothers() {
    this.updateDateShiftothers(1);
  }

  async addOtherCat(kategorie) {
    const request = async () => {
      try {
        let inhalt = "";
        let gmacht = false;
        const body = { kategorie, inhalt, gmacht };
        const response = await fetch("http://localhost:5000/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } catch (err) {
        console.error(err.message);
      }
    };
    await request();
    await this.getOtherCats();
  }

  render() {
    let temp = this.state.tasks;
    return (
      <div className="main-task-container" style={{ padding: 0, margin: 0 }}>
        <div className="date-row-main-div">
          <div onClick={this.leftClick} className="arrow-icon-container">
            <MdKeyboardArrowLeft className="arrow-icons" />
          </div>

          <div id="rows2" className="innerContainer">
            {this.state.dates.map((date) => (
              <TaskClumnDays
                key={date}
                title={date}
                removeTask={this.removeTask}
                addTask={this.addTask}
                updateTask={this.updateTask}
                toggleDone={this.toogleDone}
                reorderTasks={this.reorderTasks}
                object={
                  temp[
                    date.split("-")[0] +
                      "-" +
                      date.split("-")[1] +
                      "-" +
                      date.split("-")[2]
                  ]
                }
              />
            ))}
          </div>
          <div onClick={this.rightClick} className="arrow-icon-container">
            <MdKeyboardArrowRight className="arrow-icons" />
          </div>
        </div>

        <div
          className="middel-task-toolbar"
          style={{
            padding: "10px",
            backgroundColor: "#d3d3d4",
          }}
        >
          <div className="toolbar-div">
            <div>toolbar</div>
            <AddCatModal
              obj={{ id: 10, inhalt: "" }}
              addCat={this.addOtherCat}
            />
          </div>
        </div>
        <div className="innerContainer" id="rows1">
          <div className="date-row-main-div">
            <div
              onClick={this.leftClickothers}
              className="arrow-icon-container"
            >
              <MdKeyboardArrowLeft className="arrow-icons" />
            </div>
            {this.state.otherCats.map((cat) => (
              <TaskColumnOthers
                key={cat}
                deletekategorie={this.deletekategorie}
                title={cat}
                removeTask={this.removeTask}
                addTask={this.addTask}
                updateTask={this.updateTask}
                toggleDone={this.toogleDone}
                reorderTasks={this.reorderTasks}
                object={temp[cat]}
              />
            ))}
            <div
              onClick={this.rightClickothers}
              className="arrow-icon-container"
            >
              <MdKeyboardArrowRight className="arrow-icons" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DateRows;
