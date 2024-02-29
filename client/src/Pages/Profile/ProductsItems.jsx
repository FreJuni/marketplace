/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import moment from "moment";
import { deleteProduct } from "../../apicalls/product";
import { message } from "antd";

const ProductsItems = ({
  product,
  setActiveTab,
  setEditMode,
  setEditProductId,
  getProduct,
  setManageTapKey,
}) => {
  const editHandler = (id) => {
    setActiveTab("2");
    setEditMode(true);
    setEditProductId(id);
  };

  const deleteHandler = async (id) => {
    try {
      const response = await deleteProduct(id);
      if (response.isSucess) {
        getProduct();
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const uploadHandler = (id) => {
    setActiveTab("2");
    setManageTapKey("2");
    setEditMode(true);
    setEditProductId(id);
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
        <td className="px-6 py-4">{moment(product.createdAt).format("L")}</td>
        <td className="px-6 py-4">
          {product.status === "pending" && (
            <span className="bg-yellow-400 p-1 text-xs rounded-md text-white">
              {product.status}
            </span>
          )}
          {product.status === "approve" && (
            <span className="bg-green-400 p-1 text-xs  rounded-md text-white">
              {product.status}
            </span>
          )}
          {product.status === "reject" && (
            <span className="bg-red-400 p-1 text-xs  rounded-md text-white">
              {product.status}
            </span>
          )}
        </td>
        <td className="px-6 py-4">
          <Link
            className="font-medium px-3 text-green-600 hover:underline"
            onClick={() => uploadHandler(product._id)}
          >
            Upload
          </Link>
          <Link
            className="font-medium px-3 text-blue-600 hover:underline"
            onClick={() => editHandler(product._id)}
          >
            Edit
          </Link>
          <Link
            href="#"
            className="font-medium text-red-600  hover:underline"
            onClick={() => deleteHandler(product._id)}
            name="delete"
          >
            Delete
          </Link>
        </td>
      </tr>
    </tbody>
  );
};

export default ProductsItems;
