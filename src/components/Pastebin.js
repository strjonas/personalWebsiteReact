import React, { Component } from "react";
import { MdDelete, MdContentCopy } from "react-icons/md";
import copy from "copy-to-clipboard";

const Pastebin = ({ bin, deleteBin }) => {
  function copyf() {
    copy(bin.text);
  }
  return (
    <div className="container ">
      <div className="row con" style={{ backgroundColor: "#d3d3d3" }}>
        <p>{bin.text}</p>
        <div>
          <MdContentCopy className="icon-Button" onClick={() => copyf()} />
          <MdDelete className="icon-Button" onClick={() => deleteBin(bin.id)} />
        </div>
      </div>
      <br />
    </div>
  );
};

// elements required: acutal Text, delete, copy, update
// elements are orderd from important to not important (left to right), if there is not enough space, the less important components will disappear

export default Pastebin;
