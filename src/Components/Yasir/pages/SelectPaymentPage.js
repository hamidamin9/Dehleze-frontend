import React from 'react'
import '../../SelectPaymentPage/SelectPayment.css'
import Creditcard from '../../SelectPaymentPage/Creditcard.png'
import Dollar from '../../SelectPaymentPage/Dollar.png'
import ep from '../../SelectPaymentPage/ep.png'
import jc from '../../SelectPaymentPage/jc.png'
import installment from '../../SelectPaymentPage/installment.png'
import Onlinebanking from '../../SelectPaymentPage/Onlinebanking.png'
import visa from '../../SelectPaymentPage/visa.png'
import mastercard from '../../SelectPaymentPage/mastercard.png'
import arrow from '../../SelectPaymentPage/arrow.png'
import walletsaab from '../../SelectPaymentPage/walletsaab.png'
import Footer from '../../Footer/Footer'
import FooterTop from '../../Footer/FooterTop'

function SelectPaymentPage() {
    return (
        <>
            <div className='selectPaymentPage'>
                <div className='selectPaymentcontainer'>
                    <div className='selectPaymentPageFlex'>
                        <div className='selecctPaymentFlexContent'>
                            <div className='ybox'>
                                <img src={Creditcard} alt="" />
                                <p>Credit Card</p>
                            </div>
                            <div className='ybox'>
                                <img src={jc} alt="" />
                                <p>Jazz cash</p>
                            </div>
                            <div className='ybox'>
                                <img src={ep} alt="" />
                                <p>Easypaisa</p>
                            </div>
                            <div className='ybox'>
                                <img src={Onlinebanking} alt="" />
                                <p>Intenet Banking</p>
                            </div>
                            <div className='ybox'>
                                <img src={installment} alt="" />
                                <p>Cash On Delivery</p>
                            </div>
                            <div className='ybox'>
                                <img src={installment} alt="" />
                                <p>Insallment</p>
                            </div>
                        </div>
                        <div className='selectPaymentFlexContent2'>
                            <h1>Order Summary</h1>
                            <div className='selectPaymentFlexContent2Content selectPaymentFlexContent2Top'>
                                <div className='selectPaymentFlexContent2TopUpperContent'>
                                    <p>Items Total(1 Items)</p>
                                    <p>Delivery Fee</p>
                                </div>
                                <div className='selectPaymentFlexContent2TopBelowContent'>
                                    <p>Rs. 75,000</p>
                                    <p>Free</p>
                                </div>
                            </div>
                            <div className='selectPaymentFlexContent2Content'>
                                <div className='selectPaymentFlexContent2Content1'>
                                    <p>Total:</p>
                                </div>
                                <div className='selectPaymentFlexContent2TopContent2'>
                                    <p>VAT included, where applicable</p>
                                    <h1>Rs 75000</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='selectPaymentFooter'>
                    <FooterTop />
                </div>
                <div className='selectPaymentMobileView'>
                    <div className='selectPaymentcontainer'>


                        <h3>Payment Method</h3>
                        <div className='selectPaymentMobileViewCreditCardPayment'>
                            <div className='selectPaymentMobileViewCreditCardPaymentContent1'>
                                <img src={Creditcard} alt="" />
                                <div>
                                    <h3>Credit/Debit Card</h3>
                                    <span>Credit/Debit Card</span>
                                </div>
                            </div>
                            <div className='selectPaymentMobileViewCreditCardPaymentContent2'>
                                <img src={visa} alt="" />
                                <img src={mastercard} alt="" />
                                <img src={arrow} alt="" id='yarrow' />
                            </div>
                        </div>
                        <h3 className='yPaymentFlexheading'>Payment Methods</h3>
                    </div>
                    <div className='ySelectedPaymentPageMiddle'>
                        <div className='yPaymentFlexMiddle'>
                            <div className='selectPaymentMobileViewCreditCardPayment yPaymentFlexMiddleContent'>
                                <div className='selectPaymentMobileViewCreditCardPaymentContent1'>
                                    <img src={jc} alt="" />
                                    <div>
                                        <h3>Jazzcash</h3>
                                    </div>
                                </div>
                                <div className='selectPaymentMobileViewCreditCardPaymentContent2'>
                                    <img src={arrow} alt="" id='yarrow' />
                                </div>
                            </div>
                        </div>
                        <div className='yPaymentFlexMiddle'>
                            <div className='selectPaymentMobileViewCreditCardPayment yPaymentFlexMiddleContent'>
                                <div className='selectPaymentMobileViewCreditCardPaymentContent1'>
                                    <img src={ep} alt="" />
                                    <div>
                                        <h3>Easypaisa</h3>
                                    </div>
                                </div>
                                <div className='selectPaymentMobileViewCreditCardPaymentContent2'>
                                    <img src={arrow} alt="" id='yarrow' />
                                </div>
                            </div>
                        </div>
                        <div className='yPaymentFlexMiddle'>
                            <div className='selectPaymentMobileViewCreditCardPayment yPaymentFlexMiddleContent'>
                                <div className='selectPaymentMobileViewCreditCardPaymentContent1'>
                                    <img src={Onlinebanking} alt="" />
                                    <div>
                                        <h3>Internet Banking/UnionPay Card</h3>
                                    </div>
                                </div>
                                <div className='selectPaymentMobileViewCreditCardPaymentContent2'>
                                    <img src={arrow} alt="" id='yarrow' />
                                </div>
                            </div>
                        </div>
                        <div className='yPaymentFlexMiddle'>
                            <div className='selectPaymentMobileViewCreditCardPayment yPaymentFlexMiddleContent'>
                                <div className='selectPaymentMobileViewCreditCardPaymentContent1'>
                                    <img src={installment} alt="" />
                                    <div>
                                        <h3>Installments</h3>
                                    </div>
                                </div>
                                <div className='selectPaymentMobileViewCreditCardPaymentContent2'>
                                    <img src={arrow} alt="" id='yarrow' />
                                </div>
                            </div>
                        </div>
                        <div className='yPaymentFlexMiddle'>
                            <div className='selectPaymentMobileViewCreditCardPayment yPaymentFlexMiddleContent'>
                                <div className='selectPaymentMobileViewCreditCardPaymentContent1'>
                                    <img src={walletsaab} alt="" />
                                    <div>
                                        <h3>Dehleez Wallet</h3>
                                    </div>
                                </div>
                                <div className='selectPaymentMobileViewCreditCardPaymentContent2'>
                                    <img src={arrow} alt="" id='yarrow' />
                                </div>
                            </div>
                        </div>
                        <div className='yPaymentFlexMiddle'>
                            <div className='selectPaymentMobileViewCreditCardPayment yPaymentFlexMiddleContent'>
                                <div className='selectPaymentMobileViewCreditCardPaymentContent1'>
                                    <img src={Dollar} alt="" />
                                    <div>
                                        <h3>Cash On Delivery</h3>
                                    </div>
                                </div>
                                <div className='selectPaymentMobileViewCreditCardPaymentContent2'>
                                    <img src={arrow} alt="" id='yarrow' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='selectPaymentcontainer'>
                        <div className='selectPaymentTotals'>
                            <div className='selectPaymentTotalsContent'>
                                <h3>Subtotal</h3>
                                <h3>Rs. 75000</h3>
                            </div>
                            <div className='selectPaymentTotalsContent'>
                                <h3>Total</h3>
                                <h1>Rs. 75000</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SelectPaymentPage
