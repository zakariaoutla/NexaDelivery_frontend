import axiosInstance from "./axiosInstance.js";

export const getMerchantDashboardStats =()=>{
    return axiosInstance.get("/statistics/merchant")
}