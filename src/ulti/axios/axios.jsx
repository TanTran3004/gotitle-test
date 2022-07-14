import axios from "axios";
import Config from "src/config/config";

const instance = axios.create({
    baseURL: Config.apiUrl,
});

instance.interceptors.response.use(
    function(response) {
        // response.data = helper(response.data);
        return response;
    },
    function(error) {
        return Promise.reject(error);
    }
);

export default instance;