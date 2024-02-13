import React from 'react'
import './Events.css'

export default function Events() {
  return (
    <div className='events-container'>
      <div className='events-mainImage-container'>
        <div><img className='events-mainImage'/></div>
        <button className='events-button'>Reserve</button>
      </div>
      <div className='events-info'>
        <p className='events-site'>On Site / Miami, FL</p>
        <p className='events-mainText'>"Pitch Night: Lorem ipsum dolor sit amet, consectetur , sed do eiusmod.</p>
        <p className='events-date'>date of event</p>
        <p className='events-time'>Time of event</p>
      </div>
    </div>
  )
}
