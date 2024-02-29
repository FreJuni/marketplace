import { axiosInstance } from "./instance";

// sell product
export const sellProduct = async (payload) => {
  try {
    const response = await axiosInstance.post("/create-product", payload);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

// get all products
export const getAllProducts = async (page) => {

  try {
    const response = await axiosInstance.get(`/products?productList=${page}`);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

// get old product
export const getOldProduct = async (id) => {
  try {
    const response = await axiosInstance.get(`/product/${id}`);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

// update product
export const updateProduct = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/update-product/${payload.product_id}`,
      payload
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};

// delete product
export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.post(`/delete-product/${id}`);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

// uploadProduct Image
export const uploadProductImages = async (payload) => {
  try {
    const response = await axiosInstance.post(`/upload`, payload, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (err) {
    return err.message;
  }
};

// get saved products
export const getSavedProduct = async (id) => {
  try {
    const response = await axiosInstance.get(`/product-images/${id}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (err) {
    return err.message;
  }
};

// delete product saved
export const deleteSavedImages = async (payload) => {
  try {
    const { productId, imgToDelete } = payload;
    const encodeImgToDelete = encodeURIComponent(imgToDelete);

    const response = await axiosInstance.delete(
      `/products/images/destroy/${productId}/${encodeImgToDelete}`,
      {
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};

// saved products
export const savedProduct = async (productId) => {
  try {
    const response = await axiosInstance.post(`/save-products/${productId}`)
    return response.data;
  } catch (error) {
    return error.message;
  }
}


// saved products
export const getSavedProducts = async () => {
  try {
    const response = await axiosInstance.get(`/save-products/`)
    return response.data;
  } catch (error) {
    return error.message;
  }
}

// unSaved products
export const unSavedProduct = async (id) => {
  try {
    const response = await axiosInstance.post(`/unsave-products/${id}`)
    return response.data;
  } catch (error) {
    return error.message;
  }
}

// unSaved products
export const getPendingProducts = async () => {
  try {
    const response = await axiosInstance.get(`/pending-products`)
    return response.data;
  } catch (error) {
    return error.message;
  }
}
