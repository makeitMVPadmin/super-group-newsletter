import React, { useState } from "react";
import "./CheckboxHeaders.css";

export default function CheckboxHeaders({title="Title", description="Description"}) {
    const [isChecked, setIsChecked] = useState(false)

    const handleCheckedBox = () => {
        setIsChecked(!isChecked)
    }

    return(
        <div>
            <div>{title}</div>
            <div>
                <label>
                <input type="checkbox" onClick={handleCheckedBox}/>
                <span>{description}</span>
                </label>
            </div>
        </div>
    )
}