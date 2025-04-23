import React from 'react'
import '../../Thankyoupage/ThankyouPage.css'
import tick from '../../ThankyouPageIcons/check.png'
import { NavLink } from 'react-router-dom'
import FooterTop from '../../Footer/FooterTop'
import Footer from '../../Footer/Footer'

function ThankyouPage() {
    return (
        <>
            <div className="thankyouPagecontainer">
                <div className="checkmark-container">
                    <img src={tick} alt="" />
                </div>
                <h1>THANK YOU FOR YOUR ORDER</h1>
                <p>
                    Please check your email for further details about your order.<br />
                    You will receive the confirmation email shortly.
                </p>
                <div className='thankyouPageBtns'>
                    <NavLink to='/shop'>Continue Shopping</NavLink>
                    <button>Share</button>
                </div>
            </div>
            <div className='thankyouPageFooterTop'>
                <FooterTop />
            </div>
            <Footer />
        </>
    )
}

export default ThankyouPage
