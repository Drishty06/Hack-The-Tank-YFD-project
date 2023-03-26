import { useState, useRef } from "react";
import axios from 'axios';
//AXNKTF5vjjZgvxvy
//F2eaxWeicflK7a0v
const DragDropFiles = () => {
  const [files, setFiles] = useState(null);
  const [isFile, setIsFile] = useState(false);
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files)
  };
  
  // send files to the server // learn from my other video
  const handleUpload = () => {

    const formData = new FormData();
    formData.append("img", files[0]);
    console.log(files);
    setIsFile(true);
    axios.post("http://localhost:4000/api/uploadImg", formData, {
    }).then(res => {
        console.log(res)
    })
  };

  if (files) return (
    <div className="uploads">

        {isFile ? <p>Uploaded File: {files[0].name}</p> :
        <>
            <p>{files[0].name}</p>
            <div className="actions">
                <button onClick={() => setFiles(null)}>Cancel</button>
                <button onClick={handleUpload}>Upload</button>
            </div>
        </>
        }
    </div>
  )

  return (
    <>
        <div 
            className="dropzone"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
          <h1>Drag and Drop Files to Upload</h1>
          <h1>Or</h1>
          <input 
            type="file"
            multiple
            onChange={(event) => setFiles(event.target.files)}
            hidden
            accept="image/png, image/jpeg"
            ref={inputRef}
          />
          <button onClick={() => inputRef.current.click()}>Select Files</button>
        </div>
    </>
  );
};

export default DragDropFiles;