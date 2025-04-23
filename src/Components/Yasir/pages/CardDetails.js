import React from 'react'
import '../../CardDetails/CardDetails.css'
import visa from '../../CardDetails/visa.png'
import mastercard from '../../CardDetails/mastercard.png'
import FooterTop from '../../Footer/FooterTop'
import Footer from '../../Footer/Footer'

function CardDetails() {
    return (
        <>
            <div className='cardDetailsPage'>
                <div className='selectPaymentcontainer'>
                    <div className='cardDetailsMainDiv'>
                        <div className='cardDetailsTop'>
                            <div>
                                <img src={visa} alt="" />
                            </div>
                            <div>
                                <img src={mastercard} alt="" />
                            </div>
                        </div>

                        <div className='cardDetailsForm'>
                            <div className='cardDetailsFormContent'>
                                <div className='cardDetailsFormInputs'>
                                    <label htmlFor="">Card Number <span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" name="" id="" placeholder='Card Number' />
                                </div>
                                <div className='cardDetailsFormInputs'>
                                    <label htmlFor="">Expiration Date <span style={{ color: 'red' }}>*</span></label>
                                    <input type="date" name="" id="" style={{ color: 'gray' }} />
                                </div>
                            </div>
                            <div className='cardDetailsFormContent'>
                                <div className='cardDetailsFormInputs'>
                                    <label htmlFor="">Name on Card <span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" name="" id="" placeholder='Name on Card' />
                                </div>
                                <div className='cardDetailsFormInputs'>
                                    <label htmlFor="">CVV <span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" name="" id="" placeholder='CVV' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='cardDetailsBtnSection'>
                        <label class="checkbox-wrapper">
                            <p>We will save this card for your convenience. If required,
                                you can remove the card in the “Payment Options” </p>
                            <input type="checkbox" />
                            <span class="custom-checkbox"></span>
                        </label>
                    </div>
                    <button className='paynowBtn'>Pay Now</button>
                </div>
            </div>
            {/* Mobile View  */}

            <div className='selectPaymentcontainer'>
                <div className='cardDetailsPageMobileView'>
                    <div className='cardDetailsPageMobileViewBox'>
                        <div>
                            <input type="text" name="" id="" placeholder='Name on Card' className='cardDetailMobileViewInputs' />
                        </div>
                        <div className='cardDetailCardFlex'>
                            <input type="text" name="" id="" placeholder='Card Number' />
                            <div className='cardDetailCardImageFlex'>
                                <img src={visa} alt="" />
                                <img src={mastercard} alt="" />
                            </div>
                        </div>
                        <div>
                            <input type="date" name="" id="" placeholder='Expiration Date (MM/YY)' className='cardDetailMobileViewInputs' style={{ color: 'gray' }} />
                            <input type="text" name="" id="" placeholder='CVV' className='cardDetailMobileViewInputs' />
                        </div>
                    </div>
                    <p>We will save this card for your convenience. If required,
                        you can remove the card in the “Payment Options” </p>
                    <button className='paynowBtn'>Pay Now</button>
                </div>
            </div>
            <FooterTop />
            <Footer />
        </>
    )
}

export default CardDetails
