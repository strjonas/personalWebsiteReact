import React from "react";
import TaskColumnRows from "./taskColumnRows";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

export default function TaskColumnRowCon({
  title,
  objectDays,
  removeTask,
  updateTask,
  addTask,
  toggleDone,
}) {
  let temp = 0;
  let objectRowCon = objectDays;
  try {
    temp = objectRowCon.length;
  } catch (err) {
    objectRowCon = [];
  }

  for (let i = temp; i < 11; i++) {
    objectRowCon.push({
      id: uuidv4(),
      kategorie: "ff",
      inhalt: "",
      gmacht: "",
    });
  }
  return objectRowCon.map((item) => {
    return (
      <TaskColumnRows
        key={item["id"]}
        title={title}
        objectRowCon={item}
        removeTask={removeTask}
        addTask={addTask}
        updateTask={updateTask}
        toggleDone={toggleDone}
      />
    );
  });
}
