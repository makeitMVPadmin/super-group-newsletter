import React, { useState } from 'react';
import './Announcements.css';

export default function Announcements({
    myImage = 'https://us.123rf.com/450wm/brgfx/brgfx1902/brgfx190200433/125363630-space-element-in-space-background-illustration.jpg?ver=6',
    myTitle = 'Announcement',
    myMainText = 'Really Big things happening soon!',
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
    <div className='announce-container'>
      {/* Added this X so we could remove it from the newsLetter */}
      <button class="announce-circle" onClick={removeButtonClicked}>X</button> 
      <div className='announce-image-container' style={{ backgroundColor: '#f2f2f2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {!imageLoaded && <img className='announce-image' src="loading-placeholder.jpg" alt="Loading..." />}
        <img
          className='announce-image'
          src={myImage}
          alt="Announcement"
          style={{ display: imageLoaded ? 'block' : 'none' }}
          onLoad={handleImageLoad}
        />
      </div>
      <div className='announce-text-container'>
        <p className='announce-title'>{myTitle}</p>
        <p className='announce-mainText'>{myMainText}</p>
      </div>
    </div>
  );
}
