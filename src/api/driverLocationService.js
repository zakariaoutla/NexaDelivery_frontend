import axiosInstance from "./axiosInstance.js";


export const sendDriverLocation = (
    latitude,
    longitude
) => {
    return axiosInstance.post(
        "/driver-location",
        {
            latitude,
            longitude,
        }
    );
};