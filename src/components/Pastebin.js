import React from "react";
import { MdDelete, MdContentCopy } from "react-icons/md";
import copy from "copy-to-clipboard";

const Pastebin = ({ bin, deleteBin }) => {
  function copyf() {
    copy(bin.description);
  }
  return (
    <div className="container ">
      <div className="row con">
        <p>{bin.description}</p>
        <div>
          <MdContentCopy className="icon-Button" onClick={() => copyf()} />
          <MdDelete className="icon-Button" onClick={() => deleteBin(bin.id)} />
        </div>
      </div>
      <br />
    </div>
  );
};

export default Pastebin;
