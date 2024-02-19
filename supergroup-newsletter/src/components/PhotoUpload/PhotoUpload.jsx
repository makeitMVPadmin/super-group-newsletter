import React, { useState } from "react";
import "./PhotoUpload.css";
import { ReactComponent as UploadPhoto } from "../../assets/svgs/upload-photo.svg"
import {ReactComponent as UploadActive } from "../../assets/svgs/active-upload-icon.svg"

export default function PhotoUpload () {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [isActive, setIsActive] = useState(false);

    // Function to handle photo submission
    const handleSubmitPhoto = (event) => {
        event.preventDefault();
        // Logic to submit the selected photo
        console.log('Selected photo:', selectedPhoto);
    };

    // Function to handle photo selection
    const handlePhotoChange = (e) => {
        console.log("FileLists: ", e.target.files)
        setSelectedPhoto(e.target.files[0]);
        e.target.files.length == 0 ? setIsActive(false) : setIsActive(true) 
    };
    

    return(
        <div className="upload-container">
            <input
                type="file"
                id="file-upload"
                className="file-upload"
                // value={selectedPhoto}
                onChange={handlePhotoChange}
            />
            <label htmlFor="file-upload" className="upload-photo-label">
                {isActive == false ? <UploadPhoto className="upload-svg"  /> : <UploadActive className="upload-svg" /> }
                {isActive == false ? "Upload a Photo" : selectedPhoto.name}
            </label>
        </div>
    )
}