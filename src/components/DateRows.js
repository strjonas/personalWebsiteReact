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
    this.getTasks();
    this.getTasks();
    this.setDates();
    this.addTask = this.addTask.bind(this);
    this.deleteReq = this.deleteReq.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.toogleDone = this.toogleDone.bind(this);
  }
  setDates() {
    const weekDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    var result = [];
    for (var i = 0; i < 5; i++) {
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

  async deleteReq(id) {}

  async sortTasks(tasks) {
    let oTasks = {};
    // let oTasks = this.state.tasks;
    // console.log(this.state.tasks);
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
        console.log(response);
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

  async updateTask(obj) {
    console.log(obj);
    //einmal update fuer inhalt und einmal wenn es gemacht/ nicht gemacht ist
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
    return this.state.dates.map((date) => (
      <TaskClumnDays
        key={date}
        title={date}
        removeTask={this.removeTask}
        addTask={this.addTask}
        updateTask={this.updateTask}
        toggleDone={this.toogleDone}
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
    ));
  }
}

export default DateRows;
