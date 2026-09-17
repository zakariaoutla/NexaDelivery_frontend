import axiosInstance from "./axiosInstance.js";

export const getMerchantDashboardStats =()=>{
    return axiosInstance.get("/statistics/merchant")
}

export const getDriverDashboardStats = () => {
    return axiosInstance.get("/statistics/driver");
};