import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "./Pages/Home/Hero"
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Main from "./layout/Main";
import Profile from "./Pages/Profile/Profile";
import AuthProvider from "./AuthProvider/AuthProvider";
import Admin from "./Pages/admin/Admin";
import Details from "./Pages/Home/Details";
import SaveProduct from "./Pages/SaveProduct/SaveProduct";
import Contact from "./Pages/Contact/Contact";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: (
            <AuthProvider>
              <Hero />
            </AuthProvider>
          ),
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/profile",
          element: (
            <AuthProvider>
              <Profile />
            </AuthProvider>
          ),
        },
        {
          path: "/details/:productId",
          element: <Details />
        },
        {
          path: "/admin",
          element: (
            <AuthProvider>
              <Admin />
            </AuthProvider>
          ),
        },
        {
          path: "/save-product",
          element: (
            <AuthProvider>
              <SaveProduct />
            </AuthProvider>
          )
        },
        {
          path: "/contact",
          element: <Contact />
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
