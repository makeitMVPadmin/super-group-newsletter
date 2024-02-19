import React, { useState } from 'react';
import { useApiContext } from '../ApiContext/ApiContext';
import './Announcements.css';

export default function Announcements({
    myImage = 'https://us.123rf.com/450wm/brgfx/brgfx1902/brgfx190200433/125363630-space-element-in-space-background-illustration.jpg?ver=6',
    myTitle = 'Announcement',
    myInformation = 'Really Big things happening soon!',
    myUUID,
    myDate
  }) {
  
  const { handleAnnouncementsDataChange } = useApiContext();  
  // Used for loading time  
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const removeButtonClicked = () => {
    handleAnnouncementsDataChange(myUUID)
  }

  const calculateDate = (_date) => {
    // Getting the current date
    const currentDate = new Date();
    // Creating a Date object for the input date
    const futureDate = new Date(_date);
  
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
            src={myImage}
            alt="Announcement"
            style={{ display: imageLoaded ? 'block' : 'none' }}
            onLoad={handleImageLoad}
          />
        <div className='announce-title'>
          {myTitle}
          <div className='announce-time'>{calculateDate(myDate)}</div>
        </div>
      </div>
      <div className='announce-text-container'>
        <p className='announce-mainText'>{myInformation}</p>
      </div>
    </div>
  );
}
