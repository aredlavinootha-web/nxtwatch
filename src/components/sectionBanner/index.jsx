import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import "./index.css";


const SectionBanner = ({ icon, heading }) => {
  const { isDark } = useContext(ThemeContext);

  return (
    <div className={`section-banner ${isDark ? "dark" : ""}`}>
      <div className={`section-icon-container ${isDark ? "dark" : ""}`}>
        {icon}
      </div>
      <h1 className="section-heading">{heading}</h1>
    </div>
  );
};

export default SectionBanner;
