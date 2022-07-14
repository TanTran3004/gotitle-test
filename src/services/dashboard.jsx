import axios from "../ulti/axios/axios";
import authHeader from "./auth-header";

const getTotalTitle = () => {
    return axios.get(`titles/totalTitle`, authHeader());
};
const getTotalTitleWithMonth = (data) => {
    return axios.post(`titles/totalTitleWithMonth`, data, authHeader());
};
const chartTitle = (data) => {
    return axios.post(`titles/totalTitleWithEachMonth`, data, authHeader());
};

const getTitleTransaction = (data) => {
    return axios.post(`transaction/getTransWithLastMonth`, data, authHeader());
};
const chartTrans = (data) => {
    return axios.post(`transaction/getTransWithEachMonth`, data, authHeader());
};
const getInvoice = () => {
    return axios.get(`transaction`, authHeader());
};
const getTitleForSale = (data) => {
    return axios.post(`titles/getTitleForSale`, data, authHeader());
};
const getTotalAvailable = (data) => {
    return axios.post(`total`, data, authHeader());
};
const getChartTotal = (data) => {
    return axios.post(`total/getChartTotal`, data, authHeader());
};
const getTitleWork = () => {
    return axios.get(`titles/getTitleWork`, authHeader());
};
const getSubscription = () => {
    return axios.get(`subscriptions`, authHeader());
};
const getTitleInfo = (data) => {
    return axios.post(`titles/getInfo`, data, authHeader());
};
const DashboardService = {
    getTotalTitleWithMonth,
    getTotalTitle,
    chartTitle,
    getTitleTransaction,
    chartTrans,
    getInvoice,
    getTotalAvailable,
    getTitleForSale,
    getChartTotal,
    getTitleWork,
    getSubscription,
    getTitleInfo,
};
export default DashboardService;