import React from 'react'
import './LandingPage.css'
import AiInputBox from '../../components/AiInputBox/AiInputBox';
import ConfirmPopup from '../../components/ConfirmPopup/ConfirmPopup';
import NewsReview from '../../components/NewsReview/NewsReview';

export default function LandingPage() {
  return (
    <div>
      {/* <AiInputBox /> */}
      <div className='placeholder'>Community Menu PlaceHolder</div>
      <div className='placeholder2'>Back Button Area Placeholder</div>
      <NewsReview />
      {/* <ConfirmPopup 
        title='You’ve Scheduled a Newsletter!'
        paragraph='The Communiti will be receiving their copy of the newsletter shortly.'
      /> */}
    </div>
  )
}
