import React, { useState } from 'react';
import { useApiContext } from '../ApiContext/ApiContext';
import './NewMembers.css'

export default function NewMembers({
    myImage='https://www.seekpng.com/png/detail/11-119845_astronaut-icon-png-clip-art-astronaut-helmet.png',
    myName='Name',
    myRole='Role',
    myText='My info will go here.',
    myUUID
  }) {
    
  const { handleNewMembersDataChange } = useApiContext();  
  // Used for loading time  
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const removeButtonClicked = () => {
    if (window.confirm("Are you sure you want to remove this New member?")) {
      handleNewMembersDataChange(myUUID)
    }
  }

  return (
    <div className='newMembers-container'>
      {/* Added this X so we could remove it from the newsLetter */}
      <button class="newMember-circle" onClick={removeButtonClicked}>X</button> 
      {!imageLoaded && <img className='newMember-mainImage' src="loading-placeholder.jpg" alt="Loading..." />}
          <img
            className='newMember-mainImage'
            src={myImage}
            alt="NewMember Image"
            style={{ display: imageLoaded ? 'block' : 'none' }}
            onLoad={handleImageLoad}
          />
          <h4>  
            <span>{myName}</span>
            <span> • </span>
            <span>{myRole}</span>
          </h4>
          <p>{myText}</p>
    </div>
  )
}
