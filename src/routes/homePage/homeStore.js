import { makeObservable, observable, action, computed } from "mobx";
import Cookies from "js-cookie";
import apiStatusConstants from "../../constants/apiStatus";
import { getJwtToken } from "../../utils/cookiesUtils";
import { apiCall } from "../../utils/apiUtils";

class HomeStore {
  videos = [];
  search = "";
  apiStatus = apiStatusConstants.initial;

  constructor() {
    makeObservable(this, {
      videos: observable,
      search: observable,
      apiStatus: observable,
      setSearch: action,
      clearSearch: action,
      setApiStatus: action,
      setVideos: action,
      getVideos: action,
      hasVideos: computed
    });
  }

  setSearch = (text) => {
    this.search = text;
  };

  clearSearch = () => {
    this.search = "";
  };
  
  setApiStatus = (status) => {
    this.apiStatus = status;
  }
  
  setVideos = (videos) => {
    this.videos = videos;
  }

  getVideos = async () => {
    this.setApiStatus(apiStatusConstants.inProgress);

    const jwtToken = getJwtToken();
    const url = `https://apis.ccbp.in/videos/all?search=${this.search}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const data = await apiCall(url, options);

      const formatted = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        channelName: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
        viewCount: each.view_count,
        publishedAt: each.published_at,
      }));

      this.setVideos(formatted);
      this.setApiStatus(apiStatusConstants.success);
    } catch {
      this.setApiStatus(apiStatusConstants.failure);
    }
  };

  get hasVideos() {
    return this.videos.length > 0;
  }
}

export const homeStore = new HomeStore();
