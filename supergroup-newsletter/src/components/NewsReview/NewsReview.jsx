import React, { useState, useEffect } from 'react';
import './NewsReview.css'
import { useApiContext } from '../ApiContext/ApiContext';
import MyCalendar from '../Calendar/MyCalendar';
import Events from '../Events/Events'
import Announcements from '../Announcements/Announcements'
import BackButton from '../BackButton/BackButton';

export default function NewsReview({
    myImage='https://i.pinimg.com/736x/f2/ea/1b/f2ea1bed3d98acea710c8e58da45e0d6.jpg',
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
              <img
                className='news-heroImage'
                src={myImage}
                alt="Hero Image"
                style={{ display: imageLoaded ? 'block' : 'none' }}
                onLoad={handleImageLoad}
              />
            <p className='news-date'>{selectedDate.toDateString()}</p>
            <div className='news-mainTextContainer'>
              {editMainText ? (
                <textarea className='news-mainText' value={mainText} onChange={handleTextChange}></textarea>
                ) : (<div>{mainText}</div>)}
              </div>
              <h4>Weekly Community Events</h4>
            <div className='news-EventsContainer'>
              <Events />
              <Events />
            </div>
            <h4>Announcements!</h4>
            <div className='news-Announcements-container'>
              <Announcements />
              <Announcements />
              <Announcements />
            </div>
          </div>

          <div className='news-divider'></div>
          <div className='news-topRight'>
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
            <button className='news-doneButton' onClick={clickButton}>Continue</button>
          </div>
        </div>
      </div>
    </div>
  )
}
