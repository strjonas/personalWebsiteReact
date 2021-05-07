import React, { useState } from "react";
import { MdFileUpload } from "react-icons/md";
import { useDropzone } from "react-dropzone";
import { FileInput } from "react-md";

export default function PhotoHandler() {
  const [files, setFiles] = useState([]);

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
