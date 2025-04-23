import React from 'react'

import '../../ReviewPage/ReviewPage.css'
import reviewproduct from '../../ReviewPage/reviewproduct.png'
import star from '../../ReviewPage/star.png'
function AfterReviewPage({ activeTab }) {
    return (
        <>
            {
                activeTab === 12 &&
                <div className='afterReviewPage'>
                    <div className='reviewPage'>
                        <div className='reviewPageTop'>
                            <p>Purchased on 24 Jan 2025</p>
                            <span>Your product rating & review:</span>
                        </div>
                        <div className='reviewPageFlex'>
                            <div className='reviewPageLeft'>
                                <div className='reviewPageLeftImage'>
                                    <img src={reviewproduct} alt="" />
                                </div>
                                <div className='reviewpageProductDetails'>
                                    <h2>HP EliteBook Hewlett-Packard Laptop HP ProBook 450 G4</h2>
                                    <p>Rs. 79,000</p>
                                    <span>Rs 109,000</span>
                                    <span>Installments Available</span>
                                    <div className='Reviewstars'>
                                        <img src={star} alt="" />
                                        <img src={star} alt="" />
                                        <img src={star} alt="" />
                                        <img src={star} alt="" />
                                        <img src={star} alt="" />
                                        <span>Delightful</span>
                                    </div>
                                    <textarea name="" id="" placeholder='What do you think about this product?'></textarea>
                                </div>
                            </div>
                            <div className='reviewPageRight'>
                                <h3>Rate and review delivery service:</h3>
                                <div className='Reviewstars'>
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                </div>
                                <textarea name="" id="" placeholder='How is your overall delivery experience?'></textarea>
                            </div>
                        </div>
                    </div>
                    <div className='reviewPage'>
                        <div className='reviewPageTop'>
                            <p>Purchased on 24 Jan 2025</p>
                            <span>Your product rating & review:</span>
                        </div>
                        <div className='reviewPageFlex'>
                            <div className='reviewPageLeft'>
                                <div className='reviewPageLeftImage'>
                                    <img src={reviewproduct} alt="" />
                                </div>
                                <div className='reviewpageProductDetails'>
                                    <h2>HP EliteBook Hewlett-Packard Laptop HP ProBook 450 G4</h2>
                                    <p>Rs. 79,000</p>
                                    <span>Rs 109,000</span>
                                    <span>Installments Available</span>
                                    <div className='Reviewstars'>
                                        <img src={star} alt="" />
                                        <img src={star} alt="" />
                                        <img src={star} alt="" />
                                        <img src={star} alt="" />
                                        <img src={star} alt="" />
                                        <span>Delightful</span>
                                    </div>
                                    <textarea name="" id="" placeholder='What do you think about this product?'></textarea>
                                </div>
                            </div>
                            <div className='reviewPageRight'>
                                <h3>Rate and review delivery service:</h3>
                                <div className='Reviewstars'>
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                </div>
                                <textarea name="" id="" placeholder='How is your overall delivery experience?'></textarea>
                            </div>
                        </div>
                    </div>
                    <div className='reviewPage'>
                        <div className='reviewPageTop'>
                            <p>Purchased on 24 Jan 2025</p>
                            <span>Your product rating & review:</span>
                        </div>
                        <div className='reviewPageFlex'>
                            <div className='reviewPageLeft'>
                                <div className='reviewPageLeftImage'>
                                    <img src={reviewproduct} alt="" />
                                </div>
                                <div className='reviewpageProductDetails'>
                                    <h2>HP EliteBook Hewlett-Packard Laptop HP ProBook 450 G4</h2>
                                    <p>Rs. 79,000</p>
                                    <span>Rs 109,000</span>
                                    <span>Installments Available</span>
                                    <div className='Reviewstars'>
                                        <img src={star} alt="" />
                                        <img src={star} alt="" />
                                        <img src={star} alt="" />
                                        <img src={star} alt="" />
                                        <img src={star} alt="" />
                                        <span>Delightful</span>
                                    </div>
                                    <textarea name="" id="" placeholder='What do you think about this product?'></textarea>
                                </div>
                            </div>
                            <div className='reviewPageRight'>
                                <h3>Rate and review delivery service:</h3>
                                <div className='Reviewstars'>
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                </div>
                                <textarea name="" id="" placeholder='How is your overall delivery experience?'></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default AfterReviewPage
