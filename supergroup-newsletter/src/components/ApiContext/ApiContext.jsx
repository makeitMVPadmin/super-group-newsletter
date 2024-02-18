import React, { createContext, useContext, useState, useEffect } from 'react';
import { onSnapshot, collection, query } from "firebase/firestore";
import { db } from "../../firebase-config";
const { REACT_APP_OPENAI_API_KEY } = process.env;

// Creating the context
const ApiContext = createContext({
  callOpenAiAPI: () => Promise.reject('callOpenAiAPI is not implemented'),
  setMessageToAi: () => {},
  setRoleOfAi: () => {},
  selectedDate: new Date(),
  setSelectedDate: () => {},
  eventsData: [],
  handleEventsDataChange: () => {},
  announcementsData: [],
  handleAnnouncementsDataChange: () => {},
  newMembersData: [],
  handleNewMembersDataChange: () => {},
  handleAiMessageData: () => {},
  aiMessageData: ''
});

// Export the hook to use the context
export const useApiContext = () => useContext(ApiContext);

// Define a provider component
export const ApiProvider = ({ children }) => {
  // Setting the useStates for the variables we want to send to OpenAiAPI.
  const [messageToAi, setMessageToAi] = useState("");
  const [aiMessageData, setAiMessageData] = useState('Processing Ai response')
  const [roleOfAi, setRoleOfAi] = useState(`You are Alex, a witty, clever, and encouraging AI assistant focused on crafting outstanding newsletters for Community, a company revolutionizing company-wide collaboration and decision-making. Your role involves leveraging your sharp sense of humor and creative flair to develop content that resonates with readers, inspires action, and fosters a positive community atmosphere. You provide expertly curated newsletter content that keeps all members of the organization informed, entertained, and motivated.   Your capabilities include writing compelling narratives, personalizing content based on user data, designing visually appealing layouts, and incorporating interactive elements to enrich the reading experience. With each newsletter edition, you aim to strengthen company culture, boost morale, and encourage a collaborative spirit among employees. Your friendly yet professional demeanor helps you connect with readers on a personal level, ensuring that Community's vision of innovation and unity shines through every communication you create.`)

  // This is currently dummy data  *************************
  const [eventsData, setEventsData] = useState([]);
  const [announcementsData, setAnnouncementsData] = useState([
    {announcementUUID: 'uuid1', announcementTitle:"Frank had a birthday!", announcementInformation:"He may be the oldest programmer we have, but he is also one of the best!  Go Frank!!", announcementDate:"Jan 6, 2024 12:30:00", announcementImage:"https://us.123rf.com/450wm/brgfx/brgfx1902/brgfx190200433/125363630-space-element-in-space-background-illustration.jpg?ver=6"},
    {announcementUUID: 'uuid2', announcementTitle:"IceCream Party", announcementInformation:"If you really listen to the workers you would know that icecream parties make them feel under appericated.  Workers are not children. Do better.", announcementDate:"Jan 24, 2024 08:10:00", announcementImage:"https://i.etsystatic.com/37965692/r/il/95e562/4333736333/il_794xN.4333736333_h46d.jpg"},
    {announcementUUID: 'uuid3', announcementTitle:"Announcement 3", announcementInformation:"This is where Announcement 3 will have it's information.", announcementDate:"Feb 16, 2024 18:00:00", announcementImage:"https://www.shutterstock.com/image-vector/cute-cartoon-astronaut-holding-space-600nw-2118006137.jpg"},
  ])
  const [newMembersData, setNewMembersData] = useState([
    {newMemberUUID: 'uuid1', newMemberName:"Rooney", newMemberRole:"House Panther", newMemberText:"Like a shadow at midnight, impossible to see unless the moon is high."},
    {newMemberUUID: 'uuid2', newMemberName:"Sheena", newMemberRole:"Dark Cystal", newMemberText:"Mysterious powers both consume light and radiates rays of magical power."},
    {newMemberUUID: 'uuid3', newMemberName:"Miki", newMemberRole:"Solar Ecplise", newMemberText:"Showing us how marvelous science can be! So powerful you can not look directly at him!"},
  ])

  const fetchDataFromFirestore = (collectionName, setData) => {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = query(collectionRef);
    const unsubscribe = onSnapshot(querySnapshot, (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        const item = doc.data();
        data.push({
          id: doc.id,
          ...item,
        });
      });
      setData(data);
      console.log(data)
    });
    return unsubscribe;
  };

  useEffect(() => {
    fetchDataFromFirestore("events", setEventsData)
    fetchDataFromFirestore("announcements", setAnnouncementsData);
    fetchDataFromFirestore("members", setNewMembersData);
  }, []);

  // END This is currently dummy data  *************************

  const fetchData = async () => {
    try {
      // Perform the fetch request to get the data from the remote database
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
    fetchData();
  }, []);

  const [selectedDate, setSelectedDate] = useState(new Date());
  useEffect(() => {
    // Set today's date as the initial selected date
    setSelectedDate(new Date());
  }, []);

  const callOpenAiAPI = async (contentText) => {
    const APIBody = {
      "messages": [
        {"role": "user", "content": contentText},
        {"role": "system", "content": roleOfAi}
      ],
      "model": "gpt-3.5-turbo",
      "max_tokens": 200,
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

  const handleAiMessageData = (aiResponse) => {
    setAiMessageData(aiResponse)
  }

  // Might want to refactor this code into one function instead of three.
  const handleEventsDataChange = (removeEvent) => {
    const updatedEventsData = eventsData.filter(event => event.id !== removeEvent);
    setEventsData(updatedEventsData);
  }
  const handleAnnouncementsDataChange = (removeAnnouncement) => {
    const updatedAnnouncementsData = announcementsData.filter(announcement => announcement.id !== removeAnnouncement);
    setAnnouncementsData(updatedAnnouncementsData);
  }
  const handleNewMembersDataChange = (removeNewMember) => {
    const updatedNewMembersData = newMembersData.filter(newMember => newMember.id!== removeNewMember);
    setNewMembersData(updatedNewMembersData);
  }

  return (
    <ApiContext.Provider 
      value={{ 
        callOpenAiAPI, 
        setMessageToAi, 
        setRoleOfAi, 
        selectedDate,
        setSelectedDate,
        eventsData,
        handleEventsDataChange,
        announcementsData,
        handleAnnouncementsDataChange,
        newMembersData,
        handleNewMembersDataChange,
        handleAiMessageData,
        aiMessageData,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};