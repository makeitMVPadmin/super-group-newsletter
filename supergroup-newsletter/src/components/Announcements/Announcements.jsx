import React, { useState } from 'react';
import { useApiContext } from '../ApiContext/ApiContext';
import './Announcements.css';

export default function Announcements({ myAnnouncement={} }) {
  
  const { handleNewsAnnouncementsChange } = useApiContext();  
  // Used for loading time  
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const removeButtonClicked = () => {
    if (window.confirm(`Are you sure you want to remove the ${myAnnouncement.title} Announcement?`)) {
      handleNewsAnnouncementsChange(myAnnouncement)
    }
  }

  const calculateDate = (_date) => {
    // Getting the current date
    const currentDate = new Date();
    
    // Creating a Date object for the input date
    const futureDate = new Date(0); // Initialize as Unix epoch
    futureDate.setUTCSeconds(_date.seconds); // Set seconds from the _date object
    futureDate.setUTCMilliseconds(_date.nanoseconds / 1000000); // Set milliseconds from the _date object
    
    // Calculating the time difference
    const timeDifferenceInMilliseconds = futureDate.getTime() - currentDate.getTime();
    
    // Checking if the absolute time difference is less than a day
    if (Math.abs(timeDifferenceInMilliseconds) < (1000 * 60 * 60 * 24)) {
      // If the time difference is less than a day, calculate and return the difference in hours
      const hoursDifference = Math.abs(Math.round(timeDifferenceInMilliseconds / (1000 * 60 * 60)));
      return `${hoursDifference} hours ago`;
    } else {
      // If the time difference is a day or more, calculate and return the difference in days
      const daysDifference = Math.abs(Math.round(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24)));
      return `${daysDifference} days ago`;
    }
  }
 
  return (
    <div className='announce-container'>
      {/* Added this X so we could remove it from the newsLetter */}
      <button class="announce-circle" onClick={removeButtonClicked}>X</button> 
      <div className='announce-image-container'>
        {!imageLoaded && <img className='announce-image' src="loading-placeholder.jpg" alt="Loading..." />}
          <img
            className='announce-image'
            src={myAnnouncement.photoURL}
            alt="Announcement"
            style={{ display: imageLoaded ? 'block' : 'none' }}
            onLoad={handleImageLoad}
          />
        <div className='announce-title'>
          {myAnnouncement.title}
          <div className='announce-time'>{myAnnouncement.date && calculateDate(myAnnouncement.date)}</div>
        </div>
      </div>
      <div className='announce-text-container'>
        <p className='announce-mainText'>{myAnnouncement.description}</p>
      </div>
    </div>
  );
}
