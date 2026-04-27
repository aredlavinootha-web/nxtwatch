import { makeAutoObservable } from "mobx";

class NotFoundStore {
    constructor() {
        makeAutoObservable(this);
    }

    getImageUrl(isDark) {
        return isDark 
            ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png" 
            : "https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png";
    }
}

export const notFoundStore = new NotFoundStore();