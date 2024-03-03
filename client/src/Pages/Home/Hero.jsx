/* eslint-disable react-hooks/exhaustive-deps */
import Index from "../../components/HomePage/Index";
import Filter from "../../components/HomePage/Filter";
import Card from "../../components/HomePage/Card";
import { useEffect, useState } from "react"
import { message } from "antd";
import { getAllProducts } from "../../apicalls/public";
import { useDispatch, useSelector } from "react-redux";
import { loaderAction } from "../../store/loaderSlice";
import { RotatingLines } from 'react-loader-spinner'
import { getSavedProducts } from "../../apicalls/product";
import PaginationCom from "../../components/Pagination/PaginationCom";


const Hero = () => {
  const [products, setProducts] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [limitPage, setLimitPage] = useState(0);

  const isLoading = useSelector((state) => state.loader.login);
  const dispatch = useDispatch();

  const getProducts = async () => {
    dispatch(loaderAction.isLoading(true));
    try {
      const response = await getAllProducts(pages);
      setProducts(response.productDoc);
      setLimitPage(response.limitPage);
      setTotalCount(response.totalProduct);
    } catch (error) {
      message.error(error.message);
    }
    dispatch(loaderAction.isLoading(false))
  }

  const getSaveProduct = async () => {
    dispatch(loaderAction.isLoading(true));
    try {
      const response = await getSavedProducts();
      setSavedProducts(response.productDoc);
    } catch (error) {
      message.error(error.message);
    }
    dispatch(loaderAction.isLoading(false))
  }



  useEffect(() => {
    getProducts();
    getSaveProduct();
  }, [pages])

  return (
    <>
      <section>
        <Index setProducts={setProducts} getProducts={getProducts} />
        <Filter setProducts={setProducts} getProducts={getProducts} />
        {isLoading ?
          <div className=" h-72 flex items-center justify-center">
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
          </div>
          : <>
            {
              products.length === 0 && (
                <div className=" pt-7 pb-28">
                  <h2 className=" text-center  font-bold text-xl">There was no products yet.</h2>
                </div>
              )
            }
            <div className=" grid grid-cols-3 mt-5 gap-4 max-w-5xl mx-auto ">
              {
                products.map((product, index) => {
                  return <Card getSaveProduct={getSaveProduct} product={product} key={index} savedProducts={savedProducts} />
                })
              }

            </div>
            {
              products.length > 0 && (
                <div className="  w-full flex justify-center py-7">
                  <PaginationCom setPages={setPages} pages={pages} totalCount={totalCount} limitPage={limitPage} />
                </div>
              )
            }
            <div className=" absolute w-full left-0 my-24 bg-blue-600 text-white">
              <div className=" max-w-4xl text-center py-7 mx-auto">
                <p>At Market Mingle, we believe in the seamless fusion of networking and commerce. Our platform is the ultimate destination for individuals and businesses looking to connect, collaborate, and transact.</p>
                <p className=" pt-2">
                  &copy;{new Date().getFullYear()} Market Mingle. All rights reserved.
                </p>
              </div>
            </div>
          </>
        }

      </section>

    </>

  )
};

export default Hero;



