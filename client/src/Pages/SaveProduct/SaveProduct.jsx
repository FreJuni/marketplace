import { useEffect, useState } from "react"
import { getSavedProducts } from "../../apicalls/product"
import { message } from 'antd';
import Card from "../../components/HomePage/Card";
import { useDispatch, useSelector } from "react-redux";
import { loaderAction } from "../../store/loaderSlice";
import { RotatingLines } from 'react-loader-spinner'
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const SaveProduct = () => {
    const [savedProducts, getSavedProduct] = useState([]);
    const isLoading = useSelector((state) => state.loader.login);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getProduct = async () => {
        dispatch(loaderAction.isLoading(true));
        try {
            const response = await getSavedProducts();
            if (response.isSucess) {
                getSavedProduct(response.productDoc);
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
        dispatch(loaderAction.isLoading(false))
    }

    useEffect(() => {
        getProduct();
    }, [])


    return (
        <section>
            <div className=" flex justify-between ">
                <h1 className=" text-2xl font-bold text-center">Saved Products List.</h1>
                <ArrowLeftIcon onClick={() => navigate(-1)} width={36} height={36} className=" mt-0 text-blue-600 cursor-pointer" />
            </div>
            {
                isLoading ? <div className=" flex justify-center items-center h-96">
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
                </div> : <>
                    {
                        savedProducts.length === 0 && (
                            <div className=" text-center mt-10">
                                <h2 className=" text-xl font-bold">There was no saved products yet.</h2>
                            </div>
                        )
                    }
                    <div className=" grid grid-cols-4 mt-5 gap-3">
                        {
                            savedProducts && (
                                savedProducts.map((product) => {
                                    return <Card getProduct={getProduct} save={true} key={product.product_id._id} product={product.product_id} />
                                })
                            )
                        }
                    </div>
                </>
            }
        </section>
    )
}

export default SaveProduct