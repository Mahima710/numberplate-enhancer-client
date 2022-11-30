import { React, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import "./drop.css";

function Dropzone({ onDrop, accept, open }) {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept,
      onDrop,
    });
  const files = acceptedFiles.map((file) => <p key={file.path}>{file.path}</p>);
  return (
    <div>
      <div {...getRootProps({ className: "dropzone" })} id="dropzone">
        <input className="input-zone" {...getInputProps()} />
        <div className="text-center">
          {isDragActive ? (
            <p className="dropzone-content">Release to drop the files here</p>
          ) : (
            <p className="dropzone-content">
              Drag and drop some files here, or click to select files
            </p>
          )}
          <button type="button" onClick={open} className="btn">
            Click to select files
          </button>
        </div>
      </div>
    </div>
  );
}
export default Dropzone;

// // drag drop file component
// import { React, useState, useRef } from "react"

export const DragDropFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>

          <p>File Type: {selectedFile.type}</p>

          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };
  return (
    <>
      <div className="drop">
        <input
          type="file"
          onChange={onFileChange}
          className="dropinput"
          id="input"
        />
        <h2
          style={{ textAlign: "center", paddingTop: "5rem" }}
          className="label"
        >
          Upload Your
          <br /> file
          <br /> Here
        </h2>
      </div>
      {fileData()}
    </>
  );
};
