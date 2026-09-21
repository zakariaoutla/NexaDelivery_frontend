import axiosInstance from "./axiosInstance.js";

export const getAllVehicles = (
    page = 0,
    size = 10,
    orderBy = "id",
    order = "asc"
) => {
    return axiosInstance.get("/vehicle", {
        params: {
            page,
            size,
            sort: `${orderBy},${order}`,
        },
    });
};

export const getVehicleById = (id) => {
    return axiosInstance.get(`/vehicle/${id}`);
};

export const createVehicle = (data) => {
    return axiosInstance.post(
        "/vehicle",
        data
    );
};

export const updateVehicle = (id, data) => {
    return axiosInstance.put(
        `/vehicle/${id}`,
        data
    );
};

export const deleteVehicle = (id) => {
    return axiosInstance.delete(
        `/vehicle/${id}`
    );
};