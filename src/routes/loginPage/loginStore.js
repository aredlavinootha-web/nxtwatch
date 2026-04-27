import { makeAutoObservable } from "mobx";

class LoginStore {
    username = "";
    password = "";
    error = "";
    showPassword = false;
    apiStatus = apiStatusConstants.initial;

    constructor() {
        makeAutoObservable(this);
    }

    setUsername = (text) => {
        this.username = text;
    };

    setPassword = (text) => {
        this.password = text;
    };

    togglePassword = () => {
        this.showPassword = !this.showPassword;
    };

    setApiStatus = (status) => {
        this.apiStatus = status;
    };

    setError = (error) => {
        this.error = error;
    };

    clearError = () => {
        this.error = "";
    };

    login = async () => {
        this.setApiStatus(apiStatusConstants.inProgress);
        this.clearError();

        const url = "https://apis.ccbp.in/login";
        const options = {
            method: "POST",
            body: JSON.stringify({ username: this.username, password: this.password }),
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error_msg || "Login failed");
            }

            Cookies.set("jwt_token", data.jwt_token, { expires: 30 });
            this.setApiStatus(apiStatusConstants.success);
            return { success: true };
        } catch (error) {
            this.setError(error.message);
            this.setApiStatus(apiStatusConstants.failure);
            return { success: false, error: error.message };
        }
    };
}

export const loginStore = new LoginStore();