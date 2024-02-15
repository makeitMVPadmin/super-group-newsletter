import React, { useState } from 'react';
import './Events.css'

export default function Events({
    myImage='https://media.istockphoto.com/id/474794406/vector/seamless-children-cartoon-space-pattern.jpg?s=612x612&w=0&k=20&c=qSQJm4TrRfSplGmDHccCTCT71Rsg-AsYn6soJu1cd24=',
    myId
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
            src={myImage}
            alt="Event Image"
            style={{ display: imageLoaded ? 'block' : 'none' }}
            onLoad={handleImageLoad}
          />
        <button className='events-button'>Reserve</button>
      </div>
      <div className='events-info'>
        <p className='events-site'>On Site / Miami, FL</p>
        <p className='events-mainText'>"Pitch Night: Lorem ipsum dolor sit amet, consectetur , sed do eiusmod.</p>
        <p className='events-date'>date of event</p>
        <p className='events-time'>Time of event</p>
      </div>
    </div>
  )
}
