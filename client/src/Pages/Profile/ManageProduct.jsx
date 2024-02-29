/* eslint-disable react/prop-types */

import { Tabs } from "antd";
import ProductForm from "../../components/Auth/ProductForm";
import Upload from "../../components/Auth/Upload";

const ManageProduct = ({
  setActiveTab,
  getProduct,
  editMode,
  editProductId,
  activeTab,
  manageTapKey,
}) => {
  const items = [
    {
      key: "1",
      label: "Product Details",
      children: (
        <ProductForm
          setActiveTab={setActiveTab}
          editMode={editMode}
          getProduct={getProduct}
          editProductId={editProductId}
          activeTab={activeTab}
          manageTapKey={manageTapKey}
        />
      ),
    },
    editMode
      ? {
        key: "2",
        label: "Product Image",
        children: (
          <Upload setActiveTab={setActiveTab} editProductId={editProductId} />
        ),
      }
      : null,
  ];

  return (
    <div>
      <Tabs defaultActiveKey={manageTapKey} items={items} tabPosition="top" />
    </div>
  );
};

export default ManageProduct;
