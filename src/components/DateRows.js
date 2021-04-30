import TaskClumnDays from "./TaskClumnDays";
import React, { Component } from "react";
import TaskColumnOthers from "./TaskClumnOthers";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import AddCatModal from "./addCatModal";
import { DragDropContext } from "react-beautiful-dnd";

export class DateRows extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: {},
      dates: [],
      otherCats: [],
      datumVerschiebung: -1,
      othersVerschiebung: 0,
      CatList: [],
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
    this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
    this.handleOnDragEndOthers = this.handleOnDragEndOthers.bind(this);
    this.changeCat = this.changeCat.bind(this);
    this.getCatList = this.getCatList.bind(this);
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
    let tempq = await this.getCatList();
    tempq = tempq.split("/");
    let temp = [];
    for (
      let i = this.state.othersVerschiebung;
      i < this.state.othersVerschiebung + 5;
      i++
    ) {
      if (tempq[i] !== undefined && !temp.includes(tempq[i])) {
        temp.push(tempq[i]);
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
          if (task.inhalt !== "") {
            temp.push(task);
          }

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
        await fetch("http://localhost:5000/tasks", {
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
      await fetch(`http://localhost:5000/tasks/${id["id"]}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err);
    }
    await this.getTasks();
  }

  async changeCat(result) {
    let kat = result.destination.droppableId;
    let newkat =
      kat.split("-")[0] + "-" + kat.split("-")[1] + "-" + kat.split("-")[2];
    if (newkat.includes("undefined")) {
      newkat = newkat.split("-")[0];
    }
    let id = result.draggableId;
    try {
      let body = { newkat: newkat, id: id };
      await fetch(`http://localhost:5000/kategorie/tasks`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log(error);
    }
    await this.getTasks();
  }

  async reorderTasks(result) {
    let obj;
    let kat = result.source.droppableId;
    let temp =
      kat.split("-")[0] + "-" + kat.split("-")[1] + "-" + kat.split("-")[2];
    obj = this.state.tasks[temp];
    if (obj === undefined) return;
    let os = obj[result.source.index];
    let od = obj[result.destination.index];
    if (result.source.index === result.destination.index) return;
    if (os === undefined || od === undefined) return;
    if (os.kategorie === "ff" || od.kategorie === "ff") {
      return;
    }
    try {
      let body = { os: os, od: od };
      await fetch(`http://localhost:5000/switch/tasks`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log(error);
    }
    console.log("hey");
    await this.getTasks();
    console.log("hey");
  }

  async updateTask(obj, newInhalt) {
    try {
      const body = { newInhalt };
      await fetch(`http://localhost:5000/tasks/${obj["id"]}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error(err.message);
    }

    await this.getTasks();
  }

  async getCatList() {
    try {
      const response = await fetch("http://localhost:5000/tasks/cats");
      const jsonData = await response.json();
      let liste = jsonData[0]["liste"];
      return liste;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCat(cat) {
    let liste = await this.getCatList();
    liste = liste.split("/");
    let temp = [];
    for (var i = 0; i < liste.length; i++) {
      if (liste[i] !== cat) {
        temp.push(liste[i]);
      }
    }
    try {
      let newListe = temp.join("/");
      const body = { newListe: newListe };
      await fetch(`http://localhost:5000/tasks/cats/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async addCat(cat) {
    try {
      let liste = await this.getCatList();
      let newListe = liste + "/" + cat;
      const body = { newListe: newListe };
      await fetch(`http://localhost:5000/tasks/cats/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async toogleDone(obj) {
    let gmacht = obj.gmacht;
    let param;
    gmacht ? (param = "FALSE") : (param = "TRUE");
    const body = { param };
    try {
      await fetch(`http://localhost:5000/tasks/state/${obj["id"]}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error.message);
    }
    await this.getTasks();
  }

  async deletekategorie(kategorie) {
    try {
      const body = { kategorie };
      await this.deleteCat(kategorie);
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
  async updateDateShiftothers(val) {
    console.log(this.state.otherCats);
    if (val === 1 && this.state.otherCats.length < 5) return;
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
    await this.addCat(kategorie);
    await this.getOtherCats();
  }

  handleOnDragEnd(result) {
    if (!result.destination) return;
    if (result.destination.droppableId === result.source.droppableId) {
      this.reorderTasks(result);
    } else {
      this.changeCat(result);
    }
  }

  async handleOnDragEndOthers(result) {
    if (!result.destination) return;
    if (result.destination.droppableId === result.source.droppableId) {
      await this.reorderTasks(result);
    } else {
      await this.changeCat(result);
    }
    await this.getOtherCats();
  }

  render() {
    let temp = this.state.tasks;
    return (
      <div>
        <DragDropContext onDragEnd={this.handleOnDragEnd}>
          <div
            className="main-task-container"
            style={{ padding: 0, margin: 0 }}
          >
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

            <div className="middel-task-toolbar">
              <div className="toolbar-div">
                <div>Toolbar</div>
                <AddCatModal
                  obj={{ id: 10, inhalt: "" }}
                  addCat={this.addOtherCat}
                />
              </div>
            </div>

            <div className="date-row-main-div">
              <div
                onClick={this.leftClickothers}
                className="arrow-icon-container"
              >
                <MdKeyboardArrowLeft className="arrow-icons" />
              </div>
              <div className="innerContainer" id="rows1">
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
              </div>
              <div
                onClick={this.rightClickothers}
                className="arrow-icon-container"
              >
                <MdKeyboardArrowRight className="arrow-icons" />
              </div>
            </div>
          </div>
        </DragDropContext>
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
                  className="niftybutton-github"
                  className="github-icon-svg"
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

export default DateRows;
