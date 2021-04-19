import React from "react";
import { MdModeEdit } from "react-icons/md";

export default function TaskColumnRows() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "2px",
      }}
    >
      <div> content</div>
      <MdModeEdit className="icon-Button" />
    </div>
  );
}
