
import { axiosInstance } from "./instance";

// get all products
export const getAllProducts = async (page) => {
  try {
    const response = await axiosInstance.get(`/admin/products?productList=${page}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (err) {
    return err.message;
  }
};

// approve product
export const approveProduct = async (productId) => {
  try {
    const response = await axiosInstance.post(
      `/admin/product-approve/${productId}`,
      {
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};

// reject product
export const rejectProduct = async (productId) => {
  try {
    const response = await axiosInstance.post(
      `/admin/product-reject/${productId}`,
      {
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};

// rollback product
export const rollBackProduct = async (productId) => {
  try {
    const response = await axiosInstance.post(
      `/admin/product-rollback/${productId}`,
      {
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};

// get users
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get(`/admin/users`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (err) {
    return err.message;
  }
};

// ban user
export const banUser = async (userId) => {
  try {
    const response = await axiosInstance.post(`/admin/users-ban/${userId}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// unban user
export const unbanUser = async (userId) => {
  try {
    const response = await axiosInstance.post(`/admin/users-unban/${userId}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};
