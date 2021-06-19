import React, { useState } from "react";
import {
  MdKeyboardArrowRight,
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

export default function TreeNode({ node, treeEventHandler, data, counter }) {
  const [childVisible, setChildVisibility] = useState(false);
  const hasChild = node.isfolder !== "false" ? true : false;
  let isfol;
  hasChild ? (isfol = "folder") : (isfol = "");
  let islink;
  hasChild ? (islink = "") : (islink = "link");

  // for snackbar

  const [open, SetOpen] = useState(false);
  const [message, SetMessage] = useState("");
  const [isHovered, setHover] = useState(false);

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

  function onMouseEnter(e) {
    setHover(true);
    if (node.isfolder === "true") return;
    document.getElementById(`${node.id}`).style.backgroundColor = "red";
  }
  function onMouseLeave(e) {
    //#212222;
    setHover(false);
    if (node.isfolder === "true") return;
    document.getElementById(`${node.id}`).style.background = "#181a1b";
  }
  return (
    <li className={`Tree-node `}>
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`d-flex `}
        style={{ paddingLeft: `${counter * 20}px` }}
      >
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

        <div
          onClick={(e) => setChildVisibility((v) => !v)}
          className={`col row d-tree-head ${isfol} ${islink}`}
          id={`${node.id}`}
        >
          {hasChild && <i className={`mr-1`}> </i>}
          {hasChild && (
            <div onClick={(e) => setChildVisibility((v) => !v)}>
              {node.link}
            </div>
          )}
          {!hasChild && (
            <a style={{ color: "white" }} href={node.link}>
              {node.link}
            </a>
          )}
          <div className="icon-container-bookmarklinks">
            {hasChild && isHovered && (
              <div className="row ">
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
                <div style={{ width: "20px" }}></div>
              </div>
            )}
            {!hasChild && isHovered && (
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
              counter={(counter += 1)}
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
