/* eslint-disable react/prop-types */
import moment from "moment";
import { Link } from "react-router-dom";
import {
  approveProduct,
  rejectProduct,
  rollBackProduct,
} from "../../apicalls/admin";
import { message } from "antd";

const ProductsItems = ({ product, getProducts }) => {
  const approveHandler = async (productId) => {
    try {
      const response = await approveProduct(productId);
      if (response.isSucess) {
        getProducts();
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const rejectHandler = async (productId) => {
    try {
      const response = await rejectProduct(productId);
      if (response.isSucess) {
        message.success(response.message);
        getProducts();
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const rollBackHandler = async (productId) => {
    try {
      const response = await rollBackProduct(productId);
      if (response.isSucess) {
        message.success(response.message);
        getProducts();
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <tbody className="text-center">
      <tr className="odd:bg-white  even:bg-gray-50  border-b">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left"
        >
          {product.name.substring(0, 20)}...
        </th>
        <td className="px-6 py-4">{product.category}</td>
        <td className="px-6 py-4">{product.seller.name}</td>
        <td className="px-6 py-4">{moment(product.createdAt).format("L")}</td>
        <td className="px-6 py-4">
          {product.status === "pending" && (
            <span className="bg-yellow-400 p-1 text-xs rounded-sm text-white">
              {product.status}
            </span>
          )}
          {product.status === "approve" && (
            <span className="bg-green-400 p-1 text-xs  rounded-sm text-white">
              {product.status}
            </span>
          )}
          {product.status === "reject" && (
            <span className="bg-red-400 p-1 text-xs  rounded-sm text-white">
              {product.status}
            </span>
          )}
        </td>
        <td className="px-6 py-4 flex">
          {product.status === "approve" ? (
            <Link
              className="font-medium px-3 text-blue-600 hover:underline"
              onClick={() => rollBackHandler(product._id)}
            >
              Roll Back
            </Link>
          ) : (
            <Link
              className="font-medium px-3 text-blue-600 hover:underline"
              onClick={() => approveHandler(product._id)}
            >
              Approved
            </Link>
          )}
          {product.status === "reject" ? (
            <Link
              className="font-medium  text-red-600 hover:underline"
              onClick={() => rollBackHandler(product._id)}
            >
              Roll Back
            </Link>
          ) : (
            <Link
              className="font-medium px-3 text-red-600 hover:underline"
              onClick={() => rejectHandler(product._id)}
            >
              Reject
            </Link>
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default ProductsItems;
