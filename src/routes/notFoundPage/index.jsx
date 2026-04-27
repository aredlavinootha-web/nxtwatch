import { useContext } from "react";

import "./index.css";


const NotFound = () => {
    const {isDark} = useContext(ThemeContext);

    let notFoundImg = isDark ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png" : "https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png";
    
    return (
        <div className="not-found-main-content" data-testid="not-found">
            <div className="not-found-container">
                <img
                    src={notFoundImg}
                    alt="not found"
                    className="not-found-img"
                />
                <h1 className="not-found-heading">Page Not Found</h1>
                <p className="not-found-desc">
                    We are sorry, the page you requested could not be found.
                </p>
            </div>
        </div>
    )
}

export default NotFound
