import React, { useState } from 'react';
import { useApiContext } from '../ApiContext/ApiContext';
import './Events.css'

export default function Events({
    myImage='',
    myId,
    myTitle='Event',
    myType,
    myLocation,
    myInfo,
    myDate,
    myEndTime
  }) {

  const { handleEventsDataChange } = useApiContext();
  
  // Used for loading time  
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const removeButtonClicked = () => {
    if (window.confirm(`Are you sure you want to remove ${myTitle} from Community Events?`)) {
      handleEventsDataChange(myId);
    }
  }
    
  const formatDateTime = (_date) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const timestamp = (_date.seconds * 1000) + (_date.nanoseconds / 1000000);
    const date = new Date(timestamp);
  
    // Get the individual components of the date (year, month, day, etc.)
    const year = date.getFullYear();
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const monthAbbreviation = monthNames[monthIndex];
  
    // Create the modified dateString with the abbreviated month name
    const dateString = `${monthAbbreviation} ${day} ${year}`;
  
    // Get the individual components of the time (hours, minutes, AM-default)
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let period = "AM";
  
    // Convert to 12-hour format (AM/PM)
    if (hours > 12) {
      hours -= 12;
      period = "PM";
    } else if (hours === 0) {
      hours = 12;
    }
  
    // Create the timeString with the formatted time and period
    const timeString = `${hours}:${String(minutes).padStart(2, '0')} ${period}`;
  
    return { dateString, timeString };
  }
    
  return (
    <div className='events-container'>
      {/* Added this X so we could remove it from the newsLetter */}
      <button class="events-circle" onClick={removeButtonClicked}>X</button> 
      <div className='events-mainImage-container'>
        {!imageLoaded && <img className='events-mainImage' src="loading-placeholder.jpg" alt="Loading..." />}
          <img
            className='events-mainImage'
            src={myImage}
            alt="Event Image"
            style={{ display: imageLoaded ? 'block' : 'none' }}
            onLoad={handleImageLoad}
          />
        <button className='events-button'>RSVP</button>
      </div>
      <div className='events-info'>
        <p className='events-site'>{myType} / {myLocation}</p>
        <p className='events-title'>{myTitle}</p>
        <p className='events-mainText'>{myInfo}</p>
        <p className='events-date'>{formatDateTime(myDate).dateString}</p>
        <p className='events-time'>{formatDateTime(myDate).timeString} - {formatDateTime(myEndTime).timeString}</p>
      </div>
    </div>
  )
}
