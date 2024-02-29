/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Images from "../../images/photo-1562577308-9e66f0c65ce5.webp"
import { BookmarkIcon, BookmarkSlashIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as Bookmark } from "@heroicons/react/24/solid";
import { savedProduct, unSavedProduct } from "../../apicalls/product";
import { message } from "antd";
import { useSelector } from "react-redux";

const Card = ({ product, save, savedProducts, getProduct }) => {
    const user = useSelector((state) => state.reducer.user.user);

    const savedHandler = async (id) => {
        try {
            const response = await savedProduct(id);
            if (response.isSucess) {
                message.success(response.message);
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    const unSavedHandler = async (id) => {
        try {
            const response = await unSavedProduct(id);
            if (response.isSucess) {
                message.success(response.message);
                getProduct();
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    const isProductSaved = (product) => {
        return savedProducts.some((p) => p.product_id._id === product._id);
    }

    return (
        <div className=" w-full bg-white shadow-sm p-3 rounded-md">
            {
                !product ?
                    `${<div>
                        <h2>No products yet.</h2>
                    </div>}` : (
                        <>   <Link to={`/details/${product._id}`}>
                            {
                                product.images[0] ? (
                                    <img src={product.images[0]} className={` ${save === true && 'h-36'} rounded-md w-full h-40 object-cover`} alt={product.name} />
                                ) : <img src={Images} className={` ${save === true && 'h-36'} w-full rounded-md h-44 object-cover`} alt={product.name} />
                            }
                        </Link>
                            <p className=" bg-blue-600 py-1 px-2 rounded-md w-fit text-white text-xs font-bold mt-2">{product.category.replace("_", " ").toUpperCase()}</p>
                            <div className=" flex justify-between items-center mt-1">
                                <Link to={`/details/${product._id}`}>
                                    <p className={` ${save && " text-[1rem]"} text-xl text-gray-600 font-bold`}>{save ? `${product.name.substring(0, 15)}...` : `${product.name.substring(0, 20)}...`}</p>
                                </Link>
                                {
                                    user ?
                                        save ? <BookmarkSlashIcon onClick={() => unSavedHandler(product._id)} className=" w-5 h-5 cursor-pointer text-blue-600" /> : <>
                                            {isProductSaved(product) ?
                                                <Bookmark onClick={() => message.warning("Product have already saved.")} className=" w-7 h-7 cursor-pointer  text-blue-600" />
                                                : <BookmarkIcon onClick={() => {
                                                    savedHandler(product._id),
                                                        window.location.reload()
                                                }} className=" w-7 h-7 cursor-pointer text-blue-600" />
                                            }
                                        </> : ""
                                }
                            </div>
                            <p className={`text-gray-500 ${save && "text-[.9rem]"} mb-1`}>{save ? product.description.slice(0, 60) : product.description.slice(0, 80)}...</p>
                            <hr />
                            <div className=" mt-2">
                                <p className=" text-end font-bold">{product.price} Kyats</p>
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default Card