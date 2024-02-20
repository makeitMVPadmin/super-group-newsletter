import React, { useState } from 'react';
import './AIinputBox.css'
import { useApiContext } from '../ApiContext/ApiContext';
import { db } from '../../firebase-config';
import{ collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; 
import { connectStorageEmulator } from 'firebase/storage';

export default function AiInputBox() {

  const navigate = useNavigate(); 

    // Grabs our setters for our 'global' variables
    const { 
      callOpenAiAPI, 
      setMessageToAi, 
      setRoleOfAi, 
      handleAiMessageData,
      aiMessageData, 
      newsEvents,
      newsAnnouncements,
      newsNewMembers,
      includeMembers,
    } = useApiContext();
    // Create a useState for our user Input and the handler to keep it up to date.

    const ref = collection(db, "testAiResponse") // create a reference as a collection to db
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
    // Handle the button being clicked by user
    const handleClick = () => {
      handleAiMessageData('')
      contactAiAPI()
      setInputValue('') // Resets input for next inquiry
      navigate('/newsEditor');
    }
    // This is where the magic starts, and we call the OpenAi.  See ApiContext.js for more
    const contactAiAPI = async () => {
      try {
        let extraEventInfo = 'In a happy tone, write a newsletter for the following in under 300 words.'
        newsEvents.map(event => {
          extraEventInfo += `Event Name: ${event.title}, Location: ${event.location}, Description: ${event.description} \n`;
        });
        newsAnnouncements.map(announcement => {
          extraEventInfo += `Annoucnement Name: ${announcement.title}, Description: ${announcement.description} \n`;
        });
        if(includeMembers) {
          newsNewMembers.map(event => {
            extraEventInfo += `New Member Name: ${event.name}, Role: ${event.role} \n`;
          });
        }
        extraEventInfo += 'Always end with a not to check out information below. Please do not sign your name or say anything like best regards.'

        const fullMessage = extraEventInfo + inputValue
        // We pass in the user's input, here will will be adding more variables.
        const data = await callOpenAiAPI(fullMessage);
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
        <form onSubmit={handleClick} className="ai-input">
          <textarea className="ai-textarea" value={inputValue} onChange={handleInputChange} placeholder="Example: Hi! Can you mention that Valentine's Day is coming up? You don't need to include the events that I've selected. Can you also share that there will be a fun giveaway coming up in two weeks and to stay tuned?"></textarea>
          <div className="generate-btn-container">
              <button className="generate-btn" type="submit">Generate Newsletter</button>
          </div>
        </form>
      </div>
    );
  }