import React, { useState } from 'react';
import { useApiContext } from '../ApiContext/ApiContext';
import { db } from '../../firebase-config';
import{ collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AiInputBox() {

  const navigate = useNavigate();

    // Grabs our setters for our 'global' variables
    const { callOpenAiAPI, setMessageToAi, setRoleOfAi, handleAiMessageData, aiMessageData } = useApiContext();
    // Create a useState for our user Input and the handler to keep it up to date.

    const ref = collection(db, "testAiResponse") // create a reference as a collection to db
    
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
    // Handle the button being clicked by user
    const handleClick = () => {
      contactAiAPI()
      setInputValue('') // Resets input for next inquiry
      navigate('/newsEditor');
    }
    // This is where the magic starts, and we call the OpenAi.  See ApiContext.js for more
    const contactAiAPI = async () => {
      try {
        // We pass in the user's input, here will will be adding more variables.
        const data = await callOpenAiAPI(inputValue);
        // Now you can use the response however you would like.
        // console.log('Data:', data);
        handleAiMessageData(data.choices[0].message.content) // This will be the response of the Ai
        
        // create an object of AI response to send back to db
        const dbObj = {
          testAiResponse: data.choices[0].message.content 
        }

        addDoc(ref, dbObj) // sends the data to the db

        setMessageToAi(inputValue); // Update the message
      } catch (error) { console.error('Error:', error); } // Log any errors
    };

    return (
      <div>
        <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={(e) => { if (e.key === 'Enter') {handleClick();} }}
        />
        <button onClick={handleClick}>Call API</button>
      </div>
    );
  }