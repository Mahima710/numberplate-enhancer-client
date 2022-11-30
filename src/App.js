import React, { useCallback, useState } from "react";
import cuid from "cuid";
import Dropzone from "./Drop";
import ImageGrid from "./ImageGrid";
import image from "./pngwing.com.png";
import "./index.css";
import "./App.css";
import axios from "axios";

export const Error = ({ message }) => {
  return <p style={{ marginLeft: "16rem", marginBottom: "3rem" }}>{message}</p>;
};
function App() {
  const [message, setMessage] = useState(null);
  const [images, setImages] = useState([]);
  const [output, setOutput] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setImages(acceptedFiles);
  }, []);

  const onclick = () => {
    const formData = new FormData();
    setMessage("Processing input...");
    if (images.length === 0) {
      return setMessage("No image found");
    }
    formData.append("source", images[0]);
    axios
      .post("http://127.0.0.1:5000/upload", formData)
      .then((res) => {
        setOutput(res.data);
        return setMessage("Output Generated...");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(output);
    return 0;
  };
  return (
    <div className="App">
      <div className="head">
        <div className="title">
          <p style={{ marginBottom: "0px" }}>
            Number Plate <br />
            Recognition <br />
            System
          </p>
          <button className="buttonToStart">Get Started</button>
        </div>
        <img className="image" src={image} alt="car" />
      </div>
      <div className="flexbox">
        <Dropzone onDrop={onDrop} accept={"image/*"} />
        <div className="result">
          {output.length !== 0 ? (
            <img
              src={`data:image/jpeg;base64,${output.image}`}
              alt="img"
              className="file-img"
            />
          ) : (
            "Your output will be generated here"
          )}
        </div>
      </div>
      <button type="button" onClick={onclick} className="btn1">
        Submit
      </button>

      {message && <Error message={message} />}
      {/* <ImageGrid images={images} /> */}
    </div>
  );
}
export default App;

// import logo from "./logo.svg";
// import "./App.css";
// import { DragDropFile } from "./Drop";
// import image from "./pngwing.com.png";

// function App() {
//   return (
// <div className="App">
//   <div className="head">
//     <div className="title">
//       <p style={{ marginBottom: "0px" }}>
//         Number Plate <br />
//         Recognition <br />
//         System
//       </p>
//       <button className="buttonToStart" to="#">
//         Get Started
//       </button>
//     </div>
//     <img className="image" src={image} alt="car" />
//   </div>

//   <DragDropFile />
// </div>
//   );
// }

// export default App;
