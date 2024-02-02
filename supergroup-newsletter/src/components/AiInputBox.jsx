import React, { useState } from 'react';
import { useApiContext } from './ApiContext';

export default function AiInputBox() {
    const [inputValue, setInputValue] = useState('');
    const { callOpenAIAPI, setMessageContent } = useApiContext();
  
    const handleClick = async () => {
      try {
        // Use inputValue when calling the API
        const data = await callOpenAIAPI(inputValue);
        console.log('Data:', data);
        setMessageContent(inputValue); // Update the message content using the context function
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
      // Handler to keep the input value state up-to-date
      const handleInputChange = (event) => {
        setInputValue(event.target.value);
      };
  
    return (
      <div>
        <input type="text" value={inputValue} onChange={handleInputChange}/>
        <button onClick={handleClick}>Call API</button>
      </div>
    );
  }