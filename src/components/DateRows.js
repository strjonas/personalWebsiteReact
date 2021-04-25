import TaskClumnDays from "./TaskClumnDays";
import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

export class DateRows extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: {},
      dates: [],
    };

    this.setDates();
    this.getOtherCats();
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.toogleDone = this.toogleDone.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.reorderTasks = this.reorderTasks.bind(this);
    this.getOtherCats = this.getOtherCats.bind(this);
  }

  async getOtherCats() {
    let task;
    await this.getTasks();
    let temp = Array.from(this.state.tasks);

    temp.forEach((task) => {
      console.log(task.key);
    });
    console.log(temp);
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
    for (var i = -1; i < 4; i++) {
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

  render() {
    let temp = this.state.tasks;
    return (
      <div className="main-task-container" style={{ padding: 0, margin: 0 }}>
        <div
          className="day-task-container "
          style={{
            margin: "10px",
            paddingBottom: "10px",
            gridTemplateColumns: "repeat(5, 1fr)",
            display: "grid",
          }}
        >
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
        </div>
        <div
          className="middel-task-toolbar"
          style={{
            paddingBottom: "10px",
            paddingTop: "10px",
            paddingLeft: "10px",
            backgroundColor: "#d3d3d4",
          }}
        >
          toolbar
        </div>
        <div
          className="other-task-container"
          id="rows1"
          style={{
            width: window.innerWidth - 80,
            height: window.innerHeight * 0.4,
            margin: "10px",
            paddingTop: "10px",
          }}
        >
          {
            // map other kategories
          }
        </div>
      </div>
    );
  }
}

export default DateRows;
