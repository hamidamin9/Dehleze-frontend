import React from "react";

const RecentOrdersTable = ({ activeTab, setActiveTab, userData, products, orderStats, orders = [] }) => {
    return (
        <div className="y-orders-container">
            <h2 className="y-orders-title">Recent Orders</h2>
            <div className="y-table-responsive">
                <table className="y-orders-table">
                    <thead>
                        <tr>
                            <th className="y-table-header">Order#</th>
                            <th className="y-table-header">Placed On</th>
                            <th className="y-table-header">Items</th>
                            <th className="y-table-header">Total</th>
                            <th className="y-table-header"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.sort((a, b) => new Date(b.placed_at) - new Date(a.placed_at))
                            .map((order) => {
                                const product = products.find((prod) => prod.id === order.product);

                                return (<tr key={order.id} className="y-table-row">
                                    <td className="y-table-cell">{product?.id}</td>
                                    <td className="y-table-cell">{new Date(order.placed_at).toLocaleDateString()}</td>
                                    <td className="y-table-cell">
                                        <img src={product?.images[0]?.image} alt="Item" className="y-order-image" />
                                    </td>
                                    <td className="y-table-cell">Rs {order?.total_price}</td>
                                    <td className="y-table-cell">
                                        <span className="y-manage-link">MANAGE</span>
                                    </td>
                                </tr>)
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentOrdersTable;
