import React from "react";
import ban1 from "./CSS/Assets/Banners/b(2).png";
import ban2 from "./CSS/Assets/Banners/b(3).png";
// import ban3 from "./CSS/Assets/Banners/b(4).png";
import ban3 from "./CSS/Assets/Banners/old.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const PageOne = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <Slider
        {...settings}
        className="slick-slider"
        style={{
        //   background: "linear-gradient(90deg, #60ACF8 0%, #0073E6 100%)",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div>
            <img
              src={ban1}
              alt="Slide 1"
              className="w-full h-auto object-cover cursor-pointer"
            />
        </div>
        
          <div>
            <img
              src={ban2}
              alt="Slide 2"
              className="w-full h-auto object-cover cursor-pointer"
              
            />
          </div>
        
        
          <div>
            <img
              src={ban3}
              alt="Slide 3"
              className="w-full h-auto object-cover cursor-pointer"
              
            />
          </div>
        
        
          <div>
            <img
              src={ban1}
              alt="Slide 4"
              className="w-full h-auto object-cover cursor-pointer"
              
            />
          </div>
        
      </Slider>
    </>
  );
};

export default PageOne;
