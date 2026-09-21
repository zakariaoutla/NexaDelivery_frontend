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

export const getAllDrivers = (
    page = 0,
    size = 10,
    orderBy = "name",
    order = "asc",
    search = "",
    status = ""
) => {
    return axiosInstance.get("/driver", {
        params: {
            page,
            size,
            sort: `${orderBy},${order}`,
            ...(search.trim() && {
                search: search.trim(),
            }),
            ...(status && status !== "ALL" && {
                status: status,
            }),
        },
    });
};


export const updateDriver = (id, data) => {
    return axiosInstance.put(
        `/driver/${id}`,
        data
    );
};

export const deleteDriver = (id) => {
    return axiosInstance.delete(
        `/driver/${id}`
    );
};

export const updateDriverStatus = (
    id,
    driverStatus
) => {
    return axiosInstance.put(
        `/driver/${id}/status`,
        {
            driverStatus,
        }
    );
};

export const assignVehicleToDriver = (
    driverId,
    vehicleId
) => {
    return axiosInstance.put(
        `/driver/${driverId}/vehicle/${vehicleId}`
    );
};

export const getDriverById = (id) => {
    return axiosInstance.get(
        `/driver/${id}`
    );
};