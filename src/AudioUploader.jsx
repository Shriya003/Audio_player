import React, { useState } from 'react';
import './AudioUploader.css'
const AudioUploader = ({ onUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onUpload(file);
  };


  return (
    <div className='file_upload'>
      <h1>Upload your Music here</h1>
      <input className='file' type="file" accept="audio/*" onChange={handleFileChange} />
    </div>
  );
};

export default AudioUploader;