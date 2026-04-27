import Cookies from "js-cookie";
import JWT_TOKEN from "../constants/cookies";


const getJwtToken = () => {
    return Cookies.get(JWT_TOKEN);
}

const setJwtToken = (token) => {
    Cookies.set(JWT_TOKEN, token, { expires: 30 });
}

const removeJwtToken = () => {
    Cookies.remove(JWT_TOKEN);
}

export { getJwtToken, setJwtToken, removeJwtToken }