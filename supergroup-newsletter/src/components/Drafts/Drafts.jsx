import "./Drafts.css";

export default function Drafts({index, title, createdBy}) {
    return(
        <div index={index} className="draft-item-container">
            
            <h5 className="item-title">{title}</h5>
            <h6 className="item-subheader">{createdBy}</h6>
        </div>
    )
}