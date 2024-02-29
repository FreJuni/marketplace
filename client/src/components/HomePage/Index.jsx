/* eslint-disable react/prop-types */
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import { getAllProductByFilter } from "../../apicalls/public";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { loaderAction } from "../../store/loaderSlice";

const Index = ({ setProducts, getProducts }) => {
    const [searchKey, setSearchKey] = useState("");
    const dispatch = useDispatch();

    const searchHandler = async () => {
        if (searchKey.trim() === "") {
            message.error("Input is empty! Please provide a value.")
            return;
        }
        dispatch(loaderAction.isLoading(true));
        try {
            const response = await getAllProductByFilter("searchKey", searchKey);
            if (response.isSucess) {
                setProducts(response.productDoc);
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
        dispatch(loaderAction.isLoading(false));
    }

    const resetHandler = () => {
        setSearchKey("");
        getProducts();
    }

    return (
        <div className="w-full text-center">
            <h1 className=" text-3xl font-bold text-blue-600">Welcome to the dynamic world of marketing.</h1>
            <p className=" text-lg font-lg text-gray-500 max-w-[550px] mx-auto">Where the dance between buyers and sellers creates a harmonious exchange of value. In this intricate ecosystem!</p>
            <div className=" max-w-md mx-auto pt-2 flex items-center gap-3 ">
                <div className=" w-full relative">
                    <input type="text" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} className=" w-full bg-gray-200 py-1 px-2 focus:outline-none rounded-xl border-none" />
                    <MagnifyingGlassIcon width={36} onClick={searchHandler} className=" text-blue-700 right-0 px-2 pt-[6px] pb-[5.9px] flex justify-center items-cente bg-gray-300 top-0 p-0 rounded-e-xl cursor-pointer absolute font-bold" />
                </div>
                {
                    searchKey && <button className=" border-none text-sm font-bold bg-blue-600 rounded md cursor-pointer p-1 text-white" onClick={resetHandler}>Clear</button>
                }
            </div>
        </div>
    )
}

export default Index;