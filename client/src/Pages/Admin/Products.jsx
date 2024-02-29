import { RotatingLines } from "react-loader-spinner";
import PaginationCom from "../../components/Pagination/PaginationCom";
import ProductsItems from "./ProductsItems";

/* eslint-disable react/prop-types */
const Products = ({
  products,
  setActiveTab,
  setEditMode,
  setEditProductId,
  getProducts,
  setManageTapKey,
  setPages,
  pages,
  totalCount,
  limitPage,
  isLoading,
}) => {
  return (
    <section>
      <h2 className="text-3xl py-2">Product List</h2>
      {
        isLoading ? <div className=" w-full flex justify-center items-center h-96">
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
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr className="text-center">
                    <th scope="col" className="px-6 py-3 text-left">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Seller
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Sell Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                {products.length > 0 &&
                  products.map((product, i) => {
                    return (
                      <ProductsItems
                        setActiveTab={setActiveTab}
                        key={i}
                        setEditProductId={setEditProductId}
                        product={product}
                        setEditMode={setEditMode}
                        getProducts={getProducts}
                        setManageTapKey={setManageTapKey}
                      />
                    );
                  })}
              </table>
            </div>
            {products.length === 0 && (
              <p className="w-full text-center absolute py-6 text-2xl">
                No products add yet.
              </p>
            )}
            {
              products.length !== 0 && (
                <div className="  w-full flex justify-center py-7">
                  <PaginationCom setPages={setPages} pages={pages} totalCount={totalCount} limitPage={limitPage} />
                </div>
              )
            }
          </>
        )
      }

    </section>
  );
};

export default Products;
