import React, { useState } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";

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
  function updateTaskhere(e) {
    updateTask(e);
  }
  if (!objectRowCon["gmacht"]) {
    icon = <MdModeEdit onClick={updateTaskhere} className="icon-Button" />;
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
          onClick={donetoggle}
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
  return <div className="taskRow">{row}</div>;
}
