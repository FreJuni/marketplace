import { Tabs, message } from "antd";
import Products from "./Products";
import General from "./General";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../apicalls/product";
import ManageProduct from "./ManageProduct";
import { useDispatch, useSelector } from "react-redux";
import { loaderAction } from "../../store/loaderSlice";
import { getAllNotification } from "../../apicalls/notification";
import Notification from "../../components/Notification/Notification";
import { SwatchIcon, SquaresPlusIcon, BellAlertIcon, UserCircleIcon } from "@heroicons/react/24/solid"

const Profile = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [manageTapKey, setManageTapKey] = useState("1");
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState([]);
  const [pages, setPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [limitPage, setLimitPage] = useState(0);
  const isLoading = useSelector((state) => state.loader.login);
  const dispatch = useDispatch();

  const getProduct = async () => {
    dispatch(loaderAction.isLoading(true));
    try {
      const response = await getAllProducts(pages);
      if (response.isSucess) {
        setLimitPage(response.limit);
        setTotalCount(response.totalProduct);
        setProducts(response.products);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
    dispatch(loaderAction.isLoading(false))
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

  useEffect(() => {
    if (activeTab === "1") {
      setManageTapKey("1");
      setEditMode(false);
      setEditProductId(null);
    }
    getProduct();
    getNoti();
  }, [pages]);

  const items = [
    {
      key: "1",
      label: (
        <span className=" flex items-center gap-1">
          <SwatchIcon width={20} height={20} />
          Products
        </span>
      ),
      children: (
        <Products
          isLoading={isLoading}
          products={products}
          setActiveTab={setActiveTab}
          setEditMode={setEditMode}
          setEditProductId={setEditProductId}
          getProduct={getProduct}
          setManageTapKey={setManageTapKey}
          totalCount={totalCount}
          setPages={setPages}
          pages={pages}
          limitPage={limitPage}
        />
      ),
    },
    {
      key: "2",
      label: (
        <span className=" flex items-center gap-1">
          <SquaresPlusIcon width={20} height={20} />
          Manage Products
        </span>
      ),
      children: (
        <ManageProduct
          setActiveTab={setActiveTab}
          getProduct={getProduct}
          editMode={editMode}
          activeTab={activeTab}
          editProductId={editProductId}
          manageTapKey={manageTapKey}
        />
      ),
    },
    {
      key: "3",
      label: (
        <span className=" flex items-center gap-1">
          <BellAlertIcon width={20} height={20} />
          Notifaction<span className=" text-red-600">({notification.length})</span>
        </span>
      ),
      children: <Notification getNoti={getNoti} notification={notification} />,
    },
    {
      key: "4",
      label: (
        <span className=" flex items-center gap-1">
          <UserCircleIcon width={20} height={20} />
          Profile
        </span>
      ),
      children: <General />,
    },
  ];

  const onChangeHandler = (key) => {
    setActiveTab(key);
    setEditMode(false);
  };

  return (
    <div>
      <Tabs
        activeKey={activeTab}
        onChange={(key) => onChangeHandler(key)}
        items={items}
        tabPosition="left"
      />
    </div>
  );
};

export default Profile;
