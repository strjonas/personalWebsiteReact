import React from "react";
import TaskColumnRowCon from "./taskColumnRowCon";

export default function TaskClumnDays() {
  return (
    <div className="Task-Column" style={{ margin: "10px" }}>
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ fontSize: "20px" }}>DAY </div>
        <div style={{ fontSize: "20px" }}>date</div>
      </div>

      <div>
        <TaskColumnRowCon />
      </div>
    </div>
  );
}
