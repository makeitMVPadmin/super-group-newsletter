import React from 'react';
import './BackButton.css';
import { ReactComponent as BackBtn } from "../../assets/svgs/back-btn.svg";

const BackButton = () => {
  const handleBackButtonClicked = () => {
    window.history.back();
  }
  
  return (
    <div className='backButton-container'>
      <div className='backButton-button' onClick={handleBackButtonClicked}>
        <BackBtn />
        <p>Back</p>
      </div>
    </div>
  );
};

export default BackButton;