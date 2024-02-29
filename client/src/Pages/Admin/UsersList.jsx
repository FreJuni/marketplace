/* eslint-disable react/prop-types */
import moment from "moment";
import { banUser, unbanUser } from "../../apicalls/admin";
import { message } from "antd";

const ProductsItems = ({ user, getAllUser }) => {
  const banHandler = async (userId) => {
    try {
      const response = await banUser(userId);
      if (response.isSucess) {
        message.success(response.message);
        getAllUser();
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const unBanHandler = async (userId) => {
    try {
      const response = await unbanUser(userId);
      if (response.isSucess) {
        getAllUser();
        message.success(response.message);
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
          {user.name}
        </th>
        <td className="px-6 py-4">{user.email}</td>
        <td className="px-6 py-4">
          {user.role === "admin" ? (
            <span className="text-green-600 font-medium">{user.role}</span>
          ) : (
            <span className="text-blue-600">{user.role}</span>
          )}
        </td>
        <td className="px-6 py-4">
          {user.status === "active" && (
            <span className="bg-green-400 text-white text-xs p-1 rounded-sm">
              {user.status}
            </span>
          )}
          {user.status === "banned" && (
            <span className="bg-red-400 text-white text-xs p-1 rounded-sm">
              {user.status}
            </span>
          )}
        </td>
        <td className="px-6 py-4">{moment(user.createdAt).format("L")}</td>
        <td className="px-6 py-4">
          {user.status === "active" ? (
            <button
              type="button"
              className="font-medium px-3 text-red-600 hover:underline"
              onClick={() => banHandler(user._id)}
            >
              Ban
            </button>
          ) : (
            <button
              className="font-medium px-3 text-blue-600 hover:underline"
              type="button"
              onClick={() => unBanHandler(user._id)}
            >
              Unban
            </button>
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default ProductsItems;
