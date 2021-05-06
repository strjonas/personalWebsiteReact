import React, { useState } from "react";
import {
  MdKeyboardArrowRight,
  MdFolder,
  MdDelete,
  MdContentCopy,
  MdClose,
} from "react-icons/md";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import BookmarkTree from "./BookmarkTree";
import EditLink from "./editLink";
import NewFolder from "./newFolderPopup";
import NewLink from "./newLink";
import copy from "copy-to-clipboard";

export default function TreeNode({ node, treeEventHandler, data }) {
  const [childVisible, setChildVisibility] = useState(false);
  const hasChild = node.isfolder !== "false" ? true : false;
  let isfol;
  hasChild ? (isfol = "folder") : (isfol = "");
  let islink;
  hasChild ? (islink = "") : (islink = "link");
  let ismain;
  node.folder !== "main" ? (ismain = "mainFolder") : (ismain = "");

  // for snackbar

  const [open, SetOpen] = useState(false);
  const [message, SetMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    SetOpen(false);
  };

  function copyf() {
    copy(node.link);
    SetMessage("Copied into clipboard");
    SetOpen(true);
  }

  function newFolder(e, name) {
    treeEventHandler(node, "newFolder", name);
  }

  function deleteFolder(e) {
    treeEventHandler(node, "deleteFolder");
  }

  function newLinkH(e, name) {
    treeEventHandler(node, "newLink", name);
  }

  function deleteLink(e) {
    treeEventHandler(node, "deleteLink");
  }

  function editLink(e, inhalt) {
    treeEventHandler(node, "editLink", inhalt);
  }

  return (
    <li>
      <div className={`d-flex ${ismain}`}>
        {hasChild && (
          <div
            className={`d-inline d-tree-toggler ${
              childVisible ? "active" : ""
            }`}
          >
            <MdKeyboardArrowRight
              onClick={(e) => setChildVisibility((v) => !v)}
              style={{ color: "white" }}
              icon="caret-right"
            />
          </div>
        )}

        <div className={`col row d-tree-head ${isfol} ${islink}`}>
          {hasChild && (
            <i className={`mr-1`}>
              {" "}
              <MdFolder onClick={(e) => setChildVisibility((v) => !v)} />
            </i>
          )}
          {hasChild && <div>{node.link}</div>}
          {!hasChild && <a href={node.link}>{node.link}</a>}
          <div>
            {hasChild && (
              <div className="row">
                <NewFolder
                  obj={{ id: `${node.id}newfolder`, inhalt: "" }}
                  newFolder={newFolder}
                />
                <NewLink
                  obj={{ id: `${node.id}newlink`, inhalt: "" }}
                  editLink={newLinkH}
                />

                <div style={{ width: "30px" }}></div>
                <MdDelete onClick={deleteFolder} />
                <div style={{ width: "16px" }}></div>
              </div>
            )}
            {!hasChild && (
              <div className="row">
                <MdContentCopy onClick={() => copyf()} />
                <EditLink
                  obj={{ id: `${node.id}editlink`, link: node.link }}
                  editLink={editLink}
                />
                <div style={{ width: "30px" }}></div>
                <MdDelete onClick={deleteLink} />
              </div>
            )}
          </div>
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
      {hasChild && childVisible && (
        <div className="d-tree-content">
          <ul className="d-flex d-tree-container flex-column">
            <BookmarkTree
              treeEventHandler={treeEventHandler}
              data={data}
              nextOne={node.link}
            />
          </ul>
        </div>
      )}
    </li>
  );
}
