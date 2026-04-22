import "./index.css";

const FailureView = ({ retry, isDark }) => {
  const failureImageUrl = isDark 
    ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
    : "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png";

  return (
    <div className={`failure-view-container ${isDark ? "dark" : ""}`}>
      <img
        src={failureImageUrl}
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We are having some trouble to complete your request.
        <br />
        Please try again.
      </p>
      <button type="button" className="retry-btn" onClick={retry}>
        Retry
      </button>
    </div>
  );
};

export default FailureView;