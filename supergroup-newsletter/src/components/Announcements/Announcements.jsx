import React, { useState } from 'react';
import { useApiContext } from '../ApiContext/ApiContext';
import './Announcements.css';

export default function Announcements({
    myImage = '',
    myTitle = 'Announcement',
    myInformation = 'Really Big things happening soon!',
    myId,
    myDate
  }) {
  
  const { handleAnnouncementsDataChange } = useApiContext();  
  // Used for loading time
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  const removeButtonClicked = () => {
    handleAnnouncementsDataChange(myId)
  }

  const calculateDate = (_date) => {
    const currentDate = new Date();
    const postingDate = new Date(_date.seconds * 1000 + _date.nanoseconds / 1000000);

    // Calculating the time difference from Current day to posted time
    const timeDifferenceInMilliseconds = postingDate.getTime() - currentDate.getTime();

    // Checking if the absolute time difference is less than 24 hours
    if (Math.abs(timeDifferenceInMilliseconds) < (1000 * 60 * 60 * 24)) {
      // If the time difference is less than 24 hours, return in hours
      const hoursDifference = Math.abs(Math.round(timeDifferenceInMilliseconds / (1000 * 60 * 60)));
      return `${hoursDifference} hours ago`;
    } else {
      // If the time difference is over 24 hours, return in days
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
