import React, { useState, useEffect } from 'react';
import './ConfirmPopup.css'
import checkMark1 from '../../assets/images/checkMark1.jpg'
import { useApiContext } from '../ApiContext/ApiContext'; 
import { useNavigate } from "react-router-dom";

export default function ConfirmPopup(
    { 
      title = `You've Scheduled a Newsletter!`,
      date = 'Jan 1',
      time = '7:30 pm',
      paragraph = ``,
      buttonText = 'Done'
    }
  ){
    
  const navigate = useNavigate(); 
  const { selectedDate, resetDataFromFirestore } = useApiContext();
  const [myTime, setMyTime] = useState(selectedDate.toDateString())
  const [myParaGraph, setMyParaGraph] = useState(`The Communiti will be receiving their copy of the newsletter on ${myTime}.`)
  
  const clickButton = () => {
    resetDataFromFirestore()
    navigate('/');
  }

  return (
    <div className='confirm-container'>
      <div className='confirm-mainText'>{title}</div>
      <div className='confirm-secondaryText'>{myParaGraph}</div>
      <img className='confirm-checkMark' src={checkMark1} alt="checkMark1" />
      <button className='confirm-doneButton' onClick={clickButton}>{buttonText}</button>
    </div>
  )
}