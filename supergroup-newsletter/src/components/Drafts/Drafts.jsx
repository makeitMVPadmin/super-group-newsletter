import React from 'react';
import "./Drafts.css";
import { useApiContext } from '../../components/ApiContext/ApiContext';
import { useNavigate } from "react-router-dom"; 

export default function Drafts({draft}) {
  
  const navigate = useNavigate(); 
  // access to the global variables
  const { 
    handleNewsDraftPopulateNewsEditor
  } = useApiContext();
  
  function formatCreatedDate(draft) {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = new Date(draft.createdOn.seconds * 1000).toLocaleDateString('en-US', options);
    
    return formattedDate;
  }

  const handleEditClicked = async () => {
    try {
      await handleNewsDraftPopulateNewsEditor(draft.id); // Wait until handleNewsDraftPopulateNewsEditor is finished
      navigate('/newsEditor'); // Once handleNewsDraftPopulateNewsEditor is finished, perform navigation
    } catch (error) {
      console.error(error); // Handle any errors
    }
  }
  
  return (
    <div index={draft.id} className="draft-item-container">    
        <h5 className="item-title">{draft.title}</h5>
        <h6 className="item-subheader">Saved on: {formatCreatedDate(draft)}</h6>
        <button className='item-button' onClick={handleEditClicked}>Edit</button>
    </div>
  );
}
