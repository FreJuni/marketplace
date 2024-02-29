import { useEffect } from "react";
import { checkCurrentUser } from "../apicalls/authapi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userAction } from "../store/userSlice";

/* eslint-disable react/prop-types */
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      const response = await checkCurrentUser();
      if (response.isSuccess) {
        dispatch(userAction.setUser(response.userDoc));
      } else {
        localStorage.removeItem("token");
        dispatch(userAction.setUser(null))
        navigate("/");
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  return <section>{children}</section>;
};

export default AuthProvider;
