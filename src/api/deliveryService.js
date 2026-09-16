import axiosInstance from "./axiosInstance.js";

export const getMydelivery =(page, size, orderBy, order)=>{
    return axiosInstance.get(`/delivery/my-deliveries?page=${page}&size=${size}&sort=${orderBy},${order.toLowerCase()}`)
}