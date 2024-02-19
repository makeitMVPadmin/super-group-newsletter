import React from 'react'
import { Link } from 'react-router-dom';
import './ConfirmPopup.css'
import checkMark1 from '../../assets/images/checkMark1.jpg'

export default function ConfirmPopup(
    { 
      title = '',
      paragraph = '',
      buttonText = 'Done'
    }
  ){
  
  const clickButton = () => {
    console.log('clicked')
  }

  return (
    <div className='confirm-container'>
      <div className='confirm-mainText'>{title}</div>
      <div className='confirm-secondaryText'>{paragraph}</div>
      <img className='confirm-checkMark' src={checkMark1} alt="checkMark1" />
      <Link to="/" className='confirm-doneButton'>{buttonText}</Link>
    </div>
  )
}