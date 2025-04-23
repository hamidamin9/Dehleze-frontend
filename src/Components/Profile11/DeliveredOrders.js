import React from 'react'

function DeliveredOrders({ orderStats, activeTab }) {
    return (
        <>
            {
                activeTab === 6 && <div className="stat-card">
                    <p className="text-gray-600">
                        <strong>Delivered Orders:</strong> {orderStats.delivered}
                    </p>
                </div>
            }
        </>
    )
}

export default DeliveredOrders
