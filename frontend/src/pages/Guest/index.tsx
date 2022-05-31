import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

import "./dropzone.css";

const fileTypes = ["PDF"];

function DragDrop() {
  const [file, setFile] = useState(null);
  const handleChange = (file : any) => {
    setFile(file);
  };

  return (
    <div className="dropzone">
      <FileUploader
        label = "업로드할 파일을 Drag & Drop 해주세요"
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
    </div>
  );
}

export default DragDrop;