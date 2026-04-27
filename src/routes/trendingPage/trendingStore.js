import { makeObservable, observable, action, computed } from "mobx";
import apiStatusConstants from "../../constants/apiStatus";
import { getJwtToken } from "../../utils/cookiesUtils";
import { apiCall } from "../../utils/apiUtils";
import VideoDataStore from "./videoDataStore";


class TrendingStore {
  videos = [];
  apiStatus = apiStatusConstants.initial;

  constructor() {
    makeObservable(this, {
      videos: observable,
      apiStatus: observable,
      setVideos: action,
      setApiStatus: action,
      getVideos: action,
    });
  }

  setVideos = (videos) => {
    this.videos = videos;
  };

  setApiStatus = (status) => {
    this.apiStatus = status;
  };

  getVideos = async () => {
    this.setApiStatus(apiStatusConstants.inProgress);

    const jwtToken = getJwtToken();
    const url = "https://apis.ccbp.in/videos/trending";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const data = await apiCall(url, options);

      const formatted = data.videos.map((each) => new VideoDataStore(each));

      this.setVideos(formatted);
      this.setApiStatus(apiStatusConstants.success);
    } catch {
      this.setApiStatus(apiStatusConstants.failure);
    }
  };
}

export default new TrendingStore();
