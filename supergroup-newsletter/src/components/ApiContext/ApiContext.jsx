import React, { createContext, useContext, useState, useEffect } from 'react';
const { REACT_APP_OPENAI_API_KEY } = process.env; // Grabs the AiAPI key from .env file

// Creating the context
const ApiContext = createContext({
  callOpenAiAPI: () => Promise.reject('callOpenAiAPI is not implemented'),
  setMessageToAi: () => {},
  setRoleOfAi: () => {},
  selectedDate: new Date(),
  setSelectedDate: () => {},
  eventsData: []
});

// Export the hook to use the context
export const useApiContext = () => useContext(ApiContext);

// Define a provider component
export const ApiProvider = ({ children }) => {
  // Setting the useStates for the variables we want to send to OpenAiAPI. They are set using useContext.
  const [messageToAi, setMessageToAi] = useState("");
  // Adding this in, but this needs to be flushed out.
  const [roleOfAi, setRoleOfAi] = useState(`
    You are Alex, a witty, clever, and encouraging AI assistant focused on crafting outstanding newsletters for Community, a company revolutionizing company-wide collaboration and decision-making. Your role involves leveraging your sharp sense of humor and creative flair to develop content that resonates with readers, inspires action, and fosters a positive community atmosphere. You provide expertly curated newsletter content that keeps all members of the organization informed, entertained, and motivated.   Your capabilities include writing compelling narratives, personalizing content based on user data, designing visually appealing layouts, and incorporating interactive elements to enrich the reading experience. With each newsletter edition, you aim to strengthen company culture, boost morale, and encourage a collaborative spirit among employees. Your friendly yet professional demeanor helps you connect with readers on a personal level, ensuring that Community's vision of innovation and unity shines through every communication you create.`)

    // This is currently dummy data
    const [eventsData, setEventsData] = useState(
      [
        {eventTitle:"Event1", eventType:"On-Site", eventLocation:"New York City", eventInformation:"This is where the main text will be going", eventDate:"Jan 1, 2024", eventTime:'6:00 PM - 7:30 PM EST', eventImage:'https://media.istockphoto.com/id/474794406/vector/seamless-children-cartoon-space-pattern.jpg?s=612x612&w=0&k=20&c=qSQJm4TrRfSplGmDHccCTCT71Rsg-AsYn6soJu1cd24='},
        {eventTitle:"Event2", eventType:"Remote", eventLocation:"Miami", eventInformation:"Yup, we've got new text here.  San Dimas High School football rules!", eventDate:"Jan 2, 2024", eventTime:'3:00 PM - 4:30 PM EST', eventImage:'https://png.pngtree.com/element_our/20200703/ourmid/pngtree-astronaut-space-moon-cartoon-element-image_2300857.jpg'},
        {eventTitle:"Event3", eventType:"On-Site", eventLocation:"London", eventInformation:"Are you looking at me?  You must be looking at me, I don't see anyone else here.", eventDate:"Jan 3, 2024", eventTime:'5:00 PM - 6:30 PM EST', eventImage:'https://img.freepik.com/free-vector/astronaut-space-cartoon-style_1308-128423.jpg'},
      ]);

    const fetchEventsData = async () => {
      try {
        // Perform the fetch request to get the Events data from the remote database
        // Example:
        // const response = await fetch('https://example.com/api/events');
        // const events = await response.json();
        
        // After fetching the events data, update the state
        // setEventsData(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
  
    useEffect(() => {
      fetchEventsData();
    }, []);

  const callOpenAiAPI = async (contentText) => {
    const APIBody = {
      "messages": [
        {"role": "user", "content": contentText},
        {"role": "system", "content": roleOfAi}
      ],
      "model": "gpt-3.5-turbo",
      "max_tokens": 50,
      "temperature": 0.7, 
    }

    // console.log('Calling the OpenAI API');
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${REACT_APP_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(APIBody)
      });

      if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
      
      const AiAnswer = await response.json(); // Turns the response into a json
      return AiAnswer; // Return the resolved data

    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  useEffect(() => {
    // Set today's date as the initial selected date
    setSelectedDate(new Date());
  }, []);

  return (
    <ApiContext.Provider 
      value={{ 
        callOpenAiAPI, 
        setMessageToAi, 
        setRoleOfAi, 
        selectedDate,
        setSelectedDate,
        eventsData
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};