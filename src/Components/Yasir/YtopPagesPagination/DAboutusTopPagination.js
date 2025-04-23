import React from 'react'
import { NavLink } from 'react-router-dom'

function DAboutusTopPagination() {
    return (
        <div className='YglobalFlex YshopTopPagination'>
            <NavLink to='/'><i className="fa-solid fa-chevron-left"></i>&nbsp; Home</NavLink>
            <p>About us</p>
        </div>
    )
}

export default DAboutusTopPagination