/* eslint-disable react-hooks/exhaustive-deps */
import { Tabs, message } from "antd";
import { useEffect, useState } from "react";
import Products from "./Products";
import User from "./User";
import { getAllProducts, getAllUsers } from "../../apicalls/admin";
import General from "./General";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Notification from "./Notification";
import { getAllNotification } from "../../apicalls/notification";
import { getPendingProducts } from "../../apicalls/product";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState([]);
  const [pages, setPages] = useState(1);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [limitPage, setLimitPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [totalSales, setTotalSales] = useState(0);
  const [userCount, setUserCount] = useState([]);
  const [pending, setPending] = useState([]);
  const user = useSelector((state) => state.reducer.user.user);
  const navigate = useNavigate();

  const onChangeHandler = (key) => {
    setActiveTab(key);
  };

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getAllProducts(pages);
      if (response.isSucess) {
        setLimitPage(response.limit);
        setTotalCount(response.totalProduct);
        setProducts(response.products);
        setTotalProduct(response.totalProduct);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
    setIsLoading(false);
  };

  const isAdmin = () => {
    if (user.role !== "admin") {
      navigate("/");
    }
  };

  const getNoti = async () => {
    try {
      const response = await getAllNotification();
      if (response.isSucess) {
        setNotification(response.notiDoc);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  }

  const calcTotalSales = () => {
    const totalAmount = products.reduce((a, b) => {
      return a + Number(b.price);
    }, 0);
    setTotalSales(totalAmount);
  };

  const getAllUser = async () => {
    try {
      const response = await getAllUsers();
      if (response.isSucess) {
        setUserCount(response.data.length);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const getPendingProduct = async () => {
    try {
      const response = await getPendingProducts();
      if (response.isSucess) {
        setPending(response.productDoc)
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }

  };

  useEffect(() => {
    calcTotalSales();
  }, [products])

  useEffect(() => {
    getAllUser();
    isAdmin();
    getProducts();
    getNoti();
    getPendingProduct();
  }, [activeTab, pages]);

  const items = [
    {
      key: "1",
      label: `Dashboard`,
      children: <Dashboard setActiveTab={setActiveTab} pending={pending} userCount={userCount} totalSales={totalSales} isLoading={isLoading} totalProduct={totalProduct} products={products} />,
    },
    {
      key: "2",
      label: "Manage Products",
      children: <Products isLoading={isLoading} products={products} totalCount={totalCount} setPages={setPages} pages={pages} limitPage={limitPage} getProducts={getProducts} />,
    },
    {
      key: "3",
      label: "Manage Users",
      children: <User />,
    },
    {
      key: "4",
      label: "Notifaction",
      children: <Notification notification={notification} />,
    },
    {
      key: "5",
      label: "General",
      children: <General />,
    },
  ];

  return (
    <section>
      <Tabs
        activeKey={activeTab}
        onChange={(key) => onChangeHandler(key)}
        items={items}
        tabPosition="left"
      />
    </section>
  );
};

export default Admin;
