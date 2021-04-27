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
  const objectDays = object;
  return (
    <div
      className="Task-Column"
      style={{
        margin: "10px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            fontSize: "20px",
            textTransform: "uppercase",
            paddingBottom: "5px",
          }}
        >
          {title}
        </div>
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
