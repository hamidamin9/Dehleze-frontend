import React from 'react';
// Import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function ContactPageSwiper() {
    return (
        <div className='contactPageSwiper'>
            <Swiper
                // Install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={4}
                navigation
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                <SwiperSlide>
                    <img src="/images/YcontactPageImages/br1.jpg" alt="brand image..." className='YcontactPageBrandImage'/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/images/YcontactPageImages/br2.jpg" alt="brand image..." className='YcontactPageBrandImage'/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/images/YcontactPageImages/br3.jpg" alt="brand image..." className='YcontactPageBrandImage'/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/images/YcontactPageImages/br4.jpg" alt="brand image..." className='YcontactPageBrandImage'/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/images/YcontactPageImages/br5.jpg" alt="brand image..." className='YcontactPageBrandImage'/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/images/YcontactPageImages/br6.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/images/YcontactPageImages/br7.jpg" alt="" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default ContactPageSwiper;
