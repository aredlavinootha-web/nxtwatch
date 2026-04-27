import { makeObservable, observable, action, computed } from "mobx";
import apiStatusConstants from "../../constants/apiStatus";
import { getJwtToken } from "../../utils/cookiesUtils";
import { apiCall } from "../../utils/apiUtils";

class GamingStore {
    games = [];
    apiStatus = apiStatusConstants.initial;

    constructor() {
        makeObservable(this, {
            games: observable,
            apiStatus: observable,
            setGames: action,
            setApiStatus: action,
            getGames: action,
        });
    }

    setGames = (games) => {
        this.games = games;
    }

    setApiStatus = (status) => {
        this.apiStatus = status;
    }

    getGames = async () => {
        this.setApiStatus(apiStatusConstants.inProgress);
        const jwtToken = getJwtToken();

        const url = `https://apis.ccbp.in/videos/gaming`;
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
                viewCount: each.view_count,
            }));

            this.setGames(formatted);
            this.setApiStatus(apiStatusConstants.success);
        } catch {
            this.setApiStatus(apiStatusConstants.failure);
        }
    }
}


export default new GamingStore();
