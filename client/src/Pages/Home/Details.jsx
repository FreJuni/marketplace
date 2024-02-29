/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react"
import { Form, message, Input } from "antd";
import { getProductDetail } from "../../apicalls/public";
import { Link, useNavigate, useParams } from "react-router-dom";
import defaultImages from "../../images/photo-1562577308-9e66f0c65ce5.webp"
import { useDispatch, useSelector } from "react-redux";
import { loaderAction } from "../../store/loaderSlice";
import { RotatingLines } from 'react-loader-spinner'
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { addNewBid, getAllBid } from "../../apicalls/bid";
import { formatDistanceToNow } from "date-fns";
import { notify } from "../../apicalls/notification";

const Details = () => {
    const [product, setProduct] = useState([]);
    const [bids, setBids] = useState([]);
    const [selectedImages, setSelectedImages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { productId } = useParams();
    const isLoading = useSelector((state) => state.loader.login);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((user) => user.reducer.user)

    const getProduct = async () => {
        dispatch(loaderAction.isLoading(true));
        try {
            const response = await getProductDetail(productId);
            if (response.isSucess) {
                setProduct(response.productDoc)
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
        dispatch(loaderAction.isLoading(false));
    }

    const getAllBids = async () => {
        try {
            const response = await getAllBid(productId && productId);
            if (response.isSucess) {
                setBids(response.bidDoc)
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    useEffect(() => {
        getProduct();
        getAllBids();
    }, []);

    const onFinishHandler = async (values) => {
        values.product_id = product._id;
        values.seller_id = product.seller._id;
        values.buyer_id = user._id;
        setLoading(true);
        try {
            const response = await addNewBid(values);
            if (response.isSucess) {
                message.success(response.message);
                form.resetFields();
                getAllBids();

                await notify({ title: "New bid placed.", message: `New bid is placed in ${product.name} by ${user.name}`, owner_id: product.seller._id, product_id: product._id, phone_number: values.phone_number })

            }
        } catch (error) {
            message.error(error.message)
        }
        setLoading(false);
    };

    return (

        <>
            {
                isLoading ?
                    <div className=" flex justify-center items-center h-96">
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
                    <section className="flex justify-between my-10">
                        {
                            product && product.name && (
                                <>
                                    <div className=" w-2/4">
                                        {
                                            product && product.images && product.images.length > 0 ? (
                                                <>
                                                    <img className=" w-full h-80 object-cover object-center  overflow-hidden rounded-md shadow-sm" src={product.images[selectedImages]} alt={product.name} />
                                                    <div className=" flex gap-3 mt-2">
                                                        {
                                                            product.images.map((image, i) => {
                                                                return (
                                                                    <div key={i}>
                                                                        <img className={` w-20 p-1 h-20 border-2  border-blue-500 overflow-hiddenobject-cover object-cover cursor-pointer ${selectedImages === i && `border-2 border-dashed border-blue-500 overflow-hidden`} rounded-md `} src={image} alt={product.name} onClick={() => setSelectedImages(i)} />
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <img className=" w-full h-80 object-fill object-center  overflow-hidden rounded-md shadow-sm" src={defaultImages} alt={"default"} />
                                                    <p className=" text-red-600 mt-2">{`This product doesn't include image.`} </p>
                                                </>
                                            )
                                        }
                                    </div>
                                    <div className=" w-3/4 mx-16 ">
                                        <div className=" flex  justify-between">
                                            <div className="w-3/4">
                                                <h1 className=" text-2xl font-bold">{product.name}</h1>
                                                <p className=" font-sm text-gray-500 leading-6 mb-2 mt-1">{product.description}</p>
                                            </div>
                                            <ArrowLeftIcon onClick={() => navigate(-1)} width={36} height={36} className=" mt-0 text-blue-600 cursor-pointer" />
                                        </div>
                                        <hr />
                                        <h1 className=" text-xl font-bold mt-3 mb-1">Informations</h1>
                                        <div className=" flex justify-between mb-2">
                                            <div className=" font-medium space-y-2">
                                                <p>Price</p>
                                                <p>Category</p>
                                                <p>Used for</p>
                                            </div>
                                            <div className=" text-gray-600 space-y-2 text-right">
                                                <p>{product.price} Kyats</p>
                                                <p>{product.category.toUpperCase().replace("_", " ")}</p>
                                                <p>{product.usedFor}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className=" mb-2">
                                            <h1 className=" text-xl font-bold mt-3 mb-1">Details</h1>
                                            {product.details &&
                                                product.details.map((detail, i) => {
                                                    return (
                                                        <div key={i} >
                                                            <div className=" flex justify-between">
                                                                <div className=" font-medium space-y-2">
                                                                    <p>{detail}</p>
                                                                </div>
                                                                <div className=" text-gray-600 space-y-2">
                                                                    <p>Includes</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <hr className=" mb-2" />
                                        <div>
                                            <h1 className=" text-xl font-bold mt-3 mb-1">Seller Informations</h1>
                                            <div className=" flex justify-between mb-2">
                                                <div className=" font-medium space-y-2">
                                                    <p>Name</p>
                                                    <p>Email</p>
                                                </div>
                                                <div className=" text-gray-600 space-y-2 text-right">
                                                    <p>{product.seller.name}</p>
                                                    <p>{product.seller.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <h1 className=" text-xl font-bold mt-3 mb-1">Place Your Bids</h1>
                                        {
                                            user && user._id !== product.seller._id && <div>
                                                <Form layout="vertical" onFinish={onFinishHandler}>
                                                    <Form.Item className=" w-full mb-0  "
                                                        label="Text" name="text" rules={[
                                                            {
                                                                required: true,
                                                                message: "Message must contain."
                                                            },
                                                            {
                                                                min: 5,
                                                                message: "Message must have atleat 5 charactor."
                                                            }
                                                        ]}>
                                                        <Input className=" py-[3px] border-[1px] border-blue-600 rounded-md" placeholder="write something ..." />
                                                    </Form.Item>
                                                    <Form.Item className=" w-full mb-0  " name="phone_number" label="Phone" rules={[
                                                        {
                                                            required: true,
                                                            message: "Phone number must contain."
                                                        },
                                                        {
                                                            min: 11,
                                                            message: "Phone number must contain."
                                                        }
                                                    ]}>
                                                        <Input type="number" className=" py-[3px] border-[1px] border-blue-600 rounded-md" placeholder="phone number ..." />
                                                    </Form.Item>
                                                    <div className=" text-end">
                                                        <button type="submit" className=" text-white py-[4px] text-end mt-4 mb-2 px-2 rounded-sm cursor-pointer  font-bold text-md bg-blue-600">{
                                                            loading ? "Submitting" : "Submit Message"
                                                        }</button>
                                                    </div>
                                                </Form>
                                            </div>
                                        }
                                        {
                                            !user && <p className=" text-red-400" to={"/register"}><Link to={"/login"} className=" underline">Login</Link> or <Link to={"/register"} className=" underline">Resgister</Link>  to bid this product.</p>
                                        }
                                        {
                                            user && user._id === product.seller._id && <p className=" text-red-600 my-2">Product owner can&apos;t give bid.</p>
                                        }
                                        <hr />
                                        <div className=" mt-2">
                                            <h1 className=" text-xl font-bold mt-3 mb-1">Recent Bids</h1>
                                        </div>

                                        <div>
                                            {
                                                bids.length === 0 && <p className=" text-red-600 ">Bid not places yet.</p>
                                            }
                                            {
                                                bids && bids.map((bid) => {
                                                    return (
                                                        <div className=" mb-2 bg-white px-2 py-4 rounded-lg" key={bid._id}>
                                                            <h5 className=" text-base font-medium">{bid.buyer_id.name}</h5>
                                                            <p className=" text-xs text-gray-400">{formatDistanceToNow(new Date(bid.createdAt))}</p>
                                                            <p className=" text-gray-600 text-sm">{bid.text}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </>
                            )
                        }

                    </section>

            }
        </>
    )
}

export default Details