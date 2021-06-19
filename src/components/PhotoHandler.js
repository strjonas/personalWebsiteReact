import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { firebaseApp } from "./../base";
import { Configuration } from "@react-md/layout";
import { Grid, GridCell } from "@react-md/utils";
import PictureCell from "./PictureCell";
import Footer from "./Footer";

export default function PhotoHandler() {
  const [pictures, setPictures] = useState([]);
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
    await fetch(`https://${process.env.REACT_APP_API}/pictures`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    getPictures();
  }
  async function getPictures() {
    const response = await fetch(
      `https://${process.env.REACT_APP_API}/pictures`
    );
    try {
      const jsonData = await response.json();
      setPictures(jsonData);
    } catch (error) {
      console.log(error);
      setPictures([]);
    }
  }
  async function addPicture(url) {
    const body = { url };
    await fetch(`https://${process.env.REACT_APP_API}/pictures`, {
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
  if (
    (pictures === undefined) |
    (pictures === null) |
    (pictures === "error occured")
  ) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p> connection error</p>
      </div>
    );
  }
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
