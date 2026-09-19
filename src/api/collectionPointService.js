import axiosInstance from "./axiosInstance.js";

export const getMyCollectionPoints = (
    page = 0,
    size = 10,
    sort = "id,desc"
) => {
    return axiosInstance.get("/collection-point/me", {
        params: {
            page,
            size,
            sort,
        },
    });
};

export const createCollectionPoint = (data) => {
    return axiosInstance.post(
        "/collection-point",
        data
    );
};

export const updateCollectionPoint = (
    id,
    data
) => {
    return axiosInstance.put(
        `/collection-point/${id}`,
        data
    );
};

export const deleteCollectionPoint = (id) => {
    return axiosInstance.delete(
        `/collection-point/${id}`
    );
};