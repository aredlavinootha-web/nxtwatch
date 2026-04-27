import apiStatusConstants from "../../constants/apiStatus";
import LoaderView from "../loaderView";
import FailureView from "../failureView";

const ApiStatusView = (props) => {
  const { apiStatus, onRetry, renderSuccessView } = props;

  switch (apiStatus) {
    case apiStatusConstants.inProgress:
      return <LoaderView />;
    case apiStatusConstants.failure:
      return <FailureView retry={onRetry} />;
    case apiStatusConstants.success:
      return renderSuccessView();
    default:
      return null;
  }
};

export default ApiStatusView;
