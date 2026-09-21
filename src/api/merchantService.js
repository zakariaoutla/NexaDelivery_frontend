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


export const getAllMerchants = (
    page = 0,
    size = 10,
    orderBy = "name",
    order = "asc",
    search = ""
) => {
    return axiosInstance.get("/merchant", {
        params: {
            page,
            size,
            sort: `${orderBy},${order}`,
            ...(search.trim() && {
                search: search.trim(),
            }),
        },
    });
};

export const getMerchantById = (id) => {
    return axiosInstance.get(
        `/merchant/${id}`
    );
};

export const updateMerchant = (id, data) => {
    return axiosInstance.put(
        `/merchant/${id}`,
        data
    );
};

export const deleteMerchant = (id) => {
    return axiosInstance.delete(
        `/merchant/${id}`
    );
};