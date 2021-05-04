import React from "react";
import TreeNode from "./TreeNode";

export default function BookmarkTree({ data = [], treeEventHandler, nextOne }) {
  console.log(data, nextOne);
  if (data[nextOne] === undefined) return "";
  console.log(data[nextOne]);
  return (
    <div className="d-tree">
      <ul className="d-flex d-tree-container flex-column">
        {data[nextOne].map((tree) => (
          <TreeNode
            data={data}
            key={tree.id}
            node={tree}
            treeEventHandler={treeEventHandler}
          />
        ))}
      </ul>
    </div>
  );
}
