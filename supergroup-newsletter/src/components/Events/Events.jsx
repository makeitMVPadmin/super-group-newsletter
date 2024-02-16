import React, { useState } from 'react';
import './Events.css'

export default function Events({
    eventImage='https://media.istockphoto.com/id/474794406/vector/seamless-children-cartoon-space-pattern.jpg?s=612x612&w=0&k=20&c=qSQJm4TrRfSplGmDHccCTCT71Rsg-AsYn6soJu1cd24=',
    myId,
    eventTitle,
    eventType,
    eventLocation,
    eventInformation,
    eventDate,
    eventTime
  }) {
  // Used for loading time  
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const removeButtonClicked = () => {
    console.log(myId)
  }
  return (
    <div className='events-container'>
      {/* Added this X so we could remove it from the newsLetter */}
      <button class="events-circle" onClick={removeButtonClicked}>X</button> 
      <div className='events-mainImage-container'>
        {!imageLoaded && <img className='events-mainImage' src="loading-placeholder.jpg" alt="Loading..." />}
          <img
            className='events-mainImage'
            src={eventImage}
            alt="Event Image"
            style={{ display: imageLoaded ? 'block' : 'none' }}
            onLoad={handleImageLoad}
          />
        <button className='events-button'>RSVP</button>
      </div>
      <div className='events-info'>
        <p className='events-site'>{eventType} / {eventLocation}</p>
        <p className='events-title'>{eventTitle}</p>
        <p className='events-mainText'>{eventInformation}</p>
        <p className='events-date'>{eventDate}</p>
        <p className='events-time'>{eventTime}</p>
      </div>
    </div>
  )
}
