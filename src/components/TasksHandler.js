import React, { Component } from "react";
import TaskClumnDays from "./TaskClumnDays";

export class TasksHandler extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className="main-task-container" style={{ padding: 0, margin: 0 }}>
        <div
          className="day-task-container"
          style={{
            width: window.innerWidth,
            height: window.innerHeight * 0.4,
            margin: "10px",
            paddingBottom: "10px",
            gridTemplateColumns: "repeat(5, 1fr)",
            display: "grid",
          }}
        >
          <div
            style={{
              width: window.innerWidth,
              height: window.innerHeight * 0.4,
              marginLeft: "40px",
              marginRight: "40px",
              gridTemplateColumns: "repeat(5, 1fr)",
              display: "grid",
            }}
          >
            <TaskClumnDays />
            <TaskClumnDays />
            <TaskClumnDays />
            <TaskClumnDays />
            <TaskClumnDays />
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
          style={{
            width: window.innerWidth - 80,
            height: window.innerHeight * 0.4,
            margin: "10px",
            paddingTop: "10px",
          }}
        >
          other-task-container
        </div>
      </div>
    );
  }
}

export default TasksHandler;
