import React, { useState } from 'react';
import './NewsReview.css'

export default function NewsReview(){

const clickButton = () => {
  console.log('clicked')
}
const [mainText, setMainText] = useState(`Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis s`) 
const [newsLetterTitle, setNewsLetterTitle] = useState(`Create Newsletter`)
const [selectedDate, setSelectedDate] = useState(null);

const handleTextChange = (event) => {
  setMainText(event.target.value);
};
const handleTitleChange = (event) => {
  setNewsLetterTitle(event.target.value);
};

return (
  <div className='container'>
    <div className='topContainer'>
      <div className='topLeft'>
        <input className='titleText' value={newsLetterTitle} onChange={handleTitleChange}></input>
        <div className='mainTextContainer'>
        <textarea className='mainText' value={mainText} onChange={handleTextChange}></textarea>
        </div>
      </div>
      <div className='divider'></div>
      <div className='topRight'>
      </div>
    </div>
    <div className='bottomContainer'>
      <div className='bottomLeft'>
        bottomLeft
      </div>
      <div className='dividerBottom'></div>
      <div className='bottomRight'>
        <button className='doneButton' onClick={clickButton}>Continue</button>
      </div>
    </div>
  </div>
)
}
