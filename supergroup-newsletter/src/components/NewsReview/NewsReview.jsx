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
    myMainText='This is where the main text of the newsletter would go. Here we would explain lots of fun stuff about all the amazing things we would be doing this week. How great are we, that we came up with such a fun way to showing off what fun people we are!  I am just as exited as you are to see this start to come together, go superteam!'
  }){
  const { 
    selectedDate, 
    eventsData, 
    announcementsData,
    newMembersData
  } = useApiContext();

  const clickButton = () => {
    console.log('I was clicked')
  }

  const [mainText, setMainText] = useState(myMainText) 
  const [editMainText, setEditMainText] = useState(false)
  const [newsLetterTitle, setNewsLetterTitle] = useState(``)

  const handleTextChange = (event) => {
    setMainText(event.target.value);
  };
  const handleTitleChange = (event) => {
    setNewsLetterTitle(event.target.value);
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
        myUUID={event.eventUUID}
        myTitle={event.eventTitle}
        myType={event.eventType}
        myLocation={event.eventLocation}
        myInfo={event.eventInfo}
        myTime={event.eventTime}
        myDate={event.eventDate}
        myImage={event.eventImage}
      />
    ));
  };

  const renderAnnouncements = () => {
    // Map through announcementsData and return an <Announcements> component for each object
    return announcementsData.map((announcement, index) => (
      <Announcements
        key={index}
        myUUID={announcement.announcementUUID}
        myTitle={announcement.announcementTitle}
        myInformation={announcement.announcementInformation}
        myDate={announcement.announcementDate}
        myImage={announcement.announcementImage}
      />
    ));
  }

  const renderNewMembers = () => {
    // Map through newMembersData and return an <NewMembers> component for each object
    return newMembersData.map((newMember, index) => (
      <NewMembers
        key={index}
        myUUID={newMember.newMemberUUID}
        myName={newMember.newMemberName}
        myRole={newMember.newMemberRole}
        myImage={newMember.newMemberImage}
        myText={newMember.newMemberText}
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

              <div className='news-mainTextContainer'>
                {editMainText ? (
                  <textarea className='news-mainText' value={mainText} onChange={handleTextChange}></textarea>
                ) : (<div>{mainText}</div>)}
              </div>
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
