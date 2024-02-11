import React, { useState } from "react";
import "./NavBar.css"; // Import your custom CSS file

const Navbar = () => {
  const [clickedIndex, setClickedIndex] = useState(null);

  const handleClick = (index) => {
    setClickedIndex(index === clickedIndex ? null : index);
  };

  // Define an array of nav items
  const navItems = ["Home", "Communities", "Events", "Chats"];

  return (
    <div className="navbar">
      <div className="nav-item">
        <span className="communiti">C</span>
        <span className="highlight"></span>
        <span className="communiti">mmuniti</span>
      </div>
      {/* Map over the navItems array to render each item */}
      {navItems.map((item, index) => (
        <div
          key={index}
          className={`nav-item home${clickedIndex === index ? " clicked" : ""}`}
          onClick={() => handleClick(index)}
        >
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
