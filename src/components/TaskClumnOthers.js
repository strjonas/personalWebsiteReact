import React from "react";
import TaskColumnRowCon from "./taskColumnRowCon";

export default function TaskColumnOthers({
  title,
  object,
  addTask,
  updateTask,
  reorderTasks,
  removeTask,
  toggleDone,
}) {
  return (
    <div
      className="Task-Column"
      style={{
        margin: "10px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{title}</h1>
      </div>

      <div>
        <TaskColumnRowCon
          title={title}
          objectDays={objectDays}
          removeTask={removeTask}
          addTask={addTask}
          updateTask={updateTask}
          toggleDone={toggleDone}
          reorderTasks={reorderTasks}
        />
      </div>
    </div>
  );
}
