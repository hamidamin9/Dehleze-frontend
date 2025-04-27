import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ProductsPage from "../../Products/Product";
import { useUserContext } from "../../Context/Context";
import Footer from "../../Footer/Footer";
import Bestsellingproducts from "../../Products/BestSellingProducts/Bestsellingproducts";
import DailyDeals from "../../Products/DealyDeals/DailyDeals";
import FooterTop from "../../Footer/FooterTop";
import Categories from "../../Category/Category";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomStyle, setZoomStyle] = useState({});
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("description");
  const { addToCart, user, cart } = useUserContext();
  const [quantity, setQuantity] = useState(1);
  const [variations, setVariations] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [displayedPrice, setDisplayedPrice] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);  // Loading state for product
  const [error, setError] = useState(null);  // Error state for handling failed requests

  const navigate = useNavigate();

  // Fetch product details, reviews, categories, and variations
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    const fetchProductData = async () => {
      try {
        // Fetch product details
        const productRes = await fetch(`http://39.61.51.195:8004/product/${id}/`);
        if (!productRes.ok) throw new Error("Failed to fetch product details");
        const productData = await productRes.json();

        if (productData.color_image && Array.isArray(productData.images)) {
          productData.images.unshift({ image: productData.color_image });
        }

        setProduct(productData);
        setSelectedImage(productData.color_image || productData.images?.[0]?.image || productData.images?.[0]);
        
        // Fetch reviews
        const reviewsRes = await fetch(`http://39.61.51.195:8004/reviews/?product=${id}`);
        const reviewsData = await reviewsRes.json();
        setReviews(reviewsData);
        
        // Fetch categories
        const categoriesRes = await fetch("http://39.61.51.195:8004/account/category/");
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);

        // Fetch product variations
        const variationsRes = await fetch(`http://39.61.51.195:8004/productvariation/?pro_id=${id}`);
        const variationsData = await variationsRes.json();
        setVariations(variationsData);

        if (variationsData.length > 0) {
          setSelectedColor(variationsData[0].color);
          setDisplayedPrice(variationsData[0].price);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      backgroundImage: `url(${selectedImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "200%",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
  };

  const handleAddToCart = (product) => {
    const alreadyInCart = cart.some((item) => item.id === product.id);
    if (alreadyInCart) {
      toast.info("Product is already in the cart!");
    } else {
      addToCart(product);
      toast.success("Product added to cart successfully!");
    }
  };

  const calculateDiscountedPrice = (price, discountPercentage) => {
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) return "N/A";
    if (!discountPercentage || discountPercentage <= 0) return numericPrice.toFixed(2);
    const discountAmount = (numericPrice * discountPercentage) / 100;
    return (numericPrice - discountAmount).toFixed(2);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    const selectedVariation = variations.find((variation) => variation.color === color);
    if (selectedVariation) {
      setDisplayedPrice(selectedVariation.price);
    }
  };

  const uniqueColors = Array.from(new Set(variations.map((variation) => variation.color)));

  return (
    <>
      <div className="product-details-container mt-5">
        <div className="product-details">
          <div className="ySingleProductpageflex">
            <div className="yextra">
              <div className="product-images">
                <div className="thumbnail-container">
                  {product.images.map((img) => (
                    <img
                      key={img.id}
                      src={img.image || img?.[0] || product.images?.[0]?.image}
                      alt={`${product.name} thumbnail`}
                      className={`thumbnail ${selectedImage === img.image ? "selected" : ""}`}
                      onClick={() => setSelectedImage(img.image)}
                    />
                  ))}
                </div>
                <div
                  className="main-image-container"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={zoomStyle}
                >
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="main-image"
                    style={zoomStyle.backgroundImage ? { opacity: 0 } : {}}
                  />
                </div>
              </div>
              <div className="product-info">
                <h1 className="product-name">{product.name}</h1>
                <div className="ySinglePagePriceFlex">
                  <div className="ySinglePagePriceFlexContent">
                    <img src="/images/singleproductpageimages/star.png" alt="" />
                    <p>4.3/5(91) - {product.stock}</p>
                  </div>
                  <div className="ySinglePagePriceFlexContent">
                    <img src="/images/singleproductpageimages/star.png" alt="" />
                    <p>94%</p>
                  </div>
                  <div className="ySinglePagePriceFlexContent">
                    <img src="/images/singleproductpageimages/star.png" alt="" />
                    <p>8</p>
                  </div>
                </div>
                <p className="productprice">
                  <div>
                    <span
                      style={{
                        color: "rgba(0, 0, 0, 1)",
                        fontSize: "16.96px",
                        fontWeight: "bold",
                      }}
                    >
                      Rs {calculateDiscountedPrice(product.price, product.discount_percentage)}
                    </span>
                    &nbsp; &nbsp;
                    <del style={{ color: "rgba(177, 177, 177, 1)", fontSize: "15.08px" }}>
                      Rs {product.price}
                    </del>
                  </div>
                </p>
                <div className="quantity-control">
                  <button className="quantity-btn" onClick={() => setQuantity(quantity - 1)}>-</button>
                  <input type="text" className="quantity-input" value={quantity} readOnly />
                  <button className="quantity-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                {variations.length > 0 && (
                  <div className="ySinglePageColor">
                    <p>Colors</p>
                    <div>
                      {uniqueColors.map((color) => (
                        <button
                          key={color}
                          style={{
                            backgroundColor: color,
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            border: selectedColor === color ? "3px solid #FF8000" : "1px solid gray",
                            cursor: "pointer",
                            marginRight: "10px",
                          }}
                          onClick={() => handleColorClick(color)}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div className="button-container">
                  <button className="buy-now-btn" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                  <button
                    className="buy-now-btn"
                    onClick={() => navigate(`/create-order/${product.id}`, {
                      state: { product, quantity, discountedPrice: calculateDiscountedPrice(product.price, product.discount_percentage) }
                    })}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
            <div className="ySinglePageLast">
              <div className="ySinglePageLastBoxFlex">
                <div className="ySinglePageLastContent">
                  <div className="yImageDiv">
                    <img src="/images/singleproductpageimages/Shuttle.png" alt="" />
                  </div>
                  <div>
                    <p>Free Delivery</p>
                    <span>From $99</span>
                  </div>
                </div>
                <div className="ySinglePageLastContent">
                  <div className="yImageDiv">
                    <img src="/images/singleproductpageimages/Money.png" alt="" />
                  </div>
                  <div>
                    <p>Free Delivery</p>
                    <span>From $99</span>
                  </div>
                </div>
              </div>
              <div className="ySinglePageLastInfo">
                <span>Sold by</span>
                <p>{product.seller_id}</p>
                <div className="ySinglePageLastSellerInfo">
                  <div className="ySinglePageLastSellerInfoFlex">
                    <div className="ySinglePageLastSellerInfoFlexContent">
                      <span>Positive Seller Ratings</span>
                      <p>85%</p>
                    </div>
                    <div className="ySinglePageLastSellerInfoFlexContent">
                      <span>Ship on Time</span>
                      <p>87%</p>
                    </div>
                  </div>
                  <div className="ySinglePageLastSellerInfoFlex">
                    <div className="ySinglePageLastSellerInfoFlexContent">
                      <span>Return Rate</span>
                      <p>4%</p>
                    </div>
                    <div className="ySinglePageLastSellerInfoFlexContent">
                      <span>Shipped From</span>
                      <p>UAE</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p>Sold by <strong>Smart Tech</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FooterTop />
    </>
  );
};

export default ProductDetails;
