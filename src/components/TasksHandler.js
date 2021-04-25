import React, { Component } from "react";
import DateRows from "./DateRows";

export class TasksHandler extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <DateRows />;
  }
}

export default TasksHandler;
