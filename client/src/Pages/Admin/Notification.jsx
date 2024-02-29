/* eslint-disable react/prop-types */
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
const Notification = ({ notification }) => {
    return (
        <section>
            <h1 className=" font-semibold text-3xl my-2">Notifications</h1>
            <div className=" max-w-3xl">
                {
                    notification.length === 0 && <p className=" text-red-600 font-medium my-5">No notification yet.</p>
                }
                {
                    notification && notification.map((noti) => {
                        return (
                            <div key={noti._id} className={`${noti.isRead ? " bg-gray-500" : "bg-white "} mb-4 rounded-lg p-4`}>
                                <p className=" text-sm font-medium text-gray-500">{formatDistanceToNow(new Date(noti.createdAt))} ago ...</p>
                                <h4 className=" text-xl font-medium my-2">{noti.title}</h4>
                                <p className=" text-base font-medium text-gray-600">{noti.message}</p>
                                <p className=" font-medium text-gray-600 my-2">Contact Number - <span className=" tracking-wide">{noti.phone_number}</span></p>
                                <hr />
                                <div className=" mt-1 text-right">
                                    <Link className=" text-blue-600 font-medium underline " to={`/details/${noti.product_id}`} >View bids</Link>
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