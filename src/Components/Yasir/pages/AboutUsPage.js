import React from 'react'
import DAboutusTopPagination from '../YtopPagesPagination/DAboutusTopPagination'
import YAboutUsPageIcons from '../components/YAboutUsPageIcons'
import ContactPageSwiper from '../components/ContactPageSwiper'
import ContactPageNewsLetter from '../components/ContactPageNewsLetter'
import YaboutUsGallery from '../components/YaboutUsGallery'
import YaboutUsTeam from '../components/YaboutUsTeam'

function AboutUsPage() {
    return (
        <>
            <div className='Ycontainer'>
                <div className='yAboutUsPage'>
                    {/* <div className='yAboutUsBannerImage'>
                        <img src="/images/AboutUsImages/aboutusBanner.jpg" alt="about us banner image" />
                    </div> */}
                    <div className='yAboutUsPageDetails'>
                        <h2>Welcome to Dehleze</h2>
                        <h3>About Dehleze</h3>
                        <p>Welcome to Dehleze, your go-to e-commerce store offering a wide range of high-quality products designed to make your shopping experience seamless and enjoyable. Our platform provides an intuitive interface where you can easily browse through categories like fashion, electronics, home essentials, and more. Whether you're shopping for yourself or for a loved one, Dehleze ensures that you find exactly what you need with convenience and reliability.

                            At Dehleze, we are committed to providing an easy, secure, and fast shopping experience. Our website is designed with your needs in mind, from easy navigation to secure payment options, and fast delivery services. We pride ourselves on exceptional customer support, ready to assist you with any inquiries or issues.

                            With a focus on quality, convenience, and customer satisfaction, Dehleze is here to transform the way you shop online. Thank you for choosing us!</p>
                        <YAboutUsPageIcons />
                    </div>
                </div>
            </div>
            <YaboutUsGallery />
            <div className='Ycontainer'>
                {/* <YaboutUsTeam /> */}
                {/* <ContactPageSwiper /> */}
                {/* <ContactPageNewsLetter /> */}
            </div>
        </>
    )
}

export default AboutUsPage