import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "./CSS/Categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://39.61.51.195:8004/account/category/")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // react slider
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 4,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {/* react slider */}
      <Slider {...settings}>
        {categories.map((category) => (
          <div className="slide-category-card">
            <Link
              key={category.category_id}
              to={`/products?category=${category.category_id}`}
              className="slide-category-link"
            >
              <img
                src={category.image}
                alt={category.name}
                className="slide-category-image"
                style={{
                  display: "ruby",
                }}
              />

              <p className="slide-category-name">{category.name}</p>
            </Link>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Categories;
