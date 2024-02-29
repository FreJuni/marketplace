/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { getAllApproveProducts, getAllProductByFilter } from "../../apicalls/public"
import { message } from "antd";
import { useDispatch } from "react-redux";
import { loaderAction } from "../../store/loaderSlice";

const Filter = ({ setProducts, getProducts }) => {
    const [productCategory, setProductCategory] = useState([]);
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState("");
    const dispatch = useDispatch();

    const getProduct = async () => {
        try {
            const response = await getAllApproveProducts();
            const category = response.productDoc;
            let productCategories = [];
            category.map((cate) => {
                if (!productCategories.includes(cate.category)) {
                    productCategories.push(cate.category);
                }
            })
            setProductCategory(productCategories);
        } catch (err) {
            message.error(err.message);
        }
    }

    useEffect(() => {
        getProduct();
    }, [])

    const categoryHandler = async (i) => {
        const selectedCategory = productCategory[i];
        setSelectedCategoryIndex(i);
        try {
            dispatch(loaderAction.isLoading(true));
            const response = await getAllProductByFilter("category", selectedCategory);
            if (response.isSucess) {
                setProducts(response.productDoc)
            } else {
                throw new Error(response.message);
            }

        } catch (error) {
            message.error(error.message);
        }
        dispatch(loaderAction.isLoading(false));
    }

    const clearHandler = () => {
        setSelectedCategoryIndex("");
        getProducts();
    }

    return (
        <section className=" flex gap-2 mt-5 mb-10 justify-center max-w-4xl mx-auto flex-wrap">
            {
                productCategory && productCategory.map((cate, i) => {
                    return (
                        <div key={i}>
                            <p onClick={() => categoryHandler(i)} className={`${selectedCategoryIndex === i ? " text-xs  rounded-xl cursor-pointer border border-black select-none text-black py-1 px-2 " : " text-xs bg-blue-600 rounded-xl select-none cursor-pointer py-1 px-2 text-white"}`}>{cate.replace("_", " ").toUpperCase()}</p>
                        </div>

                    )
                })
            }
            {
                selectedCategoryIndex !== "" && <button type="button" className=" text-xs font-bold text-white rounded-md bg-blue-600 cursor-pointer py-1 px-2 " onClick={clearHandler}>Clear</button>
            }
        </section>
    )
}

export default Filter