import React, { useState, useEffect } from 'react';
import "./CheckboxHeaders.css";
import { ReactComponent as UncheckBox} from "../../assets/svgs/uncheck-box.svg";
import {ReactComponent as CheckedBox} from "../../assets/svgs/checked-box.svg";

export default function CheckboxHeaders({ myEvent, myArray=[], myFunction }) {
  
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Check if the id is found in myArray
    const idExists = myArray.some(event => event.id === myEvent.id);

    // Set the state based on whether the id is found or not
    setIsChecked(idExists);
  }, [myArray]);
  
  const handleCheckedBox = () => {
    setIsChecked(!isChecked)
    myFunction(myEvent)
  }

  return(
    <div className="checkbox-container">
      <label key={myEvent.id} className="checkbox-label" >
        <input type="checkbox" className="hidden-checkbox" onChange={handleCheckedBox} checked={isChecked} />
        {isChecked ? <CheckedBox /> : <UncheckBox />}
          <span className="checkbox-textwrapper" >{myEvent.title}</span>
      </label>
    </div>
  )
}