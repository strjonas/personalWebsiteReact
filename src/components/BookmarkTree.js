import React from "react";
import TreeNode from "./TreeNode";

export default function BookmarkTree({ data = [] }) {
  return (
    <div className="d-tree">
      <ul className="d-flex d-tree-container flex-column">
        {data.map((tree) => (
          <TreeNode key={tree.key} node={tree} />
        ))}
      </ul>
    </div>
  );
}
