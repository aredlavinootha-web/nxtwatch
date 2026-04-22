import { ThreeDots } from "react-loader-spinner";
import "./index.css";

const LoaderView = () => {

    return (
      <div className={`loader-container`}>
        <ThreeDots
          height="50"
          width="50"
          color="#3797f1ff"
          ariaLabel="loading"
        />
      </div>
    )
  };

export default LoaderView;