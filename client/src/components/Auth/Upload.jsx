/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { message } from "antd";
import {
  deleteSavedImages,
  getSavedProduct,
  uploadProductImages,
} from "../../apicalls/product";

import { loaderAction } from "../../store/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";

const Upload = ({ editProductId, setActiveTab }) => {
  const [previousImage, setPreviousImage] = useState([]);
  const [images, setImages] = useState([]);
  const [savedImages, setSavedImages] = useState([]);
  const [selectedImagesCount, setSelectedImagesCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const isLoading = useSelector((state) => state.loader.login);
  const dispatch = useDispatch();

  const imageHandler = (e) => {
    const selectedImages = e.target.files;
    // distructure images
    let preimages = [...images];

    const isExisted = images.filter((item) => {
      return item.name.toString() === selectedImages[0].name.toString();
    })

    if (isExisted.length > 0) {
      return message.error("Image already selected.")
    }


    if (selectedImages) {
      for (let i = 0; i < selectedImages.length; i++) {
        // to fixed nested array 
        preimages.push(selectedImages[i]);
      }
    }

    setImages(preimages);

    // convert object to array
    const selectedImagesArray = Array.from(selectedImages);

    // update select image count
    setSelectedImagesCount((prev) => prev + selectedImagesArray.length);

    // to show images in ui 
    const previousImage = selectedImagesArray.map((img) => {
      return URL.createObjectURL(img);
    });

    setPreviousImage((prev) => prev.concat(previousImage));
  };

  const deleteHandler = (img) => {

    // find by index
    const indexToDelete = previousImage.findIndex((e) => e === img);

    // to delete previous image
    const productImgDelete = images[indexToDelete];

    // update select image count
    setSelectedImagesCount((prev) => prev - 1);

    if (indexToDelete !== -1) {
      const updatedSelectedImages = [...images];

      // filter product to delete previous image
      const filterProductImages = updatedSelectedImages.filter((product) => product !== productImgDelete);
      setImages(filterProductImages);

      // filter to delete prevoious from ui
      const filterImage = previousImage.filter((image) => image !== img);
      setPreviousImage(filterImage);

      URL.revokeObjectURL(img);
    }

  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (selectedImagesCount >= 2) {
      let formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append("image", images[i]);
      }

      formData.append("product_id", editProductId);
      try {
        dispatch(loaderAction.isLoading(true));
        const response = await uploadProductImages(formData);
        if (response.isSucess) {
          message.success(response.message);
          setActiveTab("1");
        } else {
          throw new Error(response.message);
        }
        dispatch(loaderAction.isLoading(false));
      } catch (error) {
        message.error(error.message);
      }
    } else {
      message.error("Please select atleast two images.");
    }
  };

  const getImages = async (product_id) => {
    setLoading(true);
    try {
      const response = await getSavedProduct(product_id);
      if (response.isSucess) {
        setSavedImages(response.data.images);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getImages(editProductId);
  }, [editProductId]);

  const savedImagesDelete = async (e) => {
    const filerImages = savedImages.filter((ele) => ele !== e);
    setSavedImages(filerImages);
    try {
      const response = await deleteSavedImages({
        productId: editProductId,
        imgToDelete: e,
      });
      if (response.isSucess) {
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-blue-600">
        Upload your product&apos;s image here.
      </h2>
      {
        loading ? <div className=" w-full flex justify-center items-center h-96">
          <RotatingLines
            visible={true}
            height="60"
            width="60"
            color="gray"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
            strokeColor={`#2563EB`}
          />
        </div> : (
          <>
            {savedImages.length > 0 && (
              <div className="my-3">
                <h2 className="text-lg font-bold ">Saved images in cloud.</h2>
                <div className="flex gap-2 pt-2">
                  {savedImages.map((e, index) => {
                    return (
                      <div key={index} className=" basis-1/6 relative">
                        <img
                          src={e}
                          alt={e}
                          className="w-full h-full object-cover rounded-md opacity-65"
                        />
                        <TrashIcon
                          className="absolute top-1/2 left-1/2 text-red-500 z-30 cursor-pointer"
                          width={20}
                          height={20}
                          onClick={() => savedImagesDelete(e)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <form
              method="post"
              onSubmit={submitHandler}
              encType="multipart/form-data"
              className="mt-7"
            >
              <label
                htmlFor="upload"
                className="p-3 text-blue-600 border-2 border-blue-600 border-dashed rounded-sm font-medium cursor-pointer"
              >
                Upload from your device.
              </label>
              <input
                type="file"
                id="upload"
                hidden
                name="image"
                multiple
                accept="image/jpg,image/jpeg,image/png"
                onChange={(e) => imageHandler(e)}
              />
              <div className="flex gap-2 pt-6">
                {previousImage &&
                  previousImage.map((img, i) => {
                    return (
                      <div key={i} className=" basis-1/6 relative">
                        <img
                          className="w-full h-full object-cover rounded-md opacity-65"
                          src={`${img}`}
                          alt="image"
                        />
                        <TrashIcon
                          className="absolute top-1/2 left-1/2 text-red-500 z-30 cursor-pointer"
                          width={20}
                          height={20}
                          onClick={() => deleteHandler(img)}
                        />
                      </div>
                    );
                  })}
              </div>
              {selectedImagesCount > 1 && (
                <button
                  disabled={isLoading && selectedImagesCount < 1}
                  className="block mt-7 bg-blue-600 text-white py-1 px-3 rounded-sm font-bold"
                >
                  {isLoading ? "Uploading ..." : "Upload"}
                </button>
              )}
            </form>
          </>
        )
      }

    </section>
  );
};

export default Upload;
