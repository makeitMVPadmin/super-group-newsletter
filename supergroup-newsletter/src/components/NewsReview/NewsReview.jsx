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
  const { selectedDate } = useApiContext();

  const clickButton = () => {
    console.log(selectedDate)
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
                <h4 className='news-sectionTitle'>Weekly Community Events</h4>
              <div className='news-EventsContainer'>
                <Events     
                  eventTitle={'How Ai can help in Marketing'}
                  eventType={'On-Site'}
                  eventLocation={'New York, NY'}
                  eventInformation={'Come learn about different ways you can meet investors and learn how to pitch to them about how great Ai is!'}
                  eventDate={'Feb 24th, 2023'}
                  eventTime={'7:00 PM - 9:00 PM EST'}
                />
                <Events     
                  eventTitle={'Expecting the unexpected'}
                  eventType={'remote'}
                  eventLocation={'Boone, NC'}
                  eventInformation={'If you think you can plan for everything, you have never been involved in a land war in Asia.  Never go in against a sicilian when death is on the line.'}
                  eventDate={'March 4th, 2023'}
                  eventTime={'6:00 PM - 7:30 PM EST'}
                />
              </div>
              <h4 className='news-sectionTitle'>Announcements!</h4>
              <div className='news-Announcements-container'>
                <Announcements />
                <Announcements />
                <Announcements />
              </div>
              <h4 className='news-sectionTitle'>Welcome Our Community's New Members!</h4>
              <div className='news-NewMembers-container'> 
                <NewMembers myName={'Rooney'} myRole={'House Panther'} myText={'Like a shadow at midnight, impossible to see unless the moon is high.'}/>
                <NewMembers myName={'Sheena'} myRole={'Dark Cystal'} myText={'Mysterious powers both consume light and radiates rays of magical power.'}/>
                <NewMembers myName={'Miki'} myRole={'Solar Ecplise'} myText={'Showing us how marvelous science can be! So powerful you can not look directly at him!'}/>
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
            **** bottomLeft Here ****
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
