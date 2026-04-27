import {makeObservable, observable, action} from "mobx";
import Cookies from "js-cookie";
import apiStatusConstants from "../../constants/apiStatus";
import { setJwtToken } from "../../utils/cookiesUtils";
import {JWT_TOKEN} from "../../constants/cookies";
import { apiCall } from "../../utils/apiUtils";


class LoginStore {
    username = "";
    password = "";
    error = "";
    showPassword = false;
    apiStatus = apiStatusConstants.initial;

    constructor() {
        makeObservable(this, {
            username: observable,
            password: observable,
            error: observable,
            showPassword: observable,
            apiStatus: observable,

            setUsername: action,
            setPassword: action,
            togglePassword: action,
            setApiStatus: action,
            setError: action,
            clearError: action,
            login: action   
        });
    }

    setUsername = (value) => {
        this.username = value;
    };

    setPassword = (value) => {
        this.password = value;
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
            const data = await apiCall(url, options);

            setJwtToken(data.jwt_token);
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