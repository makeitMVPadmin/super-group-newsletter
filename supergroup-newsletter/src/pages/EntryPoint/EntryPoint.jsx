import React, { useState } from "react";
import BackButton from '../../components/BackButton/BackButton';
import { ReactComponent as UploadPhoto } from "../../assets/svgs/upload-photo.svg"
import "./EntryPoint.css";
import CheckboxHeaders from "../../components/CheckboxHeaders/CheckboxHeaders";

export default function EntryPoint() {


    return(
        <>
        <BackButton />
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