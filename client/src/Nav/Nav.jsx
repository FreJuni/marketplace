import { Link, useNavigate } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { BookmarkIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { userAction } from "../store/userSlice";

const Nav = () => {
  const user = useSelector((state) => state.reducer.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(userAction.setUser(null));
    navigate("/");
  };


  return (
    <nav className=" text-blue-600 flex justify-between items-center py-4 mb-3">
      <Link className="text-3xl font-bold" to={"/"}>
        MARKETMINGLE
      </Link>
      <div className="flex gap-2">
        <Link>About</Link>
        <Link to={"/contact"}>Contact</Link>
        <Link>Q&A</Link>
      </div>
      <div className="flex gap-3 text-base font-medium">
        {user ? (
          <>
            {user.role === "user" && (
              <Link to={"/profile"} className="flex gap-1 items-end">
                <UserIcon width={25} />
              </Link>
            )}
            {user.role === "admin" && (
              <Link to={"/admin"} className="flex gap-1 items-end">
                <UserIcon width={25} />
                Admin Pannel
              </Link>
            )}
            <Link to={"/save-product"} className="flex gap-1 items-end">
              <BookmarkIcon width={25} />
            </Link>
            <Link className="flex gap-1 text-red-500 cursor-pointer items-end">
              <ArrowRightEndOnRectangleIcon width={25} onClick={() => logoutHandler()} />
            </Link>
          </>
        ) : (
          <>
            {" "}
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
