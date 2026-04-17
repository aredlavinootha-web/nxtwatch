import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import "./index.css";

const VideoCard = ({ video }) => {
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/videos/${video.id}`);
  };

  return (
    <li className={`video-card ${isDark ? "dark" : ""}`} onClick={onClick}>
      <img src={video.thumbnailUrl} alt="video thumbnail" className="video-thumbnail" />

      <div className="video-details-container">
        <img
          src={video.profileImageUrl}
          alt="channel logo"
          className="channel-logo"
        />

        <div className="video-text-content">
          <p className="video-title">{video.title}</p>
          <p className="channel-name">{video.channelName}</p>
          <p className="views-and-date">
            {video.viewCount} views • {video.publishedAt}
          </p>
        </div>
      </div>
    </li>
  );
};

export default VideoCard;