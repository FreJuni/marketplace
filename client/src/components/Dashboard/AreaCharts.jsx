/* eslint-disable react/prop-types */
import { AreaChart } from "@tremor/react";
import { format } from "date-fns";

const AreaCharts = ({products}) => {
  // get data from last week
  const currentDate = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(currentDate.getDate() -7); // last week

  const productDailySellRate = {};

  // calclate products in one week
  products.forEach((product) => {
    const productSellDate = new Date(product.createdAt);

    if(productSellDate <= currentDate && productSellDate >= lastWeek) {
      const formatDate = format(new Date(productSellDate),"dd/MM");
      if(!productDailySellRate[formatDate]) {
        productDailySellRate[formatDate] = 0;
      } 
        productDailySellRate[formatDate] +=1;
    }
  })

  const chardata = Object.keys(productDailySellRate).map((Date) => ({
    date : Date,
    "Product Sell Rate" : productDailySellRate[Date],
  }))
  const customTooltip = (props) => {
    const { payload, active } = props;
    if (!active || !payload) return null;
    return (
      <div className="w-56 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
        {payload.map((category, idx) => (
          <div key={idx} className="flex flex-1 space-x-2.5">
            <div
              className={`flex w-1 flex-col bg-${category.color}-500 rounded`}
            />
            <div className="space-y-1">
              <p className="text-tremor-content">{category.dataKey}</p>
              <p className="font-medium text-tremor-content-emphasis">
                {category.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <>
      <h3 className="text-lg font-medium text-tremor-content-strong">
        Products Sell Rates Per Daily...
      </h3>
      <AreaChart
        className=" h-72"
        index="date"
        data={chardata}
        categories={["Product Sell Rate"]}
        colors={["blue"]}
        yAxisWidth={30}
        customTooltip={customTooltip}
      />
    </>
  );
};

export default AreaCharts;
