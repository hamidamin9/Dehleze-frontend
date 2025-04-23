import React from 'react'

function MyPendings({ activeTab, setOrders, orderStats }) {
    return (
        <>
            {
                activeTab === 5 &&
                <div className="stat-card">
                    <p className="text-gray-600">
                        <strong>Pending Orders:</strong> {orderStats.pending}
                    </p>
                </div>
            }
        </>
    )
}

export default MyPendings
