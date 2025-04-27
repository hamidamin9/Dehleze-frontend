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
  const [selectedImage, setSelectedImage] = useState("");
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

  const navigate = useNavigate();

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const [productRes, categoriesRes, variationsRes] = await Promise.all([
          fetch(`http://39.61.51.195:8004/product/${id}/`),
          fetch("http://39.61.51.195:8004/account/category/"),
          fetch(`http://39.61.51.195:8004/productvariation/?pro_id=${id}`)
        ]);

        if (!productRes.ok || !categoriesRes.ok || !variationsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const productData = await productRes.json();
        const categoriesData = await categoriesRes.json();
        const variationsData = await variationsRes.json();

        // Set product data
        setProduct(productData);
        
        // Set initial selected image
        if (productData.color_image) {
          setSelectedImage(productData?.product_image || productData.color_image);
        } else if (productData.images && productData.images.length > 0) {
          setSelectedImage(productData?.product_image || productData.images[0].image);
        }

        // Set categories
        setCategories(categoriesData);

        // Set variations
        setVariations(variationsData);
        if (variationsData.length > 0) {
          setSelectedColor(variationsData[0].color);
          setDisplayedPrice(variationsData[0].price);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load product details");
      }
    };

    fetchProductDetails();
  }, [id]);

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
      addToCart({
        ...product,
        quantity,
        selectedColor,
        price: displayedPrice || product.price
      });
      toast.success("Product added to cart successfully!");
    }
  };

  const calculateDiscountedPrice = (price, discountPercentage) => {
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) return "N/A";
    if (!discountPercentage || discountPercentage <= 0) {
      return numericPrice.toFixed(2);
    }
    const discountAmount = (numericPrice * discountPercentage) / 100;
    return (numericPrice - discountAmount).toFixed(2);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.category_id === categoryId);
    return category ? category.name : "Category Not Found";
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    const selectedVariation = variations.find(
      (variation) => variation.color === color
    );
    if (selectedVariation) {
      setDisplayedPrice(selectedVariation.price);
    }
  };

  if (!product) return <div className="loading">Loading...</div>;

  const uniqueColors = [...new Set(variations.map(v => v.color))];

  const getProductImage = (product) => {
    return product.color_image ||
           product?.product_image ||
           (product.images && product.images[0]?.image) 
  };

  return (
    <>
      <div className="product-details-container mt-5">
        <div className="product-details">
          <div className="ySingleProductpageflex">
            <div className="yextra">
              <div className="product-images">
                <div className="thumbnail-container">
                  {product.color_image && (
                    <img
                      src={getProductImage(product)}
                      alt={`${product.name} thumbnail`}
                      className={`thumbnail ${
                        selectedImage === product.color_image ? "selected" : ""
                      }`}
                      onClick={() => setSelectedImage(product.color_image)}
                    />
                  )}
                  {product.images?.map((img, index) => (
                    <img
                      key={index}
                      src={img.image}
                      alt={`${product.name} thumbnail`}
                      className={`thumbnail ${
                        selectedImage === img.image ? "selected" : ""
                      }`}
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
                    src={selectedImage || product?.product_image}
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
                      Rs{" "}
                      {displayedPrice
                        ? calculateDiscountedPrice(
                            displayedPrice,
                            product.discount_percentage
                          )
                        : calculateDiscountedPrice(
                            product.price,
                            product.discount_percentage
                          )}
                    </span>
                    &nbsp; &nbsp;
                    <del
                      style={{
                        color: "rgba(177, 177, 177, 1)",
                        fontSize: "15.08px",
                      }}
                    >
                      Rs {displayedPrice || product.price}
                    </del>
                  </div>
                  <div>
                    <img src="/images/singleproductpageimages/info.png" alt="" />
                  </div>
                </p>

                <div className="quantity-control">
                  <button className="quantity-btn" onClick={decrementQuantity}>
                    &ndash;
                  </button>
                  <input
                    type="text"
                    className="quantity-input"
                    value={quantity}
                    readOnly
                  />
                  <button className="quantity-btn" onClick={incrementQuantity}>
                    +
                  </button>
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
                            border:
                              selectedColor === color
                                ? "3px solid #FF8000"
                                : "1px solid gray",
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
                  <button
                    className="buy-now-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="buy-now-btn"
                    onClick={() =>
                      navigate(`/create-order/${product.id}`, {
                        state: {
                          product: {
                            ...product,
                            selectedColor,
                            quantity,
                            price: displayedPrice || product.price
                          },
                          discountedPrice: calculateDiscountedPrice(
                            displayedPrice || product.price,
                            product.discount_percentage
                          ),
                        },
                      })
                    }
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
                    <img
                      src="/images/singleproductpageimages/Shuttle.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <p>Free Delivery</p>
                    <span>From $99</span>
                  </div>
                </div>
                <div className="ySinglePageLastContent">
                  <div className="yImageDiv">
                    <img
                      src="/images/singleproductpageimages/Money.png"
                      alt=""
                    />
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
                      <p>50%</p>
                    </div>
                    <div className="ySinglePageLastSellerInfoFlexContent">
                      <span>Chat Response Rate</span>
                      <p>65%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="button-container Addtocartformobile">
            <button
              className="buy-now-btn"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
            <button
              className="buy-now-btn"
              onClick={() =>
                navigate(`/create-order/${product.id}`, {
                  state: {
                    product: {
                      ...product,
                      selectedColor,
                      quantity,
                      price: displayedPrice || product.price
                    },
                    discountedPrice: calculateDiscountedPrice(
                      displayedPrice || product.price,
                      product.discount_percentage
                    ),
                  },
                })
              }
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="cate-heading" style={{ marginBottom: "3rem" }}>
        <h2 className="">Popular Categories</h2>
      </div>
      <Categories />
      <div className="cate-heading" style={{ marginBottom: "3rem" }}>
        <h2 className="">Best selling products</h2>
      </div>
      <Bestsellingproducts />
      <div className="cate-heading" style={{ marginBottom: "3rem" }}>
        <h2 className="">Daily Deals</h2>
      </div>
      <DailyDeals />
      <FooterTop />
      <Footer />
      <ToastContainer />
    </>
  );
};

export default ProductDetails;