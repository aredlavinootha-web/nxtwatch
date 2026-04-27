import { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import ThemeContext from "../../context/ThemeContext";
import VideoCard from "../../components/videoCard";
import ApiStatusView from "../../components/apiStatusView";
import NoVideosView from "../../components/noVideosView";
import { MdClose, MdSearch } from "react-icons/md";
import BannerComponent from "../../components/banner";
import apiStatusConstants from "../../constants/apiStatus";
import "./index.css";
import { homeStore } from "./homeStore";


const Home = observer(() => {
  const { isDark } = useContext(ThemeContext);

  useEffect(() => {
    homeStore.getVideos();
  }, []);

  const renderSuccessView = () => {
    return !homeStore.hasVideos ? (
      <NoVideosView retry={() => homeStore.getVideos()} />
    ) : (
      <ul className="videos-list">
        {homeStore.videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </ul>
    );
  };

  const renderContent = () => (
    <ApiStatusView
      apiStatus={homeStore.apiStatus}
      onRetry={() => homeStore.getVideos()}
      renderSuccessView={renderSuccessView}
    />
  );

  return (
    <>
      <BannerComponent />

      <div className={`home-container ${isDark ? "dark" : ""}`}>
        <div className="search-bar">
          <div className="search-input-container">
            <input
              type="text"
              value={homeStore.search}
              onChange={e => homeStore.setSearch(e.target.value)}
              placeholder="Search"
              className="search-input"
            />
            {homeStore.search && (
              <button type="button" className="clear-btn" onClick={() => homeStore.clearSearch()}>
                <MdClose size={20} color={isDark ? "#ffffff" : "#606060"} />
              </button>
            )}
          </div>
          <button type="button" className="search-btn" onClick={() => homeStore.getVideos()}>
            <MdSearch size={22} color={isDark ? "#ffffff" : "#606060"} />
          </button>
        </div>

        {renderContent()}
      </div>
    </>
  );
});

export default Home;