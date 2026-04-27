import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import React from "react";

import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

import ThemeContext from "../../context/ThemeContext";
import "./index.css";
import {
  LogoutButton,
  ProfileImg,
  RightSectionDiv,
  LogoImg,
  ThemeToggleButton,
  NavBar,
} from "./styledComponents.ts";

import {JWT_TOKEN} from "../../constants/cookies.js";
import { removeJwtToken } from "../../utils/cookiesUtils.js";


const Header = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = React.useContext(ThemeContext);

  const onClickLogo = () => navigate("/");

  const onLogout = () => {
    removeJwtToken(JWT_TOKEN);
    navigate("/login", { replace: true });
  };

  const logoUrl = isDark
    ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
    : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png";


  const renderLogo = () => (
    <LogoImg
      src={logoUrl}
      alt="website logo"
      onClick={onClickLogo}
    />
  );

  const renderThemeToggle = (isDarkTheme) => (
    <ThemeToggleButton onClick={toggleTheme} type="button" $isDark={isDarkTheme}>
      {isDarkTheme ? <IoSunny size={22} /> : <FaMoon size={22} />}
    </ThemeToggleButton>
  );

  const renderProfile = () => (
    <ProfileImg
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
      alt="profile"
    />
  );

  const renderLogoutButton = () => (
    <LogoutButton type="button" $isDark={isDark} onClick={onLogout}>
      Logout
    </LogoutButton>
  );

  const renderRightSideSection = () => (
    <RightSectionDiv>
      {renderThemeToggle(isDark)}
      {renderProfile()}
      {renderLogoutButton()}
    </RightSectionDiv>
  );


  return (
    <NavBar $isDark={isDark}> 
      {renderLogo()}
      {renderRightSideSection()}
    </NavBar>
  );
};

export default Header;