import React from "react";
import { FileInput } from "react-md";

export default function PhotoHandler() {
  return (
    <div style={{ height: "80vh", display: "flex", justifyContent: "center" }}>
      {" "}
      <FileInput id="image-input-3" accept="image/*" name="images" primary />
    </div>
  );
}
