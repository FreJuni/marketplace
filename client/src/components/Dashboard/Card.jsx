/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable react-refresh/only-export-components */
import { Badge, Card } from "@tremor/react";
function Cards({ title, count, icon, note }) {
  return (
    <Card className="w-full mt-2 cursor-pointer" decoration="top" decorationColor="blue">
      <div className="flex items-center justify-between">
        <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          {title}
        </h4>
        <Badge
          deltatype="moderateIncrease"
          isinncreasepositive="true"
          size="xs"
          icon={icon}
        >
          {note}
        </Badge>
      </div>
      <p className=" text-tremor-content-strong dark:text-dark-tremor-content-strong text-[1.6rem] font-semibold">
        {count}
      </p>
    </Card>
  );
}

export default Cards;
