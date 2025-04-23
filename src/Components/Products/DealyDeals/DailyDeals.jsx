import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./CSS/DailyDeals.css";

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const products = [
  {
    id: 1,
    image:
      "https://demo1.wpthemego.com/themes/sw_bosmarket/wp-content/uploads/2016/10/16.jpg",
    discount: 4,
    title: "Headphone",
    originalPrice: 83,
    salePrice: 80,
    description:
      "Style Code Live is a daily, live show where style enthusiasts can connect, chat, shop, and get the inside scoop on the latest fashion and beauty trends.",
    available: 13,
    sold: 8,
    countdownEnd:
      new Date().getTime() +
      3384 * 24 * 60 * 60 * 1000 +
      7 * 60 * 60 * 1000 +
      43 * 60 * 1000 +
      12 * 1000, // Mock countdown end time
  },
  {
    id: 2,
    image:
      "https://demo1.wpthemego.com/themes/sw_bosmarket/wp-content/uploads/2016/10/18.jpg",
    discount: 6,
    title: "Women Bags",
    originalPrice: 225,
    salePrice: 166,
    description:
      "Style Code Live is a daily, live show where style enthusiasts can connect, chat, shop, and get the inside scoop on the latest fashion and beauty trends.",
    available: 5,
    sold: 3,
    countdownEnd:
      new Date().getTime() +
      99 * 24 * 60 * 60 * 1000 +
      7 * 60 * 60 * 1000 +
      43 * 60 * 1000 +
      12 * 1000, // Mock countdown end time
  },
  {
    id: 3,
    image:
      "https://demo1.wpthemego.com/themes/sw_bosmarket/wp-content/uploads/2016/10/17-390x390.jpg",
    discount: 4,
    title: "Apple Monitor Desktop",
    originalPrice: 83,
    salePrice: 150,
    description:
      "Style Code Live is a daily, live show where style enthusiasts can connect, chat, shop, and get the inside scoop on the latest fashion and beauty trends.",
    available: 13,
    sold: 8,
    countdownEnd:
      new Date().getTime() +
      84 * 24 * 60 * 60 * 1000 +
      7 * 60 * 60 * 1000 +
      43 * 60 * 1000 +
      12 * 1000, // Mock countdown end time
  },
  {
    id: 4,
    image:
      "https://demo1.wpthemego.com/themes/sw_bosmarket/wp-content/uploads/2016/10/5-1-390x390.jpg",
    discount: 8,
    title: "Men LED Watch",
    originalPrice: 225,
    salePrice: 199,
    description:
      "Style Code Live is a daily, live show where style enthusiasts can connect, chat, shop, and get the inside scoop on the latest fashion and beauty trends.",
    available: 5,
    sold: 3,
    countdownEnd:
      new Date().getTime() +
      114 * 24 * 60 * 60 * 1000 +
      7 * 60 * 60 * 1000 +
      43 * 60 * 1000 +
      12 * 1000, // Mock countdown end time
  },
];

const formatTime = (time) => {
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  return `${days} DAYS : ${hours.toString().padStart(2, "0")} HOURS : ${minutes
    .toString()
    .padStart(2, "0")} MINS : ${seconds.toString().padStart(2, "0")} SECS`;
};

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const DailyDeals = () => {
  const [timers, setTimers] = useState(
    products.map((product) => product.countdownEnd - new Date().getTime())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((time, index) =>
          Math.max(products[index].countdownEnd - new Date().getTime(), 0)
        )
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="daily-deals" >
        <div className="">
          <div id="d-products-container" className="d-products-container" style={{backgroundColor:"#c2c7cf"}} >
            <Slider {...settings}>
              {products.map((product, index) => (
                <div id="d-products-container" className="d-products-container">
                  <div key={product.id} className="product-item" style={{backgroundColor:"#c2c7cf"}} >
                    <div className="product-item-image">
                      <div className="d-hover-icons">
                        <div className="p-2">
                          <div className="d-icon">
                            <i class="fa-solid fa-heart"></i>{" "}
                          </div>
                        </div>
                        <div className="p-2">
                          <div className="d-icon">
                            <i className="fa fa-eye" aria-hidden="true"></i>
                          </div>
                        </div>
                        <div className="p-2">
                          <div className="d-icon">
                            <i class="fa-solid fa-cart-shopping"></i>{" "}
                          </div>
                        </div>
                      </div>
                      <div className="discount-badge">-{product.discount}%</div>
                      <img src={product.image} alt={product.title} />
                    </div>
                    <div className="product-item-content">
                      <h4 className="d-h4">{product.title}</h4>
                      <div className="d-h4">
                        <span className="original-price">
                          ${product.originalPrice}
                        </span>
                        <span className="sale-price">${product.salePrice}</span>
                      </div>
                      <p className="d-product-description">
                        {product.description}
                      </p>
                      <div className="stock-info">
                        <div>
                          Available: <span>{product.available}</span>
                        </div>
                        <div>
                          Sold: <span>{product.sold}</span>
                        </div>
                      </div>
                      <div className="sales-bar">
                        <div
                          className="sales-bar-progress"
                          style={{
                            width: `${
                              (product.sold /
                                (product.sold + product.available)) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="countdown">
                        Hurry Up! Offers End In:{" "}
                        <div className="countdown-timer">
                          {formatTime(timers[index])}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyDeals;
