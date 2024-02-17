import React, { useState } from 'react';
import { useApiContext } from '../ApiContext/ApiContext';
import './Events.css'

export default function Events({
    myImage='https://media.istockphoto.com/id/474794406/vector/seamless-children-cartoon-space-pattern.jpg?s=612x612&w=0&k=20&c=qSQJm4TrRfSplGmDHccCTCT71Rsg-AsYn6soJu1cd24=',
    myUUID,
    myTitle,
    myType,
    myLocation,
    myInfo,
    myDate,
    myTime
  }) {

  const { handleEventsDataChange } = useApiContext();
  
  // Used for loading time  
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const removeButtonClicked = () => {
    handleEventsDataChange(myUUID);
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
        <p className='events-date'>{myDate}</p>
        <p className='events-time'>{myTime}</p>
      </div>
    </div>
  )
}
