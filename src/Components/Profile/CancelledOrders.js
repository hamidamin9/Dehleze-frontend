import React from 'react'

function CancelledOrders({ activeTab, orderStats }) {
    return (
        <>
            {
                activeTab === 7 &&
                <div className="stat-card">
                    <p className="text-gray-600">
                        <strong>Canceled Orders:</strong> {orderStats.canceled}
                    </p>
                </div>
            }
        </>
    )
}

export default CancelledOrders
