import axiosInstance from "./axiosInstance.js";

export const getMyNotifications = (
    page = 0,
    size = 20,
    sort = "createdAt,desc"
) => {
    return axiosInstance.get(
        "/notifications/me",
        {
            params: {
                page,
                size,
                sort,
            },
        }
    );
};

export const markNotificationAsRead = (id) => {
    return axiosInstance.put(
        `/notifications/${id}/read`
    );
};


export const getMyUnreadCount = () => {
    return axiosInstance.get(
        "/notifications/me/unread-count"
    );
};