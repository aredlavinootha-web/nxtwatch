import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import { HiFire } from "react-icons/hi";
import Header from "../../components/header";
import SidePanel from "../../components/sidePanel";
import ListVideoCard from "../../components/listVideoCard";
import SectionBanner from "../../components/sectionBanner";
import "./index.css";


const SavedVideos = () => {
  const { isDark, savedVideos } = useContext(ThemeContext);

  const renderNoVideosView = () => (
    <div className="no-saved-videos-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
        className="no-saved-img"
      />
      <h1 className="no-saved-heading">No saved videos found</h1>
      <p className="no-saved-desc">You can save your videos while watching them</p>
    </div>
  );

  return (
    <div className={`saved-route-wrapper ${isDark ? "dark" : ""}`} data-testid="savedVideos">
      <Header />
      <div className="saved-layout-container">
        <SidePanel isDark={isDark} />
        <div className="saved-main-content">
          {savedVideos.length > 0 ? (
            <>
              <SectionBanner
                icon={<HiFire size={30} color="#ff0000" />}
                heading="Saved Videos"
              />
              <ul className="saved-videos-list">
                {savedVideos.map(video => (
                  <ListVideoCard key={video.id} video={video} />
                ))}
              </ul>
            </>
          ) : (
            renderNoVideosView()
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedVideos;
