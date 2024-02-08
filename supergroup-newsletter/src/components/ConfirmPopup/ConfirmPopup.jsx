import React from 'react'
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
    <div className='container'>
      <div className='mainText'>{title}</div>
      <div className='secondaryText'>{paragraph}</div>
      <img className='checkMark' src={checkMark1} alt="checkMark1" />
      <button className='doneButton' onClick={clickButton}>{buttonText}</button>
    </div>
  )
}