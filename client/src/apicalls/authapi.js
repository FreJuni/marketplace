import { axiosInstance } from "./instance";

// register
export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/register", payload);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

// login
export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/login", payload, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (err) {
    return err.message;
  }
};

// check current user
export const checkCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/get-current-user", {
      validateStatus: () => true,
    });
    return response.data;
  } catch (err) {
    return err.message;
  }
};
