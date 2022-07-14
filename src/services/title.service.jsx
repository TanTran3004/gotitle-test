import axios from "../ulti/axios/axios";
import authHeader from "./auth-header";

const getAllTitle = () => {
    return axios.get("users/getTitle", authHeader());
};
const createTitle = (data) => {
    return axios.post("users/createTitle", data, authHeader());
};
const TitleService = {
    getAllTitle,
    createTitle,
};

export default TitleService;