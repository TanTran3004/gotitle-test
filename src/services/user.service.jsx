import axios from "../ulti/axios/axios";
import authHeader from "./auth-header";
const getAllUsers = () => {
    return axios.get("users", authHeader());
};
const getUserById = (id) => {
    return axios.get(`users/getOne/${id}`, authHeader());
};
const updateUser = (id, data) => {
    return axios.post(`users/update/${id}`, data, authHeader());
};
const removeUser = (id) => {
    return axios.delete(`users/delete/${id}`, authHeader());
};
const createUser = (data) => {
    return axios.post(`users/createUser`, data, authHeader());
};
const getErr = () => {
    return axios.get("users/getError", authHeader());
};
const UserService = {
    getAllUsers,
    getUserById,
    updateUser,
    removeUser,
    createUser,
    getErr,
};

export default UserService;