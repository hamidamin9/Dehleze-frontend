import React, { useState } from 'react'
import '../../ReviewPage/ReviewPage.css'
import reviewproduct from '../../ReviewPage/reviewproduct.png'
import star from '../../ReviewPage/star.png'
import camera from '../../ReviewPage/Camera.png'
import FooterTop from '../../Footer/FooterTop'
import Footer from '../../Footer/Footer'

function ReviewsPage() {
    const [image, setImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };
    return (
        <>
            <div className='reviewPageContainer'>
                <div className='reviewPage'>
                    <div className='reviewPageTop'>
                        <p>Delivered on 24 Jan 2025</p>
                        <span>Rate and review purchased product:</span>
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
                                <div className="upload-container">
                                    <label htmlFor="upload-input" className="upload-box">
                                        {camera ? (
                                            <>
                                                <img src={camera} alt="Uploaded Preview" className="uploaded-image" />
                                                fdfdf
                                            </>
                                        ) : (
                                            <>
                                                <span className="camera-icon">📷</span>
                                                <p>Upload Photos</p>
                                            </>
                                        )}
                                    </label>
                                    <input
                                        type="file"
                                        id="upload-input"
                                        className="file-input"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                </div>
                                <div className='reviewImportantPoints'>
                                    <h2>Important:</h2>
                                    <ul>
                                        <li>- Maximum 6 images can be uploaded</li>
                                        <li>- Image size can be maximum 5mb</li>
                                        <li>- It takes upto 24 hours for the image to be reviewed</li>
                                    </ul>
                                </div>
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
            {/* <div className='reviewPageFooterTop'>
                <FooterTop />
            </div>
            <Footer /> */}
        </>
    )
}

export default ReviewsPage
