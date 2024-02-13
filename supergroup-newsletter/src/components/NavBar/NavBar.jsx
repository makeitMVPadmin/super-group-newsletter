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
      <div className="og-navbar">
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
        <div className="small-navbar">
          <div className="nav-item">
            <span className="communiti">C</span>
            <span className="highlight"></span>
            <span className="communiti">mmuniti</span>
          </div>
            <div className="hamburger">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
            </div> 
        </div>
    </div>
  );
};

export default Navbar;
