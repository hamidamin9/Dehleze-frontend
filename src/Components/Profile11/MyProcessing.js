import React from 'react'

function MyProcessing({ activeTab, orderStats, orders, products, userData }) {
    return (
        <>
            {activeTab === 4 && <div className="processing-orders">
                <div className="stat-card mb-4">
                    <p className="text-gray-600">
                        <strong>Processing Orders:</strong> {orderStats.processing}
                    </p>
                </div>

                {orders.length === 0 ? (
                    <p className="no-orders-message">No processing orders found.</p>
                ) : (
                    <ul className="orders-list">
                        {orders
                            .filter((order) =>
                                order.user === userData.id &&
                                order.order_status === "processing"
                            )
                            .map((order) => {
                                const product = products.find(
                                    (prod) => prod.id === order.product
                                );
                                return (
                                    <li key={order.id} className="order-card">
                                        <div className="flex-col md:flex-row gap-4">
                                            <div className="order-image-container">
                                                <img
                                                    src={product?.images[0]?.image || ""}
                                                    alt={product?.name || "Product"}
                                                    className="order-image"
                                                />
                                            </div>
                                            <div className="order-details-grid">
                                                <div>
                                                    <p className="text-sm">
                                                        <strong className="text-gray-600">Order ID:</strong> {order.id}
                                                        <strong className="text-gray-600"> Qty:</strong> {order.ordered_item}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm">
                                                        <strong className="text-gray-600">User:</strong> {userData.name || "N/A"}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm">
                                                        <strong className="text-gray-600">Price:</strong> {product?.price || "N/A"}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm">
                                                        <strong className="text-gray-600">Address:</strong> {order.address}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm">
                                                        <strong className="text-gray-600">Product:</strong> {product?.name || "N/A"}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm">
                                                        <strong className="text-gray-600">Status:</strong>
                                                        <span className="capitalize"> {order.order_status}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                    </ul>
                )}
            </div>}
        </>
    )
}

export default MyProcessing