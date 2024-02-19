import React, { useState } from "react";
import "./CheckboxHeaders.css";
import { ReactComponent as UncheckBox} from "../../assets/svgs/uncheck-box.svg";
import {ReactComponent as CheckedBox} from "../../assets/svgs/checked-box.svg";

export default function CheckboxHeaders({ description, index }) {
    const [isChecked, setIsChecked] = useState(false)

    const handleCheckedBox = () => {
        setIsChecked(!isChecked)
    }


    return(
        <div className="checkbox-container">
                <label key={index} className="checkbox-label" >
                    <input type="checkbox" className="hidden-checkbox" onChange={handleCheckedBox} checked={isChecked} />
                    {isChecked ? <CheckedBox /> : <UncheckBox />}
                        <span className="checkbox-textwrapper" >{description}</span>
                </label>
        </div>
    )
}