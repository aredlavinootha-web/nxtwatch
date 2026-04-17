import { ThreeDots } from "react-loader-spinner";
import ThemeContext from "../../context/ThemeContext";
import "./index.css";

const LoaderView = () => (
  <ThemeContext.Consumer>
    {({ isDark }) => (
      <div className={`loader-container ${isDark ? "dark" : ""}`}>
        <ThreeDots
          height="50"
          width="50"
          color={isDark ? "#ffffff" : "#000000"}
          ariaLabel="loading"
        />
      </div>
    )}
  </ThemeContext.Consumer>
);

export default LoaderView;