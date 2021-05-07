import React, { useState, useEffect } from "react";
import { MdFileUpload } from "react-icons/md";
import { useDropzone } from "react-dropzone";
import { firebaseApp } from "./../base";

export default function PhotoHandler() {
  const [files, setFiles] = useState([]);
  const [pictures, setPictures] = useState([]);

  useEffect(() => getPictures(), []);

  async function upload(acceptedFiles) {
    const upFile = acceptedFiles;
    if (upFile === null || upFile === undefined) return;
    const storageRef = firebaseApp.storage().ref();
    const fileRef = storageRef.child(upFile.name);
    await fileRef.put(upFile).then(() => {
      console.log("uploaded file");
    });
    await fileRef.getDownloadURL().then(function (url) {
      addPicture(url);
      console.log(url);
    });
  }

  async function deletePicture(id) {
    const body = { id };
    await fetch("http://192.168.178.41:5000/pictures", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    console.log("deleted picture");
  }
  async function getPictures() {
    const response = await fetch("http://192.168.178.41:5000/pictures");

    const jsonData = await response.json();
    console.log(jsonData);
    setPictures(jsonData);
    console.log("getPictures");
  }
  async function addPicture(url) {
    const body = { url };
    await fetch("http://192.168.178.41:5000/pictures", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log("addPicture");
  }
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      console.log(acceptedFiles);
      upload(acceptedFiles);
    },
  });

  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img
          src={file.preview}
          style={{ width: "50%", height: "auto" }}
          alt="preview"
        />
      </div>
    </div>
  ));

  return (
    <div style={{ height: "100vh", overflow: "scroll" }} className="">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p style={{ color: "white", height: "20vh", width: "100%" }}>
          Drop files here
        </p>
      </div>
      <div>{images}</div>
    </div>
  );
}
