import React from "react";
import TreeNode from "./TreeNode";

export default function BookmarkTree({ data = [], treeEventHandler }) {
  return (
    <div className="d-tree">
      <ul className="d-flex d-tree-container flex-column">
        {data.map((tree) => (
          <TreeNode
            key={tree.key}
            node={tree}
            treeEventHandler={treeEventHandler}
          />
        ))}
      </ul>
    </div>
  );
}
