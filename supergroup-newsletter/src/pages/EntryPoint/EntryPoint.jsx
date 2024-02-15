import React, { useState } from "react";
import { ReactComponent as BackBtn } from "../../assets/svgs/back-btn.svg"
import { ReactComponent as UploadPhoto } from "../../assets/svgs/upload-photo.svg"
import "./EntryPoint.css";
import CheckboxHeaders from "../../components/CheckboxHeaders/CheckboxHeaders";

export default function EntryPoint() {
    const [isClicked, setIsClicked] = useState(false);

    const handleBackClick = () => {
        setIsClicked(true)
        console.log("clicked!")
    }

    return(
        <>
        <div className="back-rect" onClick={handleBackClick}>
            <BackBtn className="back-btn" />
            <div className="back-text">Back</div>
        </div>
        <div className="create-container">
            <div className="create-header">Create a Newsletter</div>
            <div className="create-subheader">Select topics to include</div>
            <div className="create-column">
                <div className="header-image-container">
                    <div className="header-img">Header Image:</div>
                    <div className="upload-container">
                        <UploadPhoto className="upload-photo" />
                        Upload a Photo
                    </div>
                </div>
                
            <CheckboxHeaders title={"Event"} />
            <CheckboxHeaders title={"Announcements"} />
            </div>
        </div>
        </>
    )
}