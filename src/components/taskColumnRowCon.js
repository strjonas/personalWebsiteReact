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
  reorderTasks,
  toggleDone,
}) {
  let temp = 0;
  let objectRowCon = objectDays;
  if (objectRowCon !== undefined) {
    console.log(objectRowCon);
    for (let item in objectRowCon) {
      console.log(objectRowCon[item]);
      if (objectRowCon[item].inhalt === "") {
        console.log("did");
        objectRowCon.pop(objectRowCon[item]);
      }
    }
    console.log(objectRowCon);
  }

  try {
    temp = objectRowCon.length;
    for (let item in objectRowCon) {
      if (typeof objectRowCon[item].id !== "number") {
        objectRowCon.pop(objectRowCon[item]);
      }
    }
  } catch (err) {
    objectRowCon = [];
  }
  temp = objectRowCon.length;
  if (temp >= 11) {
    objectRowCon.push({
      id: uuidv4(),
      kategorie: "ff",
      inhalt: "",
      gmacht: "",
    });
  } else {
    for (let i = temp; i < 11; i++) {
      objectRowCon.push({
        id: uuidv4(),
        kategorie: "ff",
        inhalt: "",
        gmacht: "",
      });
    }
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    reorderTasks(result, objectRowCon);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <ul
            style={{ margin: "0px", padding: "0px" }}
            className="tasks"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {objectRowCon.map((item, index) => {
              return (
                <Draggable
                  key={item["id"]}
                  draggableId={item["id"].toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskColumnRows
                        index={index}
                        title={title}
                        objectRowCon={item}
                        removeTask={removeTask}
                        addTask={addTask}
                        updateTask={updateTask}
                        toggleDone={toggleDone}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
