import React from 'react'
import DShopLeft from '../components/DShopLeft'
import DShopRight from '../components/DShopRight'
import FooterTop from '../../Footer/FooterTop'
import Footer from '../../Footer/Footer'

function DehlezeShopPage() {
    return (
        <>
            <div className='Ycontainer YshopPage'>
                <div className='YShopFlex YglobalFlex'>
                    <DShopLeft />
                    <DShopRight />
                </div>
            </div>
            <FooterTop />
            <Footer />
        </>
    )
}

export default DehlezeShopPage