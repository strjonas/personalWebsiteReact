import React from "react";
import { MdModeEdit } from "react-icons/md";

export default function TaskColumnRows({ title, objectRowCon }) {
  let icon;
  let objectRows = objectRowCon;

  objectRows["inhalt"] === ""
    ? (icon = <div></div>)
    : (icon = <MdModeEdit className="icon-Button" />);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "2px",
      }}
    >
      <div className="divtextrow">{objectRows["inhalt"]}</div>
      {icon}
    </div>
  );
}
