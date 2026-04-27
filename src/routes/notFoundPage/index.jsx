import { useContext } from "react";
import { observer } from "mobx-react-lite";
import ThemeContext from "../../context/ThemeContext";
import SidePanel from "../../components/sidePanel";
import "./index.css";
import Header from "../../components/header";
import { notFoundStore } from "./noFoundImage";

const NotFound = observer(() => {
    const { isDark } = useContext(ThemeContext);

    // Using the store to get the correct image based on the current theme
    const notFoundImg = notFoundStore.getImageUrl(isDark);
    
    return (
        <div className={`not-found-route-wrapper ${isDark ? "dark" : ""}`} data-testid="not-found">
            <Header />
            <div className="not-found-layout-container">
                <SidePanel isDark={isDark} />
                <div className="not-found-main-content">
                    <img src={notFoundImg} alt="not found" className="not-found-img" />
                    <h1 className="not-found-heading">Page Not Found</h1>
                    <p className="not-found-desc">We are sorry, the page you are looking for could not be found.</p>
                </div>
            </div>
        </div>
    );
});

export default NotFound;
