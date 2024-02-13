import React from 'react'
import './Announcements.css'

export default function Announcements() {
  return (
    <div className='announce-container'>
      <div className='announce-image-container'><img className='announce-image'/></div>
      <div className='announce-text-container'>
        <p className='announce-title'>Lorem ipsum dolor sit amet.</p>
        <p className='announce-mainText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt consectetur adipiscing elit, sed do eiusmod tempor incididun.</p>
      </div>
    </div>
  )
}
