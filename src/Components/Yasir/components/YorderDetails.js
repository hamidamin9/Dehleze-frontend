import React from 'react'

function YorderDetails() {
    return (
        <>
            <div className='yOrderDetailsSection'>
                <p>Pay with cash upon delivery.</p>
                <h1>Order details</h1>
                <div className='yOrderDetailsTable'>
                    <table class="y-table">
                        <tr>
                            <td class="y-product">Product</td>
                            <td class="y-value">Ullam cor poris × 1</td>
                        </tr>
                        <tr>
                            <td class="y-product">Vendor</td>
                            <td class="y-value">$255.00</td>
                        </tr>
                        <tr>
                            <td class="y-product">Subtotal</td>
                            <td class="y-value">$255.00</td>
                        </tr>
                        <tr>
                            <td class="y-product">Shipping</td>
                            <td class="y-value">Flat rate</td>
                        </tr>
                        <tr>
                            <td class="y-product">Payment method</td>
                            <td class="y-value">Cash on delivery</td>
                        </tr>
                        <tr>
                            <td class="y-product">Total</td>
                            <td class="y-value">$255.00</td>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    )
}

export default YorderDetails