import axiosInstance from "./axiosInstance.js";

export const getMyProfile = () => {
    return axiosInstance.get("/merchant/me");
};

export const updateMyProfile = (profileData) => {
    return axiosInstance.put(
        "/merchant/me",
        profileData
    );
};