import { useEffect, useState, useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import ApiStatusView from "../../components/apiStatusView";
import GameCard from "../../components/gameCard";
import { SiYoutubegaming } from "react-icons/si";
import SectionBanner from "../../components/sectionBanner";
import apiStatusConstants from "../../constants/apiStatus";
import "./index.css";
import gamingStore from "./gamingStore";
import { observer } from "mobx-react-lite";

const Gaming = observer(() => {
  
  const { isDark } = useContext(ThemeContext);

  useEffect(() => {
    gamingStore.getGames();
  }, []);

  const renderSuccessView = () => (
    <ul className="games-list">
      {gamingStore.games.map(game => (
        <GameCard key={game.id} game={game} />
      ))}
    </ul>
  );

  const renderContent = () => (
    <ApiStatusView
      apiStatus={gamingStore.apiStatus}
      onRetry={gamingStore.getGames}
      renderSuccessView={renderSuccessView}
    />
  );

  return (
    <div className="gaming-main-content" data-testid="gaming">
      {gamingStore.apiStatus === apiStatusConstants.success && (
        <SectionBanner
          icon={<SiYoutubegaming size={30} color="#ff0000" />}
          heading="Gaming"
        />
      )}
      <div className="gaming-content-container">
        {renderContent()}
      </div>
    </div>
  );
});

export default Gaming;
