import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../../context/ThemeContext";
import Header from "../../components/header";
import VideoCard from "../../components/videoCard";
import LoaderView from "../../components/loaderView";
import FailureView from "../../components/failureView";
import NoVideosView from "../../components/noVideosView";
import { MdClose, MdSearch } from "react-icons/md";
import SidePanel from "../../components/sidePanel";
import BannerComponent from "../../components/banner";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const { isDark } = useContext(ThemeContext);

  const navigate = useNavigate();

  const getVideos = async () => {
    setApiStatus(apiStatusConstants.inProgress);

    const jwtToken = Cookies.get("jwt_token");


    const url = `https://apis.ccbp.in/videos/all?search=${search}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Failed");

      const data = await response.json();

      const formatted = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        channelName: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
        viewCount: each.view_count,
        publishedAt: each.published_at,
      }));

      setVideos(formatted);
      setApiStatus(apiStatusConstants.success);
    } catch {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  const onSearch = () => {
    getVideos();
  };

  const onClearSearch = () => {
    setSearch("");
  };

  const renderContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <LoaderView />;

      case apiStatusConstants.failure:
        return <FailureView retry={getVideos} />;

      case apiStatusConstants.success:
        return videos.length === 0 ? (
          <NoVideosView retry={getVideos} />
        ) : (
          <ul className="videos-list">
            {videos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </ul>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`home-route-wrapper ${isDark ? "dark" : ""}`} data-testid="home">
      <Header />
      <div className="home-layout-container">
        <SidePanel isDark={isDark} />

        <div className="home-main-content">
          <BannerComponent />

          <div className={`home-container ${isDark ? "dark" : ""}`}>
            <div className="search-bar">
              <div className="search-input-container">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search"
                  className="search-input"
                />
                {search && (
                  <button type="button" className="clear-btn" onClick={onClearSearch}>
                    <MdClose size={20} color={isDark ? "#ffffff" : "#606060"} />
                  </button>
                )}
              </div>
              <button type="button" className="search-btn" onClick={onSearch}>
                <MdSearch size={22} color={isDark ? "#ffffff" : "#606060"} />
              </button>
            </div>

            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
export { apiStatusConstants };