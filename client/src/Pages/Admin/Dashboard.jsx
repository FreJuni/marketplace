/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from "react";
import AreaCharts from "../../components/Dashboard/AreaCharts";
import Bar from "../../components/Dashboard/Bar";
import Card from "../../components/Dashboard/Card";
import {
  BanknotesIcon,
  ShoppingCartIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { RotatingLines } from "react-loader-spinner";

const Dashboard = ({ setActiveTab, userCount, isLoading, products, pending, totalProduct, totalSales }) => {

  const [showTotalSales, setShowTotalSales] = useState(false);

  const totalSalesProduct = totalSales.toString();
  const sliceTotalSales = totalSalesProduct.slice(0, 6).concat("..");

  return (
    <section>
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
            <div className="flex  items-center gap-3 mt-3">
              <div className=" w-full" onClick={() => setShowTotalSales(!showTotalSales)}>
                <Card
                  title={"Total Sales"}
                  count={`${totalSalesProduct.length > 6 ? showTotalSales ? totalSalesProduct : sliceTotalSales : totalSalesProduct} MMK`}
                  icon={BanknotesIcon}
                  note={"MMK"}
                />
              </div>
              <div className=" w-full " onClick={() => setActiveTab("3")}>
                <Card
                  title={"Active Users"}
                  count={`${userCount}`}
                  icon={UserGroupIcon}
                  note={"user"}
                />
              </div>
              <div className=" w-full" onClick={() => setActiveTab("2")}>
                <Card
                  title={"Products"}
                  count={`${totalProduct}`}
                  icon={ShoppingCartIcon}
                  note={"item"}
                />
              </div>
              <div className=" w-full" onClick={() => setActiveTab("2")}>
                <Card
                  title={"Pending"}
                  count={pending.length}
                  icon={ShoppingCartIcon}
                  note={"pending"}
                />
              </div>
            </div>
            <div className="mt-3">
              <AreaCharts products={products} />
            </div>
            <div className="mt-3">
              <Bar products={products} />
            </div></>
        )
      }

    </section>
  );
};

export default Dashboard;
