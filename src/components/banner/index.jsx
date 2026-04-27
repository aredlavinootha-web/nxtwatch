import { useState } from "react";
import { MdClose } from "react-icons/md";
import "./index.css";
import {observer} from "mobx-react-lite";
import { homeStore } from "../../routes/homePage/homeStore";

const BannerComponent = observer(() => {    
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

    const bannerCloseIconComponent = () => {
        return (
            <div className="banner-close-container">
                <button 
                    type="button" 
                    className="close-banner-btn" 
                    data-testid="close" 
                    onClick={() => homeStore.setShowBanner()}
                >
                    <MdClose size={24} />
                </button>
            </div>
        )
    }

    return (
        <div className="banner-container">
            {bannerContentComponent()}
            {bannerCloseIconComponent()}
        </div>
    );
});

export default BannerComponent;
