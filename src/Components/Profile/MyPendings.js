// import React from 'react'
// import pending from '../Profile/recentorder.png'
// function MyPendings({ activeTab, setOrders, orderStats }) {
//     console.log(orderStats,'orderStats checking...')
//     return (
//         <>
//             {
//                 activeTab === 8 &&
//                 <>
                //     <div className='yPendingOrdersFlex'>

                //         <div className="yPendingOrders">
                //             <div className='yPendingOrdersBox'>
                //                 <div className='yPendingOrdersBoxImage'>
                //                     <img src={pending} alt="" />
                //                 </div>
                //                 <p>Dear customer, we’re sorry that your order has been cancelled....</p>
                //             </div>
                //         </div>
                //         <div className="yPendingOrders">
                //             <div className='yPendingOrdersBox'>
                //                 <div className='yPendingOrdersBoxImage'>
                //                     <img src={pending} alt="" />
                //                 </div>
                //                 <p>Dear customer, we’re sorry that your order has been cancelled....</p>
                //             </div>
                //         </div>
                //         <div className="yPendingOrders">
                //             <div className='yPendingOrdersBox'>
                //                 <div className='yPendingOrdersBoxImage'>
                //                     <img src={pending} alt="" />
                //                 </div>
                //                 <p>Dear customer, we’re sorry that your order has been cancelled....</p>
                //             </div>
                //         </div>
                //         <div className="yPendingOrders">
                //             <div className='yPendingOrdersBox'>
                //                 <div className='yPendingOrdersBoxImage'>
                //                     <img src={pending} alt="" />
                //                 </div>
                //                 <p>Dear customer, we’re sorry that your order has been cancelled....</p>
                //             </div>
                //         </div>
                //         <div className="yPendingOrders">
                //             <div className='yPendingOrdersBox'>
                //                 <div className='yPendingOrdersBoxImage'>
                //                     <img src={pending} alt="" />
                //                 </div>
                //                 <p>Dear customer, we’re sorry that your order has been cancelled....</p>
                //             </div>
                //         </div>
                //         <div className="yPendingOrders">
                //             <div className='yPendingOrdersBox'>
                //                 <div className='yPendingOrdersBoxImage'>
                //                     <img src={pending} alt="" />
                //                 </div>
                //                 <p>Dear customer, we’re sorry that your order has been cancelled....</p>
                //             </div>
                //         </div>
                //         <div className="yPendingOrders">
                //             <div className='yPendingOrdersBox'>
                //                 <div className='yPendingOrdersBoxImage'>
                //                     <img src={pending} alt="" />
                //                 </div>
                //                 <p>Dear customer, we’re sorry that your order has been cancelled....</p>
                //             </div>
                //         </div>
                //         <div className="yPendingOrders">
                //             <div className='yPendingOrdersBox'>
                //                 <div className='yPendingOrdersBoxImage'>
                //                     <img src={pending} alt="" />
                //                 </div>
                //                 <p>Dear customer, we’re sorry that your order has been cancelled....</p>
                //             </div>
                //         </div>
                //         <div className="yPendingOrders">
                //             <div className='yPendingOrdersBox'>
                //                 <div className='yPendingOrdersBoxImage'>
                //                     <img src={pending} alt="" />
                //                 </div>
                //                 <p>Dear customer, we’re sorry that your order has been cancelled....</p>
                //             </div>
                //         </div>
                //     </div>
                // </>
//             }
//         </>
//     )
// }

// export default MyPendings

import React from 'react';
import pending from '../Profile/recentorder.png';

function MyPendings({ activeTab, orders = [], products = [], userData }) {
    const pendingOrders = orders.filter(
        (order) => order.user === userData?.id && order.order_status === "pending"
    );

    return (
        <>
            {activeTab === 8 && (
                <div className="yPendingOrdersFlex">
                    {pendingOrders.length === 0 || products.length === 0 ? (
                        <p className="no-orders-message">No pending orders found.</p>
                    ) : (
                        pendingOrders.map((order) => {
                            const product = products.find((prod) => prod.id === order.product);
                            return (
                                <div className="yPendingOrders" key={order.id}>
                                    <div className="yPendingOrdersBox">
                                        <div className="yPendingOrdersBoxImage">
                                            <img src={pending} alt="Pending Order" />
                                        </div>
                                        <p>
                                            Dear customer, your order <strong>{product?.name || "N/A"}</strong> is <span className="capitalize">{order.order_status}</span>. 
                                            <br /> <strong>Qty:</strong> {order.ordered_item} &nbsp;
                                            <strong>Price:</strong> {product?.price || "N/A"} &nbsp;
                                            <strong>Address:</strong> {order.address}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </>
    );
}

export default MyPendings;
