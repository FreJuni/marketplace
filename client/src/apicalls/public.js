import { axiosInstance } from "./instance"

export const getAllProducts = async (payload) => {

    try {
        const response = await axiosInstance.get(`/api/products/?page=${payload}`);
        return response.data;
    } catch (error) {
        return error.message
    }
}

export const getAllProductByFilter = async (key,value) => {
    try {
        const response = await axiosInstance.get(`/api/products/filter?${key}=${value}`)
        return response.data;
    } catch (error) {
        return error.message
    }
}

export const getProductDetail = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/details/${id}`);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const getAllApproveProducts = async () => {
    try {
        const response = await axiosInstance.get(`/api/approve-products`);
        return response.data;
    } catch (error) {
        return error.message;
    }
}
