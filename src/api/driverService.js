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

export const getMyDriverProfile = () => {
    return axiosInstance.get("/driver/me");
};

export const updateMyDriverStatus = (driverStatus) => {
    return axiosInstance.put(
        "/driver/me/status",
        {
            driverStatus: driverStatus,
        }
    );
};

export const rejectMyDelivery = (deliveryId) => {
    return axiosInstance.put(
        `/delivery/${deliveryId}/reject`
    );
};

export const updateMyDriverProfile = (data) => {
    return axiosInstance.put(
        "/driver/me",
        data
    );
};