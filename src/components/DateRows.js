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
    this.setDates();
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

  async sortTasks(tasks) {
    let oTasks = this.state.tasks;
    try {
      tasks.forEach((task) => {
        let temp = task.kategorie;
        if (!oTasks[temp]) {
          let temp = task.kategorie;
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

  render() {
    let temp = this.state.tasks;
    return this.state.dates.map((date) => (
      <TaskClumnDays
        key={date}
        title={date}
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
