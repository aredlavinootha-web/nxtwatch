import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import React, { useState } from "react";

import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

import ThemeContext from "../../context/ThemeContext";
import "./index.css";

const Header = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = React.useContext(ThemeContext);

  const onClickLogo = () => navigate("/");

  const onLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  };

  const logoUrl = isDark
    ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
    : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png";


  const renderLogo = () => (
    <img
      src={logoUrl}
      alt="website logo"
      className="logo"
      onClick={onClickLogo}
    />
  );

  const renderThemeToggle = () => (
    <button
      className="theme-btn"
      onClick={toggleTheme}
      type="button"
    >
      {isDark ? <IoSunny size={22} /> : <FaMoon size={22} />}
    </button>
  );

  const renderProfile = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
      alt="profile"
      className="profile-img"
    />
  );

  const renderLogoutButton = () => (
    <button
      type="button"
      className="logout-btn"
      onClick={onLogout}
    >
      Logout
    </button>
  );

  const renderRightSection = () => (
    <div className="header-right">
      {renderThemeToggle()}
      {renderProfile()}
      {renderLogoutButton()}
    </div>
  );


  return (
    <nav className={`header ${isDark ? "dark" : ""}`}>
      {renderLogo()}
      {renderRightSection()}
    </nav>
  );
};

export default Header;