import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";

export default function TaskColumnRows({ title, objectRowCon }) {
  let row;
  let objectRows = objectRowCon;

  const [val, setVal] = useState([]);

  function onTextChange(e) {
    setVal(e.target.value);
    console.log(e);
  }
  function onLooseFocus(e) {
    console.log(e);
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
          <div className="divtextrow">{objectRows["inhalt"]}</div>
          <MdModeEdit className="icon-Button" />
        </div>
      ));
  return <div className="taskRow">{row}</div>;
}
