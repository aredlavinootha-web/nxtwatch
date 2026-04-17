import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../../context/ThemeContext";
import "./index.css";

const ListVideoCard = ({ video }) => {
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();

  const onClickVideo = () => {
    navigate(`/videos/${video.id}`);
  };

  return (
    <li className={`list-video-card-container ${isDark ? "dark" : ""}`} onClick={onClickVideo}>
      <img 
        src={video.thumbnailUrl} 
        alt="video thumbnail" 
        className="list-video-thumbnail" 
      />
      <div className="list-video-details">
        <p className="list-video-title">{video.title}</p>
        <p className="list-video-channel">{video.channelName}</p>
        <p className="list-video-views-date">
          {video.viewCount} views • {video.publishedAt}
        </p>
      </div>
    </li>
  );
};

export default ListVideoCard;
