import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import ThemeContext from "../../context/ThemeContext";
import Header from "../header";
import SidePanel from "../sidePanel";
import LoaderView from "../loaderView";
import FailureView from "../failureView";
import GameCard from "../gameCard";
import { SiYoutubegaming } from "react-icons/si";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const Gaming = () => {
  const [games, setGames] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const { isDark } = useContext(ThemeContext);

  const getGames = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get("jwt_token");

    const url = `https://apis.ccbp.in/videos/gaming`;
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
        viewCount: each.view_count,
      }));

      setGames(formatted);
      setApiStatus(apiStatusConstants.success);
    } catch {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  const renderContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <LoaderView />;

      case apiStatusConstants.failure:
        return <FailureView retry={getGames} />;

      case apiStatusConstants.success:
        return (
          <ul className="games-list">
            {games.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </ul>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`gaming-route-wrapper ${isDark ? "dark" : ""}`} data-testid="gaming">
      <Header />
      <div className="gaming-layout-container">
        <SidePanel isDark={isDark} />

        <div className="gaming-main-content">
          {apiStatus === apiStatusConstants.success && (
            <div className={`gaming-header-banner ${isDark ? 'dark' : ''}`}>
              <div className={`gaming-icon-container ${isDark ? 'dark' : ''}`}>
                <SiYoutubegaming size={30} color="#ff0000" />
              </div>
              <h1 className="gaming-heading">Gaming</h1>
            </div>
          )}
          <div className="gaming-content-container">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gaming;
