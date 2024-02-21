import React, { useState, useEffect } from "react";
import "./PhotoUpload.css";
import { ReactComponent as UploadPhoto } from "../../assets/svgs/upload-photo.svg"
import {ReactComponent as UploadActive } from "../../assets/svgs/active-upload-icon.svg"
import { storage } from '../../firebase-config'
import { ref, getDownloadURL, uploadBytes} from "firebase/storage";
import { useApiContext } from '../ApiContext/ApiContext'; 

export default function PhotoUpload () {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [isActive, setIsActive] = useState(false);

    const { 
      setHeroImage
    } = useApiContext();

    useEffect(() => {
        if (selectedPhoto) {
            const imgName = selectedPhoto.name;
            const imgsRef = ref(storage, `images/${imgName}`); // Define the path for the image in storage

            uploadBytes(imgsRef, selectedPhoto).then((snapshot) => {
                console.log("Image uploaded successfully", snapshot);
                getDownloadURL(snapshot.ref).then(url => {
                    console.log("Download URL:", url);
                    setHeroImage(url);
                });
                // update the DB with url, for reference.
                

            }).catch((error) => {
                console.error("Error uploading image:", error);
            });
        }
    }, [selectedPhoto]);

    // Function to handle photo selection
    const handlePhotoChange = (e) => {
        const uploadedPhoto = e.target.files[0]
        setSelectedPhoto(uploadedPhoto)
        e.target.files.length === 0 ? setIsActive(false) : setIsActive(true) 
    };
    

    return(
        <div className="upload-container">
            <input
                type="file"
                id="file-upload"
                className="file-upload"
                onChange={handlePhotoChange}
            />
            <label htmlFor="file-upload" className="upload-photo-label">
                {isActive === false ? <UploadPhoto className="upload-svg"  /> : <UploadActive className="upload-svg" /> }
                {isActive === false ? "Upload a Photo" : selectedPhoto.name}
            </label>
        </div>
    )
}