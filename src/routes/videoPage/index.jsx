import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { MdThumbUp, MdThumbDown, MdPlaylistAdd } from "react-icons/md";
import ThemeContext from "../../context/ThemeContext";
import Header from "../../components/header";
import SidePanel from "../../components/sidePanel";
import LoaderView from "../../components/loaderView";
import NoVideosView from "../../components/failureView";
import apiStatusConstants from "../../constants/apiStatus";
import MainDiv, {
  StyledButton,
  ButtonText, 
} from "./styledComponents";
import "./index.css";

const ActionButtonComponent = ({ iconType, onClick, text, className, isDark }) => {
  const isActive = className === 'active-action';
  return (
    <StyledButton type="button" onClick={onClick} $isActive={isActive} $isDark={isDark}>
      {iconType}
      <ButtonText>{text}</ButtonText>
    </StyledButton>
  );
};

const VideoComponent = () => {
  const { id } = useParams();
  const {
    isDark,
    toggleLikeId,
    toggleDislikeId,
    addSavedVideo,
    removeSavedVideo,
    likedVideos,
    dislikedVideos,
    savedVideos
  } = useContext(ThemeContext);

  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [videoDetails, setVideoDetails] = useState(null);

  const isLiked = likedVideos.includes(id);
  const isDisliked = dislikedVideos.includes(id);
  const isSaved = savedVideos.some(v => v.id === id);

  const getVideoDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get("jwt_token");
    const url = `https://apis.ccbp.in/videos/${id}`;
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

      const formatted = {
        id: data.video_details.id,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        thumbnailUrl: data.video_details.thumbnail_url,
        channelName: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
        viewCount: data.video_details.view_count,
        publishedAt: data.video_details.published_at,
        description: data.video_details.description,
      };

      setVideoDetails(formatted);
      setApiStatus(apiStatusConstants.success);
    } catch {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  useEffect(() => {
    getVideoDetails();
  }, [id]);

  const onToggleLike = () => {
    toggleLikeId(id);
  };

  const onToggleDislike = () => {
    toggleDislikeId(id);
  };

  const onToggleSave = () => {
    if (isSaved) {
      removeSavedVideo(id);
    } else {
      addSavedVideo(videoDetails);
    }
  };

  const renderLoaderView = () => <LoaderView />;

  const renderFailureView = () => <NoVideosView retry={getVideoDetails} />;

  const renderActions = () => {
    const likeClass = isLiked ? "active-action" : "";
    const dislikeClass = isDisliked ? "active-action" : "";
    const saveClass = isSaved ? "active-action" : "";

    return (
      <MainDiv>
        <ActionButtonComponent
          className={likeClass}
          iconType={<MdThumbUp size={20} />}
          onClick={onToggleLike}
          text="Like"
          isDark={isDark}
        />
        <ActionButtonComponent
          className={dislikeClass}
          iconType={<MdThumbDown size={20} />}
          onClick={onToggleDislike}
          text="Dislike"
          isDark={isDark}
        />
        <ActionButtonComponent
          className={saveClass}
          iconType={<MdPlaylistAdd size={20} />}
          onClick={onToggleSave}
          text={isSaved ? "Saved" : "Save"}
          isDark={isDark}
        />
      </MainDiv>
    );
  };

  const renderSuccessView = () => {
    let embedUrl = videoDetails.videoUrl;
    if (embedUrl.includes("watch?v=")) {
      embedUrl = embedUrl.replace("watch?v=", "embed/");
    }

    return (
      <div className={`video-details-view ${isDark ? "dark" : ""}`}>
        <div className="player-container">
          <iframe
            width="100%"
            height="100%"
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <p className="video-title">{videoDetails.title}</p>
        <div className="video-info-actions-container">
          <p className="video-views-time">
            {videoDetails.viewCount} views • {videoDetails.publishedAt}
          </p>
          {renderActions()}
        </div>
        <hr className="separator" />
        <div className="channel-details-container">
          <img
            src={videoDetails.profileImageUrl}
            alt="channel logo"
            className="channel-profile-img"
          />
          <div className="channel-info">
            <p className="channel-name">{videoDetails.channelName}</p>
            <p className="channel-subscribers">{videoDetails.subscriberCount} subscribers</p>
            <p className="video-description">{videoDetails.description}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoaderView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.success:
        return renderSuccessView();
      default:
        return null;
    }
  };

  return (
    <div className={`home-route-wrapper ${isDark ? "dark" : ""}`} data-testid="videoItemDetails">
      <Header />
      <div className="home-layout-container">
        <SidePanel isDark={isDark} />
        <div className="video-main-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;