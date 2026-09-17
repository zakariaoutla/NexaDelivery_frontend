import axiosInstance from "./axiosInstance.js";

export const getMydelivery =(page, size, orderBy, order)=>{
    return axiosInstance.get(`/delivery/my-deliveries?page=${page}&size=${size}&sort=${orderBy},${order.toLowerCase()}`)
}

export const createDelivery=(deliveryData)=>{
    return axiosInstance.post("/delivery",deliveryData)
}

export const cancelDelivery = (deliveryId)=>{
    return axiosInstance.put(`/delivery/${deliveryId}/cancel`)
}

export const getMyDeliveryById = (id)=>{
    return axiosInstance.get(`/delivery/${id}/me`)
}

export const updateMyDeliveryStatus = (deliveryId, deliveryStatus) => {
    return axiosInstance.put(
        `/delivery/${deliveryId}/my-status`,
        {
            deliveryStatus: deliveryStatus,
        }
    );
};