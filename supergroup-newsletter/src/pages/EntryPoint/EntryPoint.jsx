import React, { useState } from "react";
import { ReactComponent as BackBtn } from "../../assets/svgs/back-btn.svg"
import { ReactComponent as UploadPhoto } from "../../assets/svgs/upload-photo.svg"
import { ReactComponent as ToggleOff} from "../../assets/svgs/toggle-off.svg"
import { ReactComponent as ToggleOn} from "../../assets/svgs/toggle-on.svg"
import {ReactComponent as AIicon} from "../../assets/svgs/ai-icon.svg";
import CheckboxHeaders from "../../components/CheckboxHeaders/CheckboxHeaders";
import "./EntryPoint.css";

export default function EntryPoint() {
    const [isClicked, setIsClicked] = useState(false);
    const [isToggled, setIsToggled] = useState(false);
    const [userInput, setUserInput] = useState("");

    //handling back button, goes nowhere for now, but show move user to Communiti's page (maybe a dashboard)
    const handleBackClick = () => {
        setIsClicked(!isClicked);
        console.log("clicked!")
    }

    // handling the toggle, just for show for now, will add implementation later
    const toggleHandler = () => {
        setIsToggled(!isToggled)
    }

    // rendering Checkbox component for Events and sending dummy data 
    const renderEvents = () => {
        return events.map((event, index) => (
            <CheckboxHeaders
                key={index}
                index={event.uuid}
                description={event.description}
            />
        )) 
    }
    // rendering the Checkbox component for Announcements and sending dummy data
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

    // mapping over dummy data and creating a div to display members when toggled
    const renderMembers = () => {
        return members.map((member, index) => (
        <div className="members" key={index} index={member.uuid}>
            {member.member}
        </div>

        )) 
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Textarea content: ', userInput)
    }

    const handleUserInput = (e) => {
        setUserInput(e.target.value)
    }

    // Dummy data 
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

    const members = [
        {uuid: 1, member: "Frodo"},
        {uuid: 2, member: "Gandalf"},
        {uuid: 3, member: "Aragorn"},
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
                        <h4 className="member-title">Show Members</h4>
                        <h5 className="member-subheader">Toggle to include the three most recently joined members.</h5>
                        <div className="toggle-container">
                            <input
                                type="checkbox"
                                id="toggle"
                                className="hidden-checkbox"
                                checked={isToggled}
                                onChange={toggleHandler}
                            />
                            <label htmlFor="toggle" className="toggle-label">
                                {isToggled ? <ToggleOn /> : <ToggleOff />}
                            </label>
                        </div>
                        <div className="show-members">
                            {isToggled ? renderMembers() : null}
                        </div>
                        <div className="ai-container">
                            <h4 className="ai-title">Additional Instructions:</h4>
                            <h5 className="ai-subheader">
                                <AIicon className="ai-icon" />
                                Give AI specific instructions for your newsletter.
                            </h5>
                            <form onSubmit={handleSubmit} className="ai-input">
                                <textarea className="ai-textarea" value={userInput} onChange={handleUserInput} placeholder="Example: Hi! Can you mention that Valentine's Day is coming up? You don't need to include the events that I've selected. Can you also share that there will be a fun giveaway coming up in two weeks and to stay tuned?"></textarea>
                                {/* <button type="submit">Generate Newsletter</button> */}
                            </form>
                        </div>
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