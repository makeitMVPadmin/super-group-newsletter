import React, { useState } from "react";
import BackButton from '../../components/BackButton/BackButton';
import { useApiContext } from '../../components/ApiContext/ApiContext';
import { ReactComponent as ToggleOff} from "../../assets/svgs/toggle-off.svg"
import { ReactComponent as ToggleOn} from "../../assets/svgs/toggle-on.svg"
import {ReactComponent as AIicon} from "../../assets/svgs/ai-icon.svg";
import PhotoUpload from "../../components/PhotoUpload/PhotoUpload";
import CheckboxHeaders from "../../components/CheckboxHeaders/CheckboxHeaders";
import AiInputBox from "../../components/AiInputBox/AiInputBox";
import Drafts from "../../components/Drafts/Drafts";
import "./EntryPoint.css";

export default function EntryPoint() {
    const [isClicked, setIsClicked] = useState(false);
    const [isToggled, setIsToggled] = useState(false);
    const [userInput, setUserInput] = useState("");

    // access to the global variables
    const { 
      selectedDate, 
      eventsData, 
      announcementsData,
      newMembersData,
      aiMessageData
    } = useApiContext();

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
        return eventsData.map((event, index) => (
            <CheckboxHeaders
                key={index}
                index={event.id}
                description={event.title}
            />
        )) 
    }
    // rendering the Checkbox component for Announcements and sending dummy data
    const renderAnnouncements = () => {
        //
        return announcementsData.map((announcement, index) => (
            <CheckboxHeaders 
                key={index}
                index={announcement.id}
                description={announcement.title}
            />
        ))
    }

    // mapping over dummy data and creating a div to display members when toggled
    const renderMembers = () => {
      // I think this should really be CheckboxHeaers as well...  something to think about future us.
        return newMembersData.map((member, index) => (
        <div className="members" key={index} index={member.id}>
            {member.name}
        </div>
        )) 
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     console.log('Textarea content: ', userInput)
    // }

    const handleUserInput = (e) => {
        setUserInput(e.target.value)
    }

    const renderDrafts =() => {
        return drafts.map((draft, index) => (
            <Drafts 
                key={index}
                index={draft.uuid}
                title={draft.title}
                createdBy={draft.createdBy}
            />
        ))
    }

    const drafts = [
        {uuid: 1, title: "Newsletter 3", createdBy: "Made by @samwise-gamgee"},
        {uuid: 2, title: "Newsletter 2", createdBy: "Made by @merry"},
        {uuid: 3, title: "Newsletter 1", createdBy: "Made by @pippin"},
    ]


    return(
        <>
        <BackButton />
        <div className="create-container">
            <h1 className="create-header">Create a Newsletter</h1>
            <div className="create-main-section">
                <h4 className="create-subheader">Select topics to include</h4>
                <div className="columns-container">

                    <div className="left-column">
                        <div className="header-image-container">
                            <h5 className="header-img">Header Image:</h5>
                            <PhotoUpload />
                        </div>
                        <div className="selections-container">
                            <h5 className="title-textwrapper">Events</h5>
                            {renderEvents()}
                            <h5 className="title-textwrapper">Announcements</h5>
                            {renderAnnouncements()}
                        </div>
                    </div>

                    <div className="middle-column">
                        <h4 className="member-title">Show New Members</h4>
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
                            <AiInputBox />
                        </div>
                    </div>

                    <div className="right-column">
                        <h4 className="drafts-title">Previously Generated Drafts</h4>
                        <div className="drafts-container">
                            {renderDrafts()}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="create-footer">
                Footer
            </div> */}
        </div>
        </>
    )
}