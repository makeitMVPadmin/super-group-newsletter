import React, { useState } from "react";
import "./NavBar.css"; // Import your custom CSS file

const Navbar = () => {
  const [clickedIndex, setClickedIndex] = useState(null);

  const handleClick = (index) => {
    setClickedIndex(index === clickedIndex ? null : index);
  };

  // Define an array of nav items with their corresponding icons
  const navItems = [
    { name: "Home", iconClass: "icon1" },
    { name: "Communities", iconClass: "icon2" },
    { name: "Events", iconClass: "icon3" },
    { name: "Chats", iconClass: "icon4" },
  ];

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
          className={`nav-item names${clickedIndex === index ? " clicked" : ""}`}
          onClick={() => handleClick(index)}
        >
          <div className="nav-item-content">
            <span className={`${item.iconClass} icon`}></span> {/* Render the icon using the CSS class */}
            <span>{item.name}</span> {/* Render the item text */}
          </div>
        </div>
      ))}
      <div className="nav-item-content">
        <span className="icon icon5"></span>
        <span className="icon icon6"></span>
        <span className="icon icon7"></span>
      </div>
    </div>
  );
};

export default Navbar;
