import { Form, Input, message } from "antd";
import { registerUser, loginUser } from "../../apicalls/authapi";
import { Link, useNavigate } from "react-router-dom";
import { userAction } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { loaderAction } from "../../store/loaderSlice";

// eslint-disable-next-line react/prop-types
const AuthForm = ({ isLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.loader.isLoading);

  const handleOnFinish = async (values) => {
    dispatch(loaderAction.isLoading(true));
    if (isLogin) {
      try {
        const response = await loginUser(values);
        if (response.isSucess) {
          message.success(response.message);
          localStorage.setItem("token", response.token);
          dispatch(userAction.setUser(response.token));
          navigate("/");
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        message.error(err.message);
      }
    } else {
      try {
        const response = await registerUser(values);
        if (response.isSucess) {
          message.success(response.message);
          navigate("/login");
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        message.error(err.message);
      }
    }
    dispatch(loaderAction.isLoading(false));
  };
  return (
    <section className="w-full h-screen flex justify-center mt-28">
      <div className="w-[500px]">
        <h1 className="text-3xl font-bold text-blue-600">
          POINT.IO-{isLogin ? "LOGIN" : "REGISTER"}
        </h1>
        <Form layout="vertical" onFinish={handleOnFinish}>
          {!isLogin && (
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please enter user name." },
                { min: 5, message: "Username must be atleast 5 charactor." },
              ]}
              hasFeedback
            >
              <Input placeholder=" username ..."></Input>
            </Form.Item>
          )}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter user email." },
              { type: "email", message: "Please enter a valid E-mail." },
            ]}
            hasFeedback
          >
            <Input placeholder=" email ..."></Input>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please enter user password." },
              { min: 6, message: "Password must be atleast 5 charactor." },
            ]}
            hasFeedback
          >
            <Input.Password placeholder=" password ..."></Input.Password>
          </Form.Item>
          <Form.Item>
            <button
              type="submit"
              className=" text-lg font-bold w-full bg-blue-600 rounded-md text-white cursor-pointer py-1"
              disabled={isLoading}
            >
              {isLogin ? (
                <>{isLoading ? "Submitting" : "Login"}</>
              ) : (
                <>{isLoading ? "Submitting" : "Register"}</>
              )}
            </button>
            <div className="mt-2">
              {isLogin ? (
                <p>
                  Do not have an account ?{" "}
                  <Link className="underline text-blue-600" to={"/register"}>
                    {" "}
                    Sign in
                  </Link>
                </p>
              ) : (
                <p>
                  Already have account ?{" "}
                  <Link className="underline  text-blue-600" to={"/login"}>
                    {" "}
                    Login
                  </Link>
                </p>
              )}
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default AuthForm;
