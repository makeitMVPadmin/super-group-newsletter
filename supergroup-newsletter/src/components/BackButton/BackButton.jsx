import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';
import {ReactComponent as BackBtn} from '../../assets/svgs/back-btn.svg';

const BackButton = () => {
  const navigate = useNavigate();
  const backButtonClicked = () => {
    navigate('/');  // Navigate to / for now.
  }
  
  return (
    <div className='backButton-container'>
      <div className='backButton-button' onClick={backButtonClicked}>
        <BackBtn />
        <p>Back</p>
      </div>
    </div>
  );
};

export default BackButton;