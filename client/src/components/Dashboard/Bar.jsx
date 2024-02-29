/* eslint-disable react/prop-types */
import { BarList, Card } from "@tremor/react";
// import { Squares2X2Icon } from "@heroicons/react/24/solid";

const Bar = ({ products }) => {


  const Data = {};
  products.forEach((product) => {

    const category = product.category;
    if (!Data[category]) {
      Data[category] = 0
    }
    Data[category] += 1;

  })

  const arrayData = Object.entries(Data).map(([key, value]) => (
    {
      name: key.toUpperCase().replaceAll("_", " "),
      value: value
    }
  ))


  return (
    <div className=" my-7 text-black ">
      <Card >
        <h3 className="text-tremor-title text-tremor-content-strong  font-medium">
          Product Count By Categories
        </h3>
        <p className="mt-4 text-tremor-default flex items-center justify-between text-tremor-content dark:text-dark-tremor-content">
          <span>Products</span>
          <span>Count</span>
        </p>
        <BarList color={"blue"} data={arrayData} className="mt-1 " />
      </Card>
    </div >
  );
};




export default Bar;
