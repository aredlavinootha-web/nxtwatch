import { useState } from "react";
import { MdClose } from "react-icons/md";
import "./index.css";

const BannerComponent = () => {
    const [showBanner, setShowBanner] = useState(true);

    if (!showBanner) {
        return null;
    }

    const bannerContentComponent = () => {
        return (
            <div className="banner-content">
                <img 
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" 
                    alt="nxt watch logo" 
                    className="banner-logo" 
                />
                <p className="banner-text">
                    Buy Nxt Watch Premium prepaid plans with UPI
                </p>
                <button type="button" className="get-it-now-btn">
                    GET IT NOW
                </button>
            </div>
        )
    }

    const bannerCloseComponent = () => {
        return (
            <div className="banner-close-container">
                <button 
                    type="button" 
                    className="close-banner-btn" 
                    data-testid="close" 
                    onClick={() => setShowBanner(false)}
                >
                    <MdClose size={24} />
                </button>
            </div>
        )
    }

    return (
        <div className="banner-container">
            {bannerContentComponent()}
            {bannerCloseComponent()}
        </div>
    );
};

export default BannerComponent;
