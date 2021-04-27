import React, { useState, Fragment } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import EditTodo from "./editTask";
import { Draggable } from "react-beautiful-dnd";

export default function TaskColumnRows({
  title,
  objectRowCon,
  removeTask,
  updateTask,
  toggleDone,
  addTask,
}) {
  let icon;
  let row;
  let crossedOrNot;
  let objectRows = objectRowCon;

  const [val, setVal] = useState([]);

  function onTextChange(e) {
    setVal(e.target.value);
  }
  function onLooseFocus(e) {
    if (e.target.value !== "") {
      addTask(e, title);
    }
  }
  function donetoggle(e) {
    toggleDone(objectRowCon);
  }
  function removeTaskhere(e) {
    removeTask(objectRowCon);
  }

  if (updateTask === null) updateTask = undefined;
  if (objectRowCon === null) objectRowCon = undefined;
  if (!objectRowCon["gmacht"]) {
    icon = <EditTodo obj={objectRowCon} updateTask={updateTask} />;
    crossedOrNot = (
      <div onClick={donetoggle} className="divtextrow">
        {objectRows["inhalt"]}
      </div>
    );
  } else {
    icon = <MdDelete onClick={removeTaskhere} className="icon-Button" />;
    crossedOrNot = (
      <div onClick={donetoggle} className="divtextrow">
        <del>{objectRows["inhalt"]}</del>
      </div>
    );
  }

  objectRows["inhalt"] === ""
    ? (row = (
        <input
          className="textInTaskRow"
          style={{
            display: "inline-block",
            border: "1px solid #ccc",
            borderRadius: "2px",
            boxSizing: "border-box",
          }}
          type="text"
          value={val}
          onChange={onTextChange}
          onBlur={onLooseFocus}
        ></input>
      ))
    : (row = (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "2px",
          }}
        >
          {crossedOrNot}
          {icon}
        </div>
      ));
  return (
    <Fragment>
      <div className="taskRow">{row}</div>
    </Fragment>
  );
}
