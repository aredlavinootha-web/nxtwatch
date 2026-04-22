import { useEffect, useState, useContext } from 'react';
import Cookies from "js-cookie";
import { HiFire } from "react-icons/hi";
import ThemeContext from "../../context/ThemeContext";
import Header from "../header";
import SidePanel from "../sidePanel";
import ListVideoCard from "../listVideoCard";
import LoaderView from "../loaderView";
import FailureView from "../failureView";
import "./index.css";
import { apiStatusConstants } from "../homePage";

const TrendingVideos = () => {
    const { isDark } = useContext(ThemeContext);
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
    const [trendingVideos, setTrendingVideos] = useState([]);

    const getTrendingVideos = async () => {
        setApiStatus(apiStatusConstants.inProgress);
        const jwt_token = Cookies.get('jwt_token');

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

    const renderContent = () => {
        switch (apiStatus) {
            case apiStatusConstants.inProgress:
                return <LoaderView />;
            case apiStatusConstants.failure:
                return <FailureView retry={getTrendingVideos} />;
            case apiStatusConstants.success:
                return (
                    <ul className="trending-videos-list">
                        {trendingVideos.map(video => (
                            <ListVideoCard key={video.id} video={video} />
                        ))}
                    </ul>
                );
            default:
                return null;
        }
    };

    return (
        <div className={`trending-route-wrapper ${isDark ? "dark" : ""}`} data-testid="trending">
            <Header />
            <div className="trending-layout-container">
                <SidePanel isDark={isDark} />
                <div className="trending-main-content">
                    <div className="trending-banner">
                        <div className={`icon-container ${isDark ? 'dark' : ''}`}>
                            <HiFire size={30} color="#ff0000" />
                        </div>
                        <h1 className="trending-videos-heading">Trending</h1>
                    </div>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default TrendingVideos;