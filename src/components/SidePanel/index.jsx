import { Link, useLocation } from "react-router-dom";
import { MdHome, MdPlaylistAdd } from "react-icons/md";
import { HiFire } from "react-icons/hi";
import { SiYoutubegaming } from "react-icons/si";
import React from "react";
import ThemeContext from "../../context/ThemeContext";

import "./index.css";

const navItems = [
  { id: 1, name: "Home", path: "/home", icon: <MdHome /> },
  { id: 2, name: "Trending", path: "/trending", icon: <HiFire /> },
  { id: 3, name: "Gaming", path: "/gaming", icon: <SiYoutubegaming /> },
  { id: 4, name: "Saved videos", path: "/saved-videos", icon: <MdPlaylistAdd /> },
];

const SidePanel = () => {
  const { isDark } = React.useContext(ThemeContext);
  const location = useLocation();

  return (
    <div className={`side-panel-container ${isDark ? "dark" : ""}`}>
      <div className="nav-links-container">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`nav-link ${isActive ? "active" : ""} ${isDark ? "dark-theme" : "light-theme"}`}
            >
              <span className={`nav-icon ${isActive ? "active-icon" : ""}`}>
                {item.icon}
              </span>
              <span className={`nav-name ${isActive ? "active-name" : ""}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="contact-us-container">
        <p className="contact-heading">CONTACT US</p>
        <div className="social-icons-container">
          <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png" alt="facebook logo" className="social-icon" />
          <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png" alt="twitter logo" className="social-icon" />
          <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png" alt="linked in logo" className="social-icon" />
        </div>
        <p className="contact-description">
          Enjoy! Now to see your channels and recommendations!
        </p>
      </div>
    </div>
  );
};

export default SidePanel;
