import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import "./index.css";

const GameCard = ({ game }) => {
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/videos/${game.id}`);
  };

  return (
    <li className={`game-card ${isDark ? "dark" : ""}`} onClick={onClick}>
      <img src={game.thumbnailUrl} alt="video thumbnail" className="game-thumbnail" />

      <div className="game-details-container">
        <p className="game-title">{game.title}</p>
        <p className="game-views">
          {game.viewCount} Watching Worldwide
        </p>
      </div>
    </li>
  );
};

export default GameCard;
