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

    const renderEvents = () => {
        
        return events.map((event, index) => (
            <CheckboxHeaders
                key={index}
                index={event.uuid}
                description={event.description}
            />
        )) 
    }

    const renderAnnouncements = () => {
        //
        return announcements.map((announcement, index) => (
            <CheckboxHeaders 
                key={index}
                index={announcement.uuid}
                description={announcement.description}
            />
        ))
    }

    const events = [
        {uuid: 1, description: "Come enjoy fireworks at the shire!"},
        {uuid: 2, description: "Learn how to avoid the Nazgul 101."},
        {uuid: 3, description: "How to destroy the ring with friends!"}
    ]
    
    const announcements = [
        {uuid: 1, description: "Fellowship embarks on perilous quest."},
        {uuid: 2, description: "Ring destroyed, peace restored."},
        {uuid: 3, description: "Return of the King crowns victory."}
    ]


    return(
        <>
        <div className="back-rect" onClick={handleBackClick}>
            <BackBtn className="back-btn" />
            <div className="back-text">Back</div>
        </div>
        <div className="create-container">
            <div className="create-header">Create a Newsletter</div>
            <div className="create-main-section">
                <div className="create-subheader">Select topics to include</div>
                <div className="columns-container">

                    <div className="left-column">
                        <div className="header-image-container">
                            <div className="header-img">Header Image:</div>
                            <div className="upload-container">
                                <UploadPhoto className="upload-photo" />
                                Upload a Photo
                            </div>
                        </div>
                        <div className="selections-container">
                            <div className="title-textwrapper">Events</div>
                            {renderEvents()}
                            <div className="title-textwrapper">Announcements</div>
                            {renderAnnouncements()}
                        </div>
                    </div>
                    <div className="middle-column">
                        
                    </div>
                    <div className="right-column">
                    
                    </div>
                </div>
            </div>
            <div className="create-footer">
                Footer
            </div>
        </div>
        </>
    )
}