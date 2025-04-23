import React from 'react'

function YorderConfirmationTop() {
    return (
        <>
            <div className='yOrderConfirmationTop'>
                <p>Thank you. Your order has been received.</p>
                <div className='yOrderConfirmationTopDetails YglobalFlex'>
                    <div className='yOrderConfirmationTopDetailsContent'>
                        <h3>Order number</h3>
                        <br />
                        <p>1234565432345</p>
                    </div>
                    <div className='yOrderConfirmationTopDetailsContent'>
                        <h3>Date</h3>
                        <br />
                        <p>12 dec 2022</p>
                    </div>
                    <div className='yOrderConfirmationTopDetailsContent'>
                        <h3>Total</h3>
                        <br />
                        <p>Rs 5000</p>
                    </div>
                    <div className='yOrderConfirmationTopDetailsContent'>
                        <h3>Payment Method</h3>
                        <br />
                        <p>Cash On Delivery</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default YorderConfirmationTop