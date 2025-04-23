import React from 'react'
import YContactPageLeft from '../components/YContactPageLeft'
import YContactPageRight from '../components/YContactPageRight'
import ContactPageSwiper from '../components/ContactPageSwiper'
import ContactPageMap from '../components/ContactPageMap'
import ContactPageNewsLetter from '../components/ContactPageNewsLetter'

function ContactPage() {
    return (
        <>
            <div className='Ycontainer'>
                <div className='yContactUsPage'>
                    <ContactPageMap />
                    <div className='YglobalFlex contactPageFlex'>
                        <YContactPageLeft />
                        <YContactPageRight />
                    </div>
                    {/* <ContactPageSwiper /> */}
                    {/* <ContactPageNewsLetter /> */}
                </div>
            </div>
        </>
    )
}

export default ContactPage