import React, { useState, Fragment } from "react";
import { MdDelete } from "react-icons/md";
import EditTodo from "./editTask";

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
      addTask(val, title);
    }
  }
  function donetoggle(e) {
    toggleDone(objectRowCon);
  }
  function removeTaskhere(e) {
    removeTask(objectRowCon);
  }
  const handleInput = (e) => {
    if (e.key === "Enter") {
      addTask(val, title);
    }
  };

  if (updateTask === null) updateTask = undefined;
  if (objectRowCon === null) objectRowCon = undefined;
  objectRows["inhalt"] = objectRows["inhalt"]

    .replaceAll(";", "")
    .replaceAll("***", "<em>")
    .replaceAll("**", "<strong>")
    .replaceAll("&&", "<u>");
  if (!objectRowCon["gmacht"]) {
    icon = (
      <EditTodo
        obj={objectRowCon}
        updateTask={updateTask}
        className="icon-Button"
      />
    );
    crossedOrNot = (
      <div
        dangerouslySetInnerHTML={{ __html: objectRows["inhalt"] }}
        onClick={donetoggle}
        className="divtextrow"
      ></div>
    );
  } else {
    icon = <MdDelete onClick={removeTaskhere} className="icon-Button" />;
    crossedOrNot = (
      <div onClick={donetoggle} className="divtextrow">
        <del dangerouslySetInnerHTML={{ __html: objectRows["inhalt"] }}></del>
      </div>
    );
  }

  objectRows["inhalt"] === ""
    ? (row = (
        <input
          className="textInTaskRow inputRow"
          style={{
            display: "inline-block",
            border: "1px solid #212222",
            borderLeft: "none",
            borderRight: "none",
            borderTop: "none",
            color: "#E8E6E3",
            borderRadius: "2px",
            boxSizing: "border-box",
            backgroundColor: "#181A1B",
          }}
          type="text"
          value={val}
          onKeyPress={(e) => handleInput(e)}
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
