import { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import ThemeContext from "../../context/ThemeContext";
import VideoCard from "../../components/videoCard";
import LoaderView from "../../components/loaderView";
import FailureView from "../../components/failureView";
import NoVideosView from "../../components/noVideosView";
import { MdClose, MdSearch } from "react-icons/md";
import SidePanel from "../../components/sidePanel";
import BannerComponent from "../../components/banner";
import apiStatusConstants from "../../constants/apiStatus";
import "./index.css";
import Header from "../../components/header";
import { homeStore } from "./homeStore";


const Home = observer(() => {
  const { isDark } = useContext(ThemeContext);

  useEffect(() => {
    homeStore.getVideos();
  }, []);

  const renderContent = () => {
    switch (homeStore.apiStatus) {
      case apiStatusConstants.inProgress:
        return <LoaderView />;

      case apiStatusConstants.failure:
        // Use an arrow function so we keep the context, or ensure action is bound (which it is)
        return <FailureView retry={() => homeStore.getVideos()} />;

      case apiStatusConstants.success:
        return !homeStore.hasVideos ? (
          <NoVideosView retry={() => homeStore.getVideos()} />
        ) : (
          <ul className="videos-list">
            {homeStore.videos.map(video => (
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
        </div>
      </div>
    </div>
  );
});

export default Home;