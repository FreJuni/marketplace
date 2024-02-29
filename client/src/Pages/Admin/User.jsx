import { message } from "antd";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../apicalls/admin";
import UserList from "./UsersList";
import { RotatingLines } from "react-loader-spinner";
// import ProductsItems from "./ProductsItems";

/* eslint-disable react/prop-types */
const User = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const getAllUser = async () => {
    setIsLoading(true);
    try {
      const response = await getAllUsers();
      if (response.isSucess) {
        setUsers(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <section>
      <h2 className="text-3xl py-2">User List</h2>
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
        </div> :
          <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr className="text-center">
                    <th scope="col" className="px-6 py-3 text-left">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      CreatedAt
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                {users.length > 0 &&
                  users.map((user, i) => {
                    return <UserList key={i} user={user} getAllUser={getAllUser} />;
                  })}
              </table>
            </div>
            {users.length === 0 && (
              <p className="w-full text-center absolute py-6 text-2xl">
                No users yet.
              </p>
            )}
          </>
      }

    </section>
  );
};

export default User;
