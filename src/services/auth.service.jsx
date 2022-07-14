import axios from "../ulti/axios/axios";

const login = (email, password) => {
    return axios.post(`users/login`, { email, password });
};
const logout = () => {
    localStorage.removeItem("token");
};
const AuthService = {
    login,
    logout,
};

export default AuthService;