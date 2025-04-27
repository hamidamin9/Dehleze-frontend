import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./Feature.css";
import { useUserContext } from "../../Context/Context";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const placeholderImage = "https://via.placeholder.com/150";
  const { addToCart, cart } = useUserContext();

  const handleAddToCart = (product) => {
    if (product.stock === 0) {
      toast.error("Sorry, this product is out of stock!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const exists = cart.some((item) => item.id === product.id);
    if (exists) {
      toast.warn("Product already exists in the cart!", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      addToCart(product);
      toast.success("Product added to cart successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleViewDetails = (product) => {
    if (product.stock === 0) {
      toast.error("Sorry, this product is out of stock!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    window.location.href = `/product/${product.id}`;
  };

  useEffect(() => {
    axios
      .get("http://39.61.51.195:8004/product-create/")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://39.61.51.195:8004/account/category/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const filterByCategory = (categoryId) => {
    setActiveCategory(categoryId);
    if (categoryId === null) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category_Id === categoryId
      );
      setFilteredProducts(filtered);
    }
  };

  const calculateDiscountedPrice = (price) => {
    return (price * 0.95).toFixed(2);
  };

  const capitalizeWords = (string) => {
    if (!string) return "";
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // 👉 A function to decide correct image URL
  const getProductImage = (product) => {
    return product?.color_image ||
           product?.product_image ||
           (product?.images && product?.images[0]?.image) ||
           placeholderImage;
  };

  return (
    <>
      <Swiper
        spaceBetween={10}
        slidesPerView={6}
        navigation={true}
        modules={[Navigation]}
        className="category-carousel"
      >
        <SwiperSlide>
          <button
            onClick={() => filterByCategory(null)}
            className={`category-item ${activeCategory === null ? "active" : ""}`}
          >
            All
          </button>
        </SwiperSlide>
        {categories.map((category) => (
          <SwiperSlide key={category.category_id}>
            <button
              onClick={() => filterByCategory(category.category_id)}
              className={`category-item ${
                activeCategory === category.category_id ? "active" : ""
              }`}
            >
              {capitalizeWords(category.name)}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="products-container mt-3"
        style={{ margin: "0", backgroundColor: "rgb(240 238 238)" }}
      >
        {filteredProducts.length > 0 ? (
          <div className="products-container yfeatureFlex">
            {filteredProducts
              .filter((product) => product.feature_product === "Normal")
              .map((product) => (
                <div
                  key={product.id}
                  className="product-card featureproduct-card"
                >
                  <div className="discount-product-badge">
                    {product?.discount_percentage}
                  </div>

                  <div className="product-image-container">
                    <img
                      src={getProductImage(product)}
                      alt={product.name}
                      className="product-image"
                      onError={(e) => { e.target.src = placeholderImage; }}
                    />
                    <div className="hover-icons">
                      <div className="icon">
                        <i className="fa fa-heart" aria-hidden="true"></i>
                      </div>
                      <div
                        className="icon"
                        onClick={() => handleAddToCart(product)}
                      >
                        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                      </div>
                      <div
                        className="icon"
                        onClick={() => handleViewDetails(product)}
                      >
                        <i className="fa fa-eye" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>

                  <div className="p-title" style={{ textAlign: "center", justifyContent: "center" }}>
                    <h4 className="h4-title">{capitalizeWords(product.name)}</h4>
                  </div>

                  <p style={{ color: "#ff4444" }}>
                    <del>PK{product.price}</del>
                    <span> PK{calculateDiscountedPrice(product.price)}</span>
                  </p>

                  <Link
                    className="view-btn yFeatureViewBtn"
                    to={`/product/${product.id}`}
                  >
                    View Details
                  </Link>
                </div>
              ))}
          </div>
        ) : (
          <div className="no-products-message pt-2 pb-4">
            <h3>Sorry, no products available in this category!</h3>
          </div>
        )}
      </div>

      <ToastContainer />
    </>
  );
};

export default ProductsPage;
