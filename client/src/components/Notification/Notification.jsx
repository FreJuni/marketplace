/* eslint-disable react/prop-types */
import { message } from "antd";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { deleteAllNotification, deleteNotification, viewdNotification } from "../../apicalls/notification";

const Notification = ({ notification, getNoti }) => {

    const viewHandler = async (id) => {
        try {
            const response = await viewdNotification(id);
            if (response.isSucess) {
                message.success(response.message);
                getNoti();
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const deleteHandler = async (id) => {
        try {
            const response = await deleteNotification(id);
            if (response.isSucess) {
                message.success(response.message);
                getNoti();
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const deleteAllHandler = async () => {
        try {
            const response = await deleteAllNotification();
            if (response.isSucess) {
                message.success(response.message);
                getNoti();
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };


    return (
        <section>
            <div className=" flex items-center gap-52">
                <h1 className=" font-semibold text-3xl my-2">Notifications</h1>
                {
                    notification.length > 0 && (
                        <p className=" text-red-600 text-md cursor-pointer hover:no-underline transition-allfont-medium underline hover:text-red-400  " onClick={() => deleteAllHandler()}>Delete All Notifications</p>
                    )
                }
            </div>
            <div className=" max-w-3xl">
                {
                    notification.length === 0 && <p className=" text-red-600 font-medium my-5">No notification yet.</p>
                }
                {
                    notification && notification.map((noti) => {
                        return (
                            <div key={noti._id} className={`${noti.isRead ? "bg-gray-100" : "bg-white"} mb-4 rounded-lg p-4`}>
                                <p className=" text-sm font-medium text-gray-500">{formatDistanceToNow(new Date(noti.createdAt))} ago ...</p>
                                <h4 className=" text-xl font-medium my-2">{noti.title}</h4>
                                <p className=" text-base font-medium text-gray-600">{noti.message}</p>
                                <p className=" font-medium text-gray-600 my-2">Contact Number - <span className=" tracking-wide">{noti.phone_number}</span></p>
                                <hr />
                                <div className=" mt-1 flex justify-end gap-2">
                                    <Link className=" text-blue-600 font-medium underline " to={`/details/${noti.product_id}`}>View bids</Link>
                                    {
                                        noti.isRead ? <p className=" text-red-600 cursor-pointer hover:no-underline transition-all hover:text-red-400  font-medium underline " onClick={() => deleteHandler(noti._id)}>Delete</p> : <p className=" text-blue-600 cursor-pointer hover:no-underline transition-all hover:text-blue-300  font-medium underline " onClick={() => viewHandler(noti._id)}>Mark as read</p>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Notification