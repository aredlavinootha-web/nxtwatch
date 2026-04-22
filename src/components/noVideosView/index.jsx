import "./index.css";


const NoVideosView = ({ retry }) => (
  <div className="no-videos-view-container">
    <img 
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png" 
      alt="no videos" 
      className="no-videos-img"
    />
    <h1 className="no-videos-heading">No Search results found</h1>
    <p className="no-videos-description">Try different key words or remove search filter</p>
    <button type="button" className="retry-btn" onClick={retry}>
      Retry
    </button>
  </div>
);

export default NoVideosView;