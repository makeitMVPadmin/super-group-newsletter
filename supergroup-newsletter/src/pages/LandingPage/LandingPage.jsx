import React from 'react'
import AiInputBox from '../../components/AiInputBox/AiInputBox';
// import ConfirmPopup from '../../components/ConfirmPopup/ConfirmPopup';
import NewsReview from '../../components/NewsReview/NewsReview';
import './LandingPage.css'

export default function LandingPage() {
  return (
    <div>
      <AiInputBox />
      <NewsReview />
      {/* <ConfirmPopup 
        title='You’ve Scheduled a Newsletter!'
        paragraph='The Communiti will be receiving their copy of the newsletter shortly.'
      /> */}
    </div>
  )
}
