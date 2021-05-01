import React, { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import BookmarkTree from "./BookmarkTree";

export default function TreeNode({ node }) {
  const [childVisible, setChildVisibility] = useState(false);
  const hasChild = node.children ? true : false;
  return (
    <li>
      <div className="d-flex" onClick={(e) => setChildVisibility((v) => !v)}>
        {hasChild && (
          <div
            className={`d-inline d-tree-toggler ${
              childVisible ? "active" : ""
            }`}
          >
            <MdKeyboardArrowRight icon="caret-right" />
          </div>
        )}

        <div className="col d-tree-head">
          <i className={`mr-1 ${node.icon}`}> </i>
          {node.label}
        </div>
      </div>

      {hasChild && childVisible && (
        <div className="d-tree-content">
          <ul className="d-flex d-tree-container flex-column">
            <BookmarkTree data={node.children} />
          </ul>
        </div>
      )}
    </li>
  );
}
