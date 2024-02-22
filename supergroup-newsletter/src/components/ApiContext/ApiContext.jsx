import React, { createContext, useContext, useState, useEffect } from 'react';
import { onSnapshot, collection, query, addDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
// import {getStorage, ref} from "../../firebase-config";
const { REACT_APP_OPENAI_API_KEY } = process.env;

// Creating the context
const ApiContext = createContext({
  callOpenAiAPI: () => Promise.reject('callOpenAiAPI is not implemented'),
  setMessageToAi: () => {},
  setRoleOfAi: () => {},
  setIncludeMembers: () => {},
  includeMembers: false,
  selectedDate: new Date(),
  setSelectedDate: () => {},
  
  eventsData: [],
  announcementsData: [],
  newMembersData: [],
  newsDrafts: [],
  currentNewsletter: {},

  handleAiMessageData: () => {},
  aiMessageData: '',

  newsEvents: [],
  newsAnnouncements: [],
  newsNewMembers: [],
  handleNewsEventChange: () => {},
  handleNewsAnnouncementsChange: () => {},
  handleNewsNewMembersChange: () => {},

  writeDataToFirestore: () => {},
  resetDataFromFirestore: () => {},

  handleNewsDraftPopulateNewsEditor: () => {},

  heroImage: [],
  setHeroImage: () =>{}
});

// Export the hook to use the context
export const useApiContext = () => useContext(ApiContext);

// Define a provider component
export const ApiProvider = ({ children }) => {
  // Setting the useStates for the variables we want to send to OpenAiAPI.
  const [messageToAi, setMessageToAi] = useState("");
  const [aiMessageData, setAiMessageData] = useState('')
  const [roleOfAi, setRoleOfAi] = useState(`You are a witty, clever, and encouraging AI assistant focused on crafting outstanding newsletters for Communiti, a company revolutionizing company-wide collaboration and decision-making. Your role involves leveraging your sharp sense of humor and creative flair to develop content that resonates with readers, inspires action, and fosters a positive community atmosphere. You provide expertly curated newsletter content that keeps all members of the organization informed, entertained, and motivated.   Your capabilities include writing compelling narratives, personalizing content based on user data, designing visually appealing layouts, and incorporating interactive elements to enrich the reading experience. With each newsletter edition, you aim to strengthen company culture, boost morale, and encourage a collaborative spirit among employees. Your friendly yet professional demeanor helps you connect with readers on a personal level, ensuring that Community's vision of innovation and unity shines through every communication you create.`)
  const [includeMembers, setIncludeMembers] = useState(true) 

  // Set other useStates
  const [eventsData, setEventsData] = useState([]);
  const [announcementsData, setAnnouncementsData] = useState([])
  const [newMembersData, setNewMembersData] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newsDrafts, setNewsDrafts] = useState([])

  const [newsEvents, setNewsEvents] = useState([])
  const [newsAnnouncements, setNewsAnnouncements] = useState([])
  const [newsNewMembers, setNewsNewMembers] = useState([])
  
  const [heroImage, setHeroImage] = useState('https://firebasestorage.googleapis.com/v0/b/supergroup-2cd54.appspot.com/o/images%2FCapture.PNG?alt=media&token=0dca6cbe-c020-4f7e-83c5-27dc7e778bd6')
  // const [newsletterDrafts, setNewsletterDrafts] = useState([])
  
  // Ok, this is sloppy right now, because I didn't use an object at the start of this code.  Sorry future me.
  const [currentNewsletter, setCurrentNewsletter] = useState({
    heroImage: heroImage,
    messageToAi: messageToAi,
    aiMessageData: aiMessageData,
    includeMembers: includeMembers,
    selectedDate: selectedDate,
    newsEvents: newsEvents,
    newsAnnouncements: newsAnnouncements,
    newsNewMembers: newsNewMembers,
  })

  useEffect(() => {
    setCurrentNewsletter(prevNewsletter => ({
      ...prevNewsletter,
      heroImage: heroImage,
      messageToAi: messageToAi,
      aiMessageData: aiMessageData,
      includeMembers: includeMembers,
      selectedDate: selectedDate,
      newsEvents: newsEvents,
      newsAnnouncements: newsAnnouncements,
      newsNewMembers: newsNewMembers,
    }));
  }, [heroImage, messageToAi, aiMessageData, includeMembers, selectedDate, newsEvents, newsAnnouncements, newsNewMembers]);  
  // END Ok, this is sloppy right now, because I didn't use an object at the start of this code.  Sorry future me.


  // Fetch the information from Firestore backend
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
    });
    return unsubscribe;
  };

  // Write to Firebase backend
  const writeDataToFirestore = ({
    myCollection = 'newsletterDrafts', 
    title = 'My Newsletter', 
    userName = 'Anonymous',
    photoURL = '',
    createdOn = '',
    messageToAi = 'test',
    aiMessageData = 'test123',
    includeMembers = false,
    selectedDate = new Date(),
    newsEvents = [{}],
    newsNewMembers = [{}],
    newsAnnouncements = [{}]
  } = {}) => {
    const docRef = collection(db, myCollection);
    
    // Add a new document to the collection provided
    addDoc(docRef, {
      title: title,
      createdBy: userName,
      photoURL: photoURL,
      selectedDate: selectedDate,
      messageToAi: messageToAi,
      createdOn: createdOn,
      aiMessageData: aiMessageData,
      includeMembers: includeMembers,
      newsEvents: newsEvents,
      newsNewMembers: newsNewMembers,
      newsAnnouncements: newsAnnouncements,
    })
    .then((docRef) => { console.log("Document written with ID: ", docRef.id); })
    .catch((error) => { console.error("Error adding document: ", error); });
  }

  useEffect(() => {
    resetDataFromFirestore()
  }, []);

  useEffect(() => {
    setSelectedDate(new Date()); // Set today's date as the initial selected date
  }, []);

  const resetDataFromFirestore = () => {
        // Sets Entry Point selections
        fetchDataFromFirestore("events", setEventsData)
        fetchDataFromFirestore("announcements", setAnnouncementsData);
        fetchDataFromFirestore("members", setNewMembersData);
        fetchDataFromFirestore("newsletterDrafts", setNewsDrafts);
        //setNewsDrafts
    
    
        // Sets what is passed to newsReview
        fetchDataFromFirestore("events", setNewsEvents)
        fetchDataFromFirestore("announcements", setNewsAnnouncements);
        fetchDataFromFirestore("members", setNewsNewMembers);
  }
  const callOpenAiAPI = async (contentText) => {
    const APIBody = {
      "messages": [
        {"role": "user", "content": contentText},
        {"role": "system", "content": roleOfAi}
      ],
      "model": "gpt-3.5-turbo",
      "max_tokens": 800,
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

  const handleNewsDraftPopulateNewsEditor = (myId) => {
    
    const foundDraft = newsDrafts.find(draft => draft.id === myId);
    if (foundDraft) {
      setCurrentNewsletter(prevState => ({
        ...prevState,
        heroImage: foundDraft.photoURL,
        messageToAi: foundDraft.messageToAi,
        aiMessageData: foundDraft.aiMessageData,
        includeMembers: foundDraft.includeMembers,
        newsEvents: foundDraft.newsEvents,
        newsAnnouncements: foundDraft.newsAnnouncements,
        newsNewMembers: foundDraft.newsNewMembers,
      }));
  
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('No draft found with the provided ID'));
    }
  }

  // Might want to refactor this code into one function instead of three.
  const handleNewsEventChange = (myEvent) => {
    const eventIndex = newsEvents.findIndex(event => event.id === myEvent.id);
  
    if (eventIndex !== -1) {
      // If the event with the same ID already exists, remove it
      const updatedEventsData = newsEvents.filter(event => event.id !== myEvent.id);
      setNewsEvents(updatedEventsData);
    } else {
      // If the event doesn't exist, add it to the array
      const updatedEventsData = [...newsEvents, myEvent];
      setNewsEvents(updatedEventsData);
    }
  }
  const handleNewsAnnouncementsChange = (myAnnouncement) => {
    const announcementIndex = newsAnnouncements.findIndex(announcement => announcement.id === myAnnouncement.id);
  
    if (announcementIndex !== -1) {
      // If the announcement with the same ID already exists, remove it
      const updatedAnnouncementsData = newsAnnouncements.filter(announcement => announcement.id !== myAnnouncement.id);
      setNewsAnnouncements(updatedAnnouncementsData);
    } else {
      // If the announcement doesn't exist, add it to the array
      const updatedAnnouncementsData = [...newsAnnouncements, myAnnouncement];
      setNewsAnnouncements(updatedAnnouncementsData);
    }
  }

  const handleNewsNewMembersChange = (myNewMember) => {
    const memberIndex = newsNewMembers.findIndex(newMember => newMember.id === myNewMember.id);

    if (memberIndex !== -1) {
      // If the member with the same ID already exists, remove it
      const updatedNewMembersData = newsNewMembers.filter(newMember => newMember.id !== myNewMember.id);
      setNewsNewMembers(updatedNewMembersData);
    } else {
      // If the member doesn't exist, add it to the array
      const updatedNewMembersData = [...newsNewMembers, myNewMember];
      setNewsNewMembers(updatedNewMembersData);
    }
  }

  return (
    <ApiContext.Provider 
      value={{ 
        callOpenAiAPI, 
        setMessageToAi, 
        setRoleOfAi,
        setIncludeMembers,
        includeMembers,
        selectedDate,
        setSelectedDate,
        eventsData,
        handleNewsEventChange,
        announcementsData,
        handleNewsAnnouncementsChange,
        newMembersData,
        handleNewsNewMembersChange,
        handleAiMessageData,
        aiMessageData,
        newsEvents,
        newsAnnouncements,
        newsNewMembers,
        heroImage,
        newsDrafts,
        setHeroImage,
        writeDataToFirestore,
        currentNewsletter,
        handleNewsDraftPopulateNewsEditor,
        resetDataFromFirestore
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};