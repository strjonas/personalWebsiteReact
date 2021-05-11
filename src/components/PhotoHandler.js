import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { firebaseApp } from "./../base";
import { Configuration } from "@react-md/layout";
import { Grid, GridCell, useGridListSize } from "@react-md/utils";
import PictureCell from "./PictureCell";
import Footer from "./Footer";

export default function PhotoHandler() {
  const [pictures, setPictures] = useState([]);
  const { columns, cellWidth } = useGridListSize();
  const overrides = {};

  useEffect(() => getPictures(), []);

  async function upload(acceptedFiles) {
    const upFile = acceptedFiles[0];
    if (upFile === null || upFile === undefined) return;
    const storageRef = firebaseApp.storage().ref();
    const fileRef = storageRef.child(upFile.name);
    await fileRef.put(upFile);
    await fileRef.getDownloadURL().then(function (url) {
      addPicture(url);
    });
  }

  function callDelete(id) {
    deletePicture(id);
  }

  async function deletePicture(id) {
    const body = { id };
    await fetch("http://192.168.178.41:5000/pictures", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    getPictures();
  }
  async function getPictures() {
    const response = await fetch("http://192.168.178.41:5000/pictures");

    const jsonData = await response.json();
    setPictures(jsonData);
  }
  async function addPicture(url) {
    const body = { url };
    await fetch("http://192.168.178.41:5000/pictures", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    getPictures();
  }
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      upload(acceptedFiles);
    },
  });
  return (
    <>
      <div style={{ minHeight: "80vh" }}>
        <React.Fragment>
          <Configuration {...overrides}>
            <Grid style={{}}>
              <GridCell className="dragDrop">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p className="dragDropText">Drop files here</p>
                </div>
              </GridCell>
              <GridCell className="pictures">
                <md-gridlist>
                  {pictures.map((picture) => (
                    <PictureCell
                      key={picture.id}
                      deletePicture={callDelete}
                      obj={picture}
                    />
                  ))}
                </md-gridlist>
              </GridCell>
            </Grid>
          </Configuration>
        </React.Fragment>
      </div>

      <div className="third-seperator-tasks" />
      <div className="footer-tasks">
        <Footer />
      </div>
    </>
  );
}
