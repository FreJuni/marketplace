import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/24/solid";

const General = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.reducer.user);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(userAction.setUser(null));
    navigate("/");
  };

  return (
    <section>
      <div className=" flex justify-between items-center mb-5">
        <h1 className="text-2xl pb-3 pt-2 font-bold">User Profile</h1>
        <button
          onClick={logoutHandler}
          className="text-white py-1 px-3 rounded-sm flex items-center gap-2 bg-red-400 cursor-pointer text-base font-bold"
        >
          <LockClosedIcon width={15} height={15} /> Logout
        </button>
      </div>
      <div className="flex justify-between items-center border-b border-blue-200 mb-3">
        <p className=" font-bold text-base">Email</p>
        <p className=" font-bold">{user.email}</p>
      </div>
      <div className="flex justify-between items-center border-b border-blue-200 mb-3">
        <p className=" font-bold text-base">Name</p>
        <p className=" font-bold">{user.name}</p>
      </div>
      <div className="flex justify-between items-center border-b border-blue-200 mb-3">
        <p className=" font-bold text-base">Role</p>
        <p className=" font-bold">{user.role}</p>
      </div>
    </section>
  );
};

export default General;
