import { axiosInstance } from "./instance"

export const notify = async (payload) => {
    try {
        const response =await axiosInstance.post("/notify", payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const getAllNotification = async () => {
    try {
        const response =await axiosInstance.get(`/notification`);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const viewdNotification = async (id) => {
    try {
        const response =await axiosInstance.post(`/read-noti/${id}`);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const deleteNotification = async (id) => {
    try {
        const response =await axiosInstance.delete(`/delete-noti/${id}`);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const deleteAllNotification = async () => {
    try {
        const response =await axiosInstance.delete(`/delete-all-noti`);
        return response.data;
    } catch (error) {
        return error.message;
    }
}


