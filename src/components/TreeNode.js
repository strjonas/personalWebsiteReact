import React, { useState } from "react";
import { MdKeyboardArrowRight, MdFolder, MdDelete } from "react-icons/md";
import BookmarkTree from "./BookmarkTree";
import EditLink from "./editLink";
import NewFolder from "./newFolderPopup";
import NewLink from "./newLink";

export default function TreeNode({ node, treeEventHandler }) {
  const [childVisible, setChildVisibility] = useState(false);
  const hasChild = node.isfolder !== "false" ? true : false;
  let isfol;
  hasChild ? (isfol = "folder") : (isfol = "");
  let islink;
  hasChild ? (islink = "") : (islink = "link");
  let ismain;
  node.folder !== "main" ? (ismain = "mainFolder") : (ismain = "");

  function newFolder(e, name) {
    treeEventHandler(node, "newFolder", name);
  }

  function deleteFolder(e) {
    treeEventHandler(node, "deleteFolder");
  }

  function newLink(e, name) {
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
          <div style={{ marginLeft: "50px" }}>{node.label}</div>
          <div>
            {hasChild && (
              <div className="row">
                <NewFolder
                  obj={{ id: node.key, inhalt: "" }}
                  newFolder={newFolder}
                />
                <NewLink
                  obj={{ id: [node.key, "randomShit"], inhalt: "" }}
                  editLink={newLink}
                />

                <div style={{ width: "30px" }}></div>
                <MdDelete onClick={deleteFolder} />
                <div style={{ width: "16px" }}></div>
              </div>
            )}
            {!hasChild && (
              <div className="row">
                <EditLink
                  obj={{ id: node.key, inhalt: node.label }}
                  editLink={editLink}
                />
                <div style={{ width: "30px" }}></div>
                <MdDelete onClick={deleteLink} />
              </div>
            )}
          </div>
        </div>
      </div>

      {hasChild && childVisible && (
        <div className="d-tree-content">
          <ul className="d-flex d-tree-container flex-column">
            <BookmarkTree
              treeEventHandler={treeEventHandler}
              data={node.children}
            />
          </ul>
        </div>
      )}
    </li>
  );
}
