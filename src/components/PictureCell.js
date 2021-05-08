import { GridListCell } from "@react-md/utils";
import React from "react";
import { MdDelete, MdContentCopy, MdClose } from "react-icons/md";

export default function PictureCell(obj) {
  const picture = obj.obj;

  return (
    <GridListCell>
      <div className="pictureCell-component">
        <div className="pictureCell-header">
          <MdDelete />
          <MdContentCopy />
        </div>
        <img alt="lol" className="pictureCell-picture" src={picture.url}></img>
      </div>
    </GridListCell>
  );
}
