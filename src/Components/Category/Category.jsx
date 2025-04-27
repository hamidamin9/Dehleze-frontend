import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "./CSS/Categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  console.log("Categories:", categories);

  useEffect(() => {
    fetch("http://39.61.51.195:8004/account/category/")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const getCategorie = (category) => {
    return category.image ||
           category.image ||
           (category.images && category.images[0]?.image) 
  };

  // React slider settings
  const settings = {
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
      {/* React slider */}
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category.category_id} className="slide-category-card">
            <Link
              to={`/products?category=${category.category_id}`}
              className="slide-category-link"
            >
              <img
                src={getCategorie(category)}
                alt={category?.name || "Category Image"}
                className="slide-category-image"
                style={{ display: "block" }}
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
