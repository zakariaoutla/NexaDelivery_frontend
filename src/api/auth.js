import axiosInstance from "./axiosInstance.js";

export const postDriver= (data)=>{
    return axiosInstance.post("/auth/register/driver",data)
}

export const postMerchant = (data)=>{
    return axiosInstance.post("/auth/register/merchant", data)
}

export const postLogin = (data) =>{
    return axiosInstance.post("/auth/login", data)
}