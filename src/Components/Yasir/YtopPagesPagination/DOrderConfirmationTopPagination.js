import React from 'react'
import { NavLink } from 'react-router-dom'

function DOrderConfirmationTopPagination() {
    return (
        <div className='YglobalFlex YshopTopPagination'>
            <NavLink to='/'><i className="fa-solid fa-chevron-left"></i>&nbsp; Home</NavLink>
            <p>Order Confirmation</p>
        </div>
    )
}

export default DOrderConfirmationTopPagination