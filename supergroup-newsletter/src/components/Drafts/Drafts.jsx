import "./Drafts.css";

export default function Drafts({draft}) {
  const handleEditClicked = () => {
    console.log(`Edit was clicked. for ${draft.title}`)
    // This is where we will pass the draft information to the object to fill in newsReview, so we can call up old drafts.
    // This will also need to navigate to /newsReviews
  }
    return(
        <div index={draft.id} className="draft-item-container">    
            <h5 className="item-title">{draft.title}</h5>
            <h6 className="item-subheader">{draft.createdBy}</h6>
            <button className='item-button' onClick={handleEditClicked}>Edit</button>
        </div>
    )
}