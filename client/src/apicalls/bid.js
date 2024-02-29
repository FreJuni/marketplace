import { axiosInstance } from "./instance"

export const addNewBid = async (values) => {
    try {
        const response =await axiosInstance.post("/add-bid", values);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const getAllBid = async (productId) => {
    try {
        const response = await axiosInstance.get(`/get-bid/${productId}`);
        return response.data;
    } catch (error) {
        return error.message;
    }
}