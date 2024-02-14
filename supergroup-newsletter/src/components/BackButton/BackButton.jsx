import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

const BackButton = () => {
  const navigate = useNavigate();
  const backButtonClicked = () => {
    navigate('/');  // Navigate to / for now.
  }
  
  return (
    <div className='backButton-container'>
      <div className='backButton-button' onClick={backButtonClicked}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="29" viewBox="0 0 32 29" fill="none"><path d="M32 12.772H7.66L18.84 3.1121L16 0.675537L0 14.5L16 28.3245L18.82 25.888L7.66 16.2281H32V12.772Z" fill="#3A3A3A"/></svg>
        <p>Back</p>
      </div>
    </div>
  );
};

export default BackButton;