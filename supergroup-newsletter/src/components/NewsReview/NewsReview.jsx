import React, { useState, useEffect } from 'react';
import './NewsReview.css'
import { useApiContext } from '../ApiContext/ApiContext'; 
import MyCalendar from '../Calendar/MyCalendar';
import Events from '../Events/Events'
import Announcements from '../Announcements/Announcements'
import BackButton from '../BackButton/BackButton';
import NewMembers from '../NewMembers/NewMembers'
import NewsFooter from '../NewsFooter/NewsFooter';
import TypewriterLoading from '../Typewriter/Typewriter';
import { useNavigate } from "react-router-dom";

export default function NewsReview(){
  const { 
    writeDataToFirestore,
    currentNewsletter
  } = useApiContext();

  const clickButton = () => {
    navigate('/confirm');
    console.log('I was clicked')
    console.log(currentNewsletter)
  }
  
  const navigate = useNavigate();

  const [mainText, setMainText] = useState('Main Text') 
  const [editMainText, setEditMainText] = useState(false)

  useEffect(() => {
    setMainText(currentNewsletter.aiMessageData)
  }, [currentNewsletter.aiMessageData]);

  const handleTextChange = (event) => {
    setMainText(event.target.value);
  };

  const handleEditMainText = () => {
    setEditMainText(prev => !prev)
  };

  // Used for loading time  
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const renderEvents = () => {
    // Map through newsEvents and return an <Event> component for each object
    return currentNewsletter.newsEvents.map((event, index) => (
      <Events key={index} myEvent={event} />
    ));
  };

  const renderAnnouncements = () => {
    // Map through newsAnnouncements and return an <Announcements> component for each object
    return currentNewsletter.newsAnnouncements.map((announcement, index) => (
      <Announcements key={index} myAnnouncement={announcement} />
    ));
  }

  const renderNewMembers = () => {
    // Map through newsNewMembers and return an <NewMembers> component for each object
    return currentNewsletter.newsNewMembers.map((newMember, index) => (
      <NewMembers key={index} myMember={newMember} />
    ));
  }

  const mainTextBrokenUp = (text) => {
    const lines = text.split('\n');
    return lines.map((line, index) => (
      <div key={index} className='news-mainText-paragraph'>{line}</div>
    ));
  };

  // This is an undesigned version of a user input for naming the draft.
const handleSaveDraft = () => {
  const userInput = window.prompt('Please name your draft:');
  const newDate = new Date()

  if (userInput) {
    writeDataToFirestore({
      title: userInput,
      createdOn: newDate,
      userName: 'Current User',
      photoURL: currentNewsletter.heroImage,
      messageToAi: currentNewsletter.messageToAi,
      aiMessageData: currentNewsletter.aiMessageData,
      selectedDate: currentNewsletter.selectedDate,
      includeMembers: currentNewsletter.includeMembers,
      newsEvents: currentNewsletter.newsEvents,
      newsNewMembers: currentNewsletter.newsNewMembers,
      newsAnnouncements: currentNewsletter.newsAnnouncements
    });
    window.alert(`${userInput} draft saved successfully.`);
  } else {
      // I guess you should handle errors here future me.
    }
  }

  return (
    <div>
      <BackButton />
      <div className='news-container'>
        <div className='news-topContainer'>

          <div className='news-topLeft'>
            {!imageLoaded && <img className='news-heroImage' src="loading-placeholder.jpg" alt="Loading..." />}
              <div className='news-hero-title'>
              <img
                className='news-heroImage'
                src={currentNewsletter.heroImage}
                alt="Hero Image"
                style={{ display: imageLoaded ? 'block' : 'none' }}
                onLoad={handleImageLoad}
              />
              </div>
            <p className='news-date'>{currentNewsletter.selectedDate.toDateString()}</p>
            <div className='mainSection'>

              {editMainText ? (
                <div className='news-mainTextContainer'>
                  <textarea className='news-mainText' value={mainText} onChange={handleTextChange}></textarea>
                  <button className='news-mainTextButton' onClick={handleEditMainText}>Save</button>
                </div>
              ) : (
              <div className='news-mainTextContainer'>
                {mainText !== '' ? (
                  mainTextBrokenUp(mainText)
                ) : (
                  <TypewriterLoading />
                )}
                <button className='news-mainTextButton' onClick={handleEditMainText}>Edit</button>
              </div>
              )}

              {currentNewsletter.newsEvents.length > 0 && <h2 className='news-sectionTitle'>Weekly Community Events</h2>}
              <div className={currentNewsletter.newsEvents.length > 0 ? 'news-EventsContainer':''}>{renderEvents()}</div>
              
              {currentNewsletter.newsAnnouncements.length > 0 && <h2 className='news-sectionTitle'>Announcements!</h2>}
              <div className={currentNewsletter.newsAnnouncements.length > 0 ? 'news-Announcements-container':''}>{renderAnnouncements()}</div>

              {currentNewsletter.newsNewMembers.length > 0 && currentNewsletter.includeMembers && <h2 className='news-sectionTitle'>Welcome Our Community's New Members!</h2>}
              {currentNewsletter.includeMembers &&  <div className={currentNewsletter.newsNewMembers.length > 0 ? 'news-NewMembers-container':''}>{renderNewMembers()}</div>}
              <div><NewsFooter /></div>
            </div>
          </div>

          <div className='news-divider'></div>
          <div className='news-topRight'>
            <p>Select a date for your Newsletter</p>
            <MyCalendar />
          </div>
        </div>

        <div className='news-bottomContainer'>
          <div className='news-bottomLeft'></div>
          <div className='news-dividerBottom'></div>
          <div className='news-bottomRight'>
            <div className='news-saveDraft' onClick={handleSaveDraft}>Save Draft</div>
            <button className='news-doneButton' onClick={clickButton}>Schedule Newsletter</button>
          </div>
        </div>

      </div>
    </div>
  )
}
