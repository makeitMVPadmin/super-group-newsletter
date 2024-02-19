import React from 'react'
import './NewsFooter.css'
import mvpMountain from '../../assets/images/mvpmountainColor.jpg';
import mvpLogo from '../../assets/images/makeitMVPLogo.jpg';
import { ReactComponent as InstagramImage } from "../../assets/svgs/instagram.svg"
import { ReactComponent as Twitter } from "../../assets/svgs/twitter.svg"
import { ReactComponent as LinkedIn } from "../../assets/svgs/linkedin.svg"

export default function NewsFooter() {
  return (
    <div className='footer-container'>
      <img src={mvpLogo} className='footer-mvpLogo'/>
      <p className='footer-helping'>Helping You Turn Your New Skills into a Succesful Career.</p>
      <img src={mvpMountain} className='footer-image'/>
      <div className='footer-ending'>
        <div>          
          <InstagramImage />
          <Twitter />
          <LinkedIn />
        </div>
        <div className='footer-hearFromUs'>

          <p>Want to hear from us again?</p>
          <p><a href="https://www.sendMeHerePlease.com">Click here</a></p>
        </div>
        <p><a href="https://www.UnsubscribeSite.com">Unsubscribe</a></p>
      </div>
    </div>
  )
}