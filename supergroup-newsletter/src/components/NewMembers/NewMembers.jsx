import React, { useState } from 'react';
import { useApiContext } from '../ApiContext/ApiContext';
import './NewMembers.css'

export default function NewMembers({ myMember }) {
    
  const { handleNewsNewMembersChange } = useApiContext();  
  // Used for loading time  
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const removeButtonClicked = () => {
    if (window.confirm(`Are you sure you want to remove ${myMember.name} from New Members?`)) {
      handleNewsNewMembersChange(myMember)
    }
  }

  return (
    <div className='newMembers-container'>
      {/* Added this X so we could remove it from the newsLetter */}
      <button class="newMember-circle" onClick={removeButtonClicked}>X</button> 
      {!imageLoaded && <img className='newMember-mainImage' src="loading-placeholder.jpg" alt="Loading..." />}
          <img
            className='newMember-mainImage'
            src={myMember.photoURL}
            alt="NewMember Image"
            style={{ display: imageLoaded ? 'block' : 'none' }}
            onLoad={handleImageLoad}
          />
          <h4>  
            <span>{myMember.name}</span>
            <span> • </span>
            <span>{myMember.role}</span>
          </h4>
          <p>{myMember.description}</p>
    </div>
  )
}
