import axiosInstance from "./axiosInstance.js";

export const getMyDriverDeliveries = (
    page = 0,
    size = 10,
    orderBy = "id",
    order = "desc"
) => {
    return axiosInstance.get("/delivery/driver", {
        params: {
            page,
            size,
            sort: `${orderBy},${order}`,
        },
    });
};