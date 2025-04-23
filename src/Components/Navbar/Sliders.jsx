import React from "react";
import "./CSS/sliderStyles.css";
import banner2 from "./CSS/Assets/Banners/b(2).png";
import banner3 from "./CSS/Assets/Banners/b(3).png";
import banner4 from "./CSS/Assets/Banners/b(4).png";

const Sliders = () => {
  return (
    <>
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={banner2} className="d-block w-100" alt="Banner 2" />
        </div>
        <div className="carousel-item">
          <img src={banner3} className="d-block w-100" alt="Banner 3" />
        </div>
        <div className="carousel-item">
          <img src={banner4} className="d-block w-100" alt="Banner 4" />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>

    {/* <OldSlider/> */}
    </>
  );
};

export default Sliders;
