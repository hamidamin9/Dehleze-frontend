import React from 'react';
import './CSS/Banner.css';  // Import CSS for styling
import shuttle from './bannericons/Shuttle.png'
import credit from './bannericons/Credit.png'
import money from './bannericons/Money.png'
import cs from './bannericons/CS.png'
const Banner = () => {
  // Store image URLs in an array
  const features = [
    {
      icon: shuttle,
      title: "Free Delivery",
      description: "From $99.00",
    },
    {
      icon: money,
      title: "Money Guarantee",
      description: "36 days back",
    },
    {
      icon: credit,
      title: "Payment Method",
      description: "secure payment",
    },
    {
      icon: cs,
      title: "Support 24/7",
      description: "Online 24 hours",
    },
    //  {
    //     icon: "☂️",
    //     title: "100% Safe",
    //     description: "secure shopping",
    //   },
  ];


  const bannerImages = [
    "https://demo1.wpthemego.com/themes/sw_bosmarket/wp-content/uploads/2017/12/banner1-1.jpg",
    "https://demo1.wpthemego.com/themes/sw_bosmarket/wp-content/uploads/2017/12/banner2-1.jpg",
    "https://demo1.wpthemego.com/themes/sw_bosmarket/wp-content/uploads/2017/12/banner3-1.jpg"
  ];

  return (
    <>
      <div className='pt-4'></div>
      <div className="cate-heading" style={{ marginBottom: "3rem" }}>
        <h2 className="">Discounts Offers</h2>
      </div>
      <div className="banner-container ">
        {bannerImages.map((image, index) => (
          <div key={index} className="banner-item  ">
            <img src={image} alt={`Banner ${index + 1}`} className="banner-img " />

          </div>
        ))}
      </div>
      <div className='p-3'>
        <div className="features-container">
          {features.map((feature, index) => (
            <div className="feature-item" key={index}>
              <img src={feature.icon} alt="icon picture" />
              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Banner;
