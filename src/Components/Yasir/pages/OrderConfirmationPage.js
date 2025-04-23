import React from 'react'
import DOrderConfirmationTopPagination from '../YtopPagesPagination/DOrderConfirmationTopPagination'
import YorderConfirmationTop from '../components/YorderConfirmationTop'
import YorderDetails from '../components/YorderDetails'
import ContactPageNewsLetter from '../components/ContactPageNewsLetter'

function OrderConfirmationPage() {
    return (
        <>
            <div className='Ycontainer'>
                <DOrderConfirmationTopPagination />
                <div className='yOrderConfirmationPage'>
                    <YorderConfirmationTop />
                    <YorderDetails />
                    <ContactPageNewsLetter />
                </div>
            </div>
        </>
    )
}

export default OrderConfirmationPage