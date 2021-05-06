import React, { useState } from "react";
import { MdDelete, MdContentCopy, MdClose } from "react-icons/md";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import copy from "copy-to-clipboard";

const Pastebin = ({ bin, deleteBin }) => {
  const [open, SetOpen] = useState(false);
  const [message, SetMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    SetOpen(false);
  };

  function copyf() {
    copy(bin.description);
    SetMessage("Copied into clipboard");
    SetOpen(true);
  }
  return (
    <div className="container ">
      <div className="row con">
        <p className="pastebin-textfield">{bin.description}</p>
        <div>
          <MdContentCopy className="icon-Button" onClick={() => copyf()} />
          <MdDelete className="icon-Button" onClick={() => deleteBin(bin.id)} />
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            <IconButton onClick={handleClose}>
              <MdClose style={{ color: "white" }} />
            </IconButton>
          </React.Fragment>
        }
      />
      <br />
    </div>
  );
};

export default Pastebin;
