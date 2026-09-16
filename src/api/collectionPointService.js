import axiosInstance from "./axiosInstance.js";

export const getMyCollectionPoints=()=>{
    return axiosInstance.get("/collection-point/me")
}