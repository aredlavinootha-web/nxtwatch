import { useEffect, useState, useContext } from 'react';
import { HiFire } from "react-icons/hi";
import ThemeContext from "../../context/ThemeContext";
import ListVideoCard from "../../components/listVideoCard";
import ApiStatusView from "../../components/apiStatusView";
import SectionBanner from "../../components/sectionBanner";
import apiStatusConstants from "../../constants/apiStatus";
import "./index.css";
import { observer } from "mobx-react-lite";
import TrendingStore from "./trendingStore";



const TrendingVideos = observer(() => {

    useEffect(() => {
        TrendingStore.getVideos();
    }, []);

    const renderSuccessView = () => (
        <ul className="trending-videos-list">
            {TrendingStore.videos.map(video => (
                <ListVideoCard key={video.id} video={video} />
            ))}
        </ul>
    );

    const renderContent = () => (
        <ApiStatusView
            apiStatus={TrendingStore.apiStatus}
            onRetry={TrendingStore.getVideos}
            renderSuccessView={renderSuccessView}
        />
    );

    return (
        <div className="trending-main-content" data-testid="trending">
            <SectionBanner
                icon={<HiFire size={30} color="#ff0000" />}
                heading="Trending"
            />
            {renderContent()}
        </div>
    );
});

export default TrendingVideos;