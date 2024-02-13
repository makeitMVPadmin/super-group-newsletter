import React, { useState, useEffect } from 'react';
import './NewsReview.css'
import { useApiContext } from '../ApiContext/ApiContext';
import MyCalendar from '../Calendar/MyCalendar';
import Events from '../Events/Events'
import Announcements from '../Announcements/Announcements'

export default function NewsReview(){
  const { selectedDate } = useApiContext();

  const clickButton = () => {
    console.log(selectedDate)
  }

  const [mainText, setMainText] = useState(`Main Text; as;dlkfj ;asdfkja ;sdfkj as;dflkj asdf;lkajsdf ;alskdjf ;aslkdfj ;alsdfkj a;sdfkj a;sdfkja;sdlfkj a;sdflkjas;df kasd;f ;asldkj f;asd kfja;lsdfkj a;sdf a;sdlfjk as;dfkj `) 
  const [editMainText, setEditMainText] = useState(false)
  const [newsLetterTitle, setNewsLetterTitle] = useState(``)

  const handleTextChange = (event) => {
    setMainText(event.target.value);
  };
  const handleTitleChange = (event) => {
    setNewsLetterTitle(event.target.value);
  };

  return (
    <div className='news-container'>
      <div className='news-topContainer'>


        <div className='news-topLeft'>
          <img className='news-heroImage'/>
          <p className='news-date'>{selectedDate.toDateString()}</p>
          {/* <input className='news-titleText' value={newsLetterTitle} onChange={handleTitleChange}></input> */}
          <div className='news-mainTextContainer'>
          {editMainText ? (
            <textarea className='news-mainText' value={mainText} onChange={handleTextChange}></textarea>
            ) : (<div>{mainText}</div>)}
          </div>
          <p>Weekly Community Events</p>
          <div className='news-EventsContainer'>
            <Events />
          </div>
          <p>Announcements!</p>
          <div className='news-Announcements-container'>
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
          <button className='news-doneButton' onClick={clickButton}>Continue</button>
        </div>
      </div>
    </div>
  )
}
