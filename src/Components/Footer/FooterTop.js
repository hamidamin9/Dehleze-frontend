import React from 'react'
import icon1 from './footericons/1.png'
import icon2 from './footericons/2.png'
import icon3 from './footericons/3.png'
import icon4 from './footericons/4.png'
import icon5 from './footericons/5.png'

function FooterTop() {
    return (
        <>
            <div className="footer-top">
                <div className="ycontainer">
                    <div className="yfootericonflex">
                        <img src={icon1} alt="" />
                        <p>Verified Sellers</p>
                    </div>
                    <div className="yfootericonflex">
                        <img src={icon2} alt="" />
                        <p>Authentic Products</p>
                    </div>
                    <div className="yfootericonflex">
                        <img src={icon3} alt="" />
                        <p>Free Returns</p>
                    </div>
                    <div className="yfootericonflex">
                        <img src={icon4} alt="" />
                        <p>Nationwide Delivery</p>
                    </div>
                    <div className="yfootericonflex">
                        <img src={icon5} alt="" />
                        <p>Safe Payments</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FooterTop
