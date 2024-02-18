import React, { useState, useEffect } from 'react';
import './NewsReview.css'
import { useApiContext } from '../ApiContext/ApiContext';
import MyCalendar from '../Calendar/MyCalendar';
import Events from '../Events/Events'
import Announcements from '../Announcements/Announcements'
import BackButton from '../BackButton/BackButton';
import NewMembers from '../NewMembers/NewMembers'
import NewsFooter from '../NewsFooter/NewsFooter';
import mvpLogo from '../../assets/images/makeitMVPHero.jpg';

export default function NewsReview({
    myImage=mvpLogo,
    myMainText='Main Text'
  }){
  const { 
    selectedDate, 
    eventsData, 
    announcementsData,
    newMembersData,
    aiMessageData
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
    // Map through eventsData and return an <Event> component for each object
    return eventsData.map((event, index) => (
      <Events
        key={index}
        myId={event.id}
        myTitle={event.title}
        myType={event.type}
        myLocation={event.location}
        myInfo={event.eventInfo}
        myImage={event.photoURL}
        myDate={event.date}
        myEndTime={event.endTime}
      />
    ));
  };

  const renderAnnouncements = () => {
    // Map through announcementsData and return an <Announcements> component for each object
    return announcementsData.map((announcement, index) => (
      <Announcements
        key={index}
        myId={announcement.id}
        myTitle={announcement.title}
        myInformation={announcement.description}
        myDate={announcement.date}
        myImage={announcement.photoURL}
      />
    ));
  }

  const renderNewMembers = () => {
    // Map through newMembersData and return an <NewMembers> component for each object
    return newMembersData.map((newMember, index) => (
      <NewMembers
        key={index}
        myUUID={newMember.id}
        myName={newMember.name}
        myRole={newMember.role}
        myImage={newMember.photoURL}
        myText={newMember.description}
      />
    ));
  }

  return (
    <div>
      <BackButton />
      <div className='news-container'>
        <div className='news-topContainer'>

          <div className='news-topLeft'>
            {!imageLoaded && <img className='news-heroImage' src="loading-placeholder.jpg" alt="Loading..." />}
              <div className='news-hero-title'>
              <div className='news-title'>Monthly Newsletter</div>
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
                  <div>{mainText}</div>
                  <button className='news-mainTextButton' onClick={handleEditMainText}>Edit</button>
                </div>
              )}

              {eventsData.length > 0 && <h4 className='news-sectionTitle'>Weekly Community Events</h4>}
              <div className={eventsData.length > 0 ? 'news-EventsContainer':''}>
                {renderEvents()}
              </div>
              {announcementsData.length > 0 && <h4 className='news-sectionTitle'>Announcements!</h4>}
              <div className={announcementsData.length > 0 ? 'news-Announcements-container':''}>
                {renderAnnouncements()}
              </div>
              {newMembersData.length > 0 && <h4 className='news-sectionTitle'>Welcome Our Community's New Members!</h4>}
              <div className={newMembersData.length > 0 ? 'news-NewMembers-container':''}> 
                  {renderNewMembers()}
              </div>
              <div>
                <NewsFooter />
              </div>
            </div>
          </div>

          <div className='news-divider'></div>
          <div className='news-topRight'>
            <p>Select a date and time to publish your news letter</p>
            <MyCalendar />
          </div>
        </div>
        <div className='news-bottomContainer'>
          <div className='news-bottomLeft'>
            
          </div>
          <div className='news-dividerBottom'></div>
          <div className='news-bottomRight'>
            <div className='news-saveDraft'>Save Draft</div>
            <button className='news-doneButton' onClick={clickButton}>Publish!</button>
          </div>
        </div>
      </div>
    </div>
  )
}
