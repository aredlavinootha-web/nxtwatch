import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import Header from "../header";
import SidePanel from "../sidePanel";
import "./index.css";


const NotFound = () => {
    const {isDark} = useContext(ThemeContext);

    let notFoundImg = isDark ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png" : "https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png";
    
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
    )
}

export default NotFound
