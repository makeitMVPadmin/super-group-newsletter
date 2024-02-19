import React, { useState, useEffect } from 'react';
import './NewsReview.css'
import { useApiContext } from '../ApiContext/ApiContext'; 
import MyCalendar from '../Calendar/MyCalendar';
import Events from '../Events/Events'
import Announcements from '../Announcements/Announcements'
import BackButton from '../BackButton/BackButton';
import NewMembers from '../NewMembers/NewMembers'
import NewsFooter from '../NewsFooter/NewsFooter';

export default function NewsReview({
    myImage='https://raw.githubusercontent.com/makeitMVPadmin/super-group-newsletter/develop/supergroup-newsletter/src/assets/images/makeitMVPHero.jpg',
    myMainText='Main Text'
  }){
  const { 
    selectedDate, 
    aiMessageData,
    newsEvents,
    newsAnnouncements,
    newsNewMembers,
    includeMembers
  } = useApiContext();

  const clickButton = () => {
    console.log('I was clicked')
  }

  const [mainText, setMainText] = useState('Main Text') 
  const [editMainText, setEditMainText] = useState(false)
  const [newsLetterTitle, setNewsLetterTitle] = useState(``)

  useEffect(() => {
    setMainText(aiMessageData)
  }, [aiMessageData]);

  const handleTextChange = (event) => {
    setMainText(event.target.value);
  };
  const handleTitleChange = (event) => {
    setNewsLetterTitle(event.target.value);
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
    return newsEvents.map((event, index) => (
      <Events key={index} myEvent={event} />
    ));
  };

  const renderAnnouncements = () => {
    // Map through newsAnnouncements and return an <Announcements> component for each object
    return newsAnnouncements.map((announcement, index) => (
      <Announcements key={index} myAnnouncement={announcement} />
    ));
  }

  const renderNewMembers = () => {
    // Map through newsNewMembers and return an <NewMembers> component for each object
    return newsNewMembers.map((newMember, index) => (
      <NewMembers key={index} myMember={newMember} />
    ));
  }

  const mainTextBrokenUp = (text) => {
    const lines = text.split('\n');
    return lines.map((line, index) => (
      <div key={index} className='news-mainText-paragraph'>{line}</div>
    ));
  };

  return (
    <div>
      <BackButton />
      <div className='news-container'>
        <div className='news-topContainer'>

          <div className='news-topLeft'>
            {!imageLoaded && <img className='news-heroImage' src="loading-placeholder.jpg" alt="Loading..." />}
              <div className='news-hero-title'>
              <div className='news-title'>Weekly Newsletter</div>
              <img
                className='news-heroImage'
                src={myImage}
                alt="Hero Image"
                style={{ display: imageLoaded ? 'block' : 'none' }}
                onLoad={handleImageLoad}
              />
              </div>
            <p className='news-date'>{selectedDate.toDateString()}</p>
            <div className='mainSection'>

              {editMainText ? (
                <div className='news-mainTextContainer'>
                  <textarea className='news-mainText' value={mainText} onChange={handleTextChange}></textarea>
                  <button className='news-mainTextButton' onClick={handleEditMainText}>Save</button>
                </div>
              ) : (
                <div className='news-mainTextContainer'>
                  {/* <div>{mainText}</div> */}
                  {mainTextBrokenUp(mainText)}
                  <button className='news-mainTextButton' onClick={handleEditMainText}>Edit</button>
                </div>
              )}

              {newsEvents.length > 0 && <h2 className='news-sectionTitle'>Weekly Community Events</h2>}
              <div className={newsEvents.length > 0 ? 'news-EventsContainer':''}>{renderEvents()}</div>
              
              {newsAnnouncements.length > 0 && <h2 className='news-sectionTitle'>Announcements!</h2>}
              <div className={newsAnnouncements.length > 0 ? 'news-Announcements-container':''}>{renderAnnouncements()}</div>

              {newsNewMembers.length > 0 && includeMembers && <h2 className='news-sectionTitle'>Welcome Our Community's New Members!</h2>}
              {includeMembers &&  <div className={newsNewMembers.length > 0 ? 'news-NewMembers-container':''}>{renderNewMembers()}</div>}
              <div><NewsFooter /></div>
            </div>
          </div>

          <div className='news-divider'></div>
          <div className='news-topRight'>
            <p>Select a date to publish your news letter</p>
            <MyCalendar />
          </div>
        </div>

        <div className='news-bottomContainer'>
          <div className='news-bottomLeft'></div>
          <div className='news-dividerBottom'></div>
          <div className='news-bottomRight'>
            <div className='news-saveDraft'>Save Draft</div>
            <button className='news-doneButton' onClick={clickButton}>Publish</button>
          </div>
        </div>

      </div>
    </div>
  )
}
