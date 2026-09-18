import axiosInstance from "./axiosInstance.js";


export const createRating = (
    deliveryId,
    data
) => {
    return axiosInstance.post(
        `/rating/${deliveryId}`,
        data
    );
};


export const getRatingByDelivery = (
    deliveryId
) => {
    return axiosInstance.get(
        `/rating/delivery/${deliveryId}`
    );
};


export const updateRating = (
    ratingId,
    data
) => {
    return axiosInstance.put(
        `/rating/${ratingId}`,
        data
    );
};