import { useEffect, useState, useContext } from 'react';
import Cookies from "js-cookie";
import { HiFire } from "react-icons/hi";
import ThemeContext from "../../context/ThemeContext";
import Header from "../../components/header";
import SidePanel from "../../components/sidePanel";
import ListVideoCard from "../../components/listVideoCard";
import ApiStatusView from "../../components/apiStatusView";
import SectionBanner from "../../components/sectionBanner";
import apiStatusConstants from "../../constants/apiStatus";
import "./index.css";
import { getJwtToken } from '../../utils/cookiesUtils';

const TrendingVideos = () => {
    const { isDark } = useContext(ThemeContext);
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
    const [trendingVideos, setTrendingVideos] = useState([]);

    const getTrendingVideos = async () => {
        setApiStatus(apiStatusConstants.inProgress);
        const jwt_token = getJwtToken();

        const url = 'https://apis.ccbp.in/videos/trending';
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt_token}`,
            },
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("failed");

            const data = await response.json();

            const formattedData = data.videos.map(video => ({
                id: video.id,
                name: video.channel.name,
                profileImageUrl: video.channel.profile_image_url,
                description: video.description,
                publishedAt: video.published_at,
                thumbnailUrl: video.thumbnail_url,
                title: video.title,
                viewCount: video.view_count,
            }));
            setTrendingVideos(formattedData);
            setApiStatus(apiStatusConstants.success);
        } catch (error) {
            console.log(error);
            setApiStatus(apiStatusConstants.failure);
        }
    };

    useEffect(() => {
        getTrendingVideos();
    }, []);

    const renderSuccessView = () => (
        <ul className="trending-videos-list">
            {trendingVideos.map(video => (
                <ListVideoCard key={video.id} video={video} />
            ))}
        </ul>
    );

    const renderContent = () => (
        <ApiStatusView
            apiStatus={apiStatus}
            onRetry={getTrendingVideos}
            renderSuccessView={renderSuccessView}
        />
    );

    return (
        <div className={`trending-route-wrapper ${isDark ? "dark" : ""}`} data-testid="trending">
            <Header />
            <div className="trending-layout-container">
                <SidePanel isDark={isDark} />
                <div className="trending-main-content">
                <SectionBanner
                    icon={<HiFire size={30} color="#ff0000" />}
                    heading="Trending"
                />
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default TrendingVideos;