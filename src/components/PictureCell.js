import { GridListCell } from "@react-md/utils";
import React from "react";
import { MdDelete, MdFileDownload } from "react-icons/md";

export default function PictureCell({ obj, deletePicture }) {
  const picture = obj;
  function toDataURL(url) {
    return fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        return URL.createObjectURL(blob);
      });
  }
  async function download() {
    const a = document.createElement("a");
    a.href = await toDataURL(picture.url);
    a.setAttribute("download", "download.png");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  return (
    <GridListCell>
      <div className="pictureCell-component">
        <div className="pictureCell-header">
          <MdDelete onClick={() => deletePicture(picture.id)} />
          <MdFileDownload onClick={() => download()} />
        </div>
        <img
          alt="lol"
          id={picture.id}
          className="pictureCell-picture"
          src={picture.url}
        ></img>
      </div>
    </GridListCell>
  );
}
