/* eslint-disable react/prop-types */
import { Checkbox, Col, Form, Input, Row, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

import { sellProduct, getOldProduct, updateProduct } from "../../apicalls/product";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loaderAction } from "../../store/loaderSlice";
import { useDispatch } from "react-redux";
import { RotatingLines } from 'react-loader-spinner'

const ProductForm = ({ setActiveTab, manageTapKey, activeTab, getProduct, editMode, editProductId }) => {
  const [form] = Form.useForm();
  const [sellerId, setSellerId] = useState(null);
  const [productId, setProductId] = useState(null);
  const isLoading = useSelector((state) => state.loader.login);
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(loaderAction.isLoading(true));
      let response;
      if (editMode) {
        values.seller_id = sellerId;
        values.product_id = productId;
        response = await updateProduct(values);
      } else {
        response = await sellProduct(values);
      }
      if (response.isSucess) {
        message.success(response.message);
        setActiveTab("1");
        form.resetFields();
        getProduct();
      } else {
        throw new Error(response.message);
      }
      dispatch(loaderAction.isLoading(false));
    } catch (err) {
      message.error(err.message);
    }
  };

  const getOldProdt = async () => {
    dispatch(loaderAction.isLoading(true));
    try {
      const response = await getOldProduct(editProductId);
      if (response.isSucess) {
        message.success("edit mode on!");
        setSellerId(response.product.seller);
        setProductId(response.product._id);
        const modifiedProduct = response.product;
        form.setFieldsValue(modifiedProduct);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
    dispatch(loaderAction.isLoading(false));
  };

  useEffect(() => {
    if (editMode) {
      getOldProdt();
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode, manageTapKey, editProductId, activeTab]);

  return (
    <section>
      <h2 className="text-2xl font-bold my-2">
        {editMode ? "Update your product here." : "What you want to sell ?"}
      </h2>
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
        </div> : <>
          <Form
            layout="vertical"
            onFinish={onFinishHandler}
            form={form}
            initialValues={{ details: [], category: "" }}
          >
            <Form.Item
              name="name"
              label="Product Name"
              rules={[{ required: true, message: "Product name must contain." }]}
              hasFeedback
            >
              <Input placeholder=" product name ..."></Input>
            </Form.Item>
            <Form.Item
              name="description"
              label="Product Description"
              rules={[
                { required: true, message: "Product description must contain" },
              ]}
            >
              <TextArea rows={5} placeholder="product description ..." />
            </Form.Item>
            <div>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="price"
                    label="Price"
                    rules={[{ required: true, message: "Price must contain" }]}
                  >
                    <Input className=" rounded-md h-8 shadow-md border-1" type="number"></Input>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="category"
                    label="Choose category"
                    rules={[{ required: true, message: "Category must contain" }]}
                  >
                    <Select
                      options={[
                        { value: "electronics", label: "Electronics" },
                        { value: "clothing", label: "Clothing" },
                        { value: "home_garden", label: "Home & Garden" },
                        { value: "books_media", label: "Books & Media" },
                        { value: "sports_outdoors", label: "Sports & Outdoors" },
                        { value: "health_beauty", label: "Health & Beauty" },
                        // Add more options as needed
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="usedFor"
                    label="Product used"
                    rules={[
                      { required: true, message: "Product used time must write." },
                    ]}
                  >
                    <Input className=" rounded-md h-8 shadow-md border-1" placeholder="eg, 3 months ago .." />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="details" label="This product can have">
                <Checkbox.Group
                  options={[
                    {
                      label: "Accessorries",
                      value: "Accessorries",
                    },
                    {
                      label: "Warranty",
                      value: "Warranty",
                    },
                    {
                      label: "Vouncher",
                      value: "Vouncher",
                    },
                  ]}
                />
              </Form.Item>
            </div>
            <button
              disabled={isLoading}
              className="bg-blue-600 py-1 font-bold text-white justify-center gap-1 text-lg w-full rounded-md flex items-center"
            >
              {isLoading ? (
                <EllipsisHorizontalIcon
                  className="text-white font-bold"
                  width={35}
                  height={35}
                />
              ) : editMode ? (
                "UPDATE"
              ) : (
                "SELL"
              )}
            </button>
          </Form>
        </>
      }
    </section>
  );
};

export default ProductForm;
