import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useUserContext } from "../Context/Context";
import "./CSS/productDetails.css";
import placeholderImage from "../Navbar/CSS/Assets/Banners/150x150.png";
import ProductsPage from "./Product";
import SingelPage2 from '../Yasir/pages/Singelpage2'


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomStyle, setZoomStyle] = useState({});
  const [categories, setCategories] = useState([]); // State for category data
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("description");
  const { addToCart, user, cart } = useUserContext();
  const [quantity, setQuantity] = useState(1);
  const [variations, setVariations] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [displayedPrice, setDisplayedPrice] = useState(null);

  const navigate = useNavigate();

  // Fetch product details and reviews
  useEffect(() => {
    fetch(`http://39.61.51.195:8004/product/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.images[0]?.image);
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );

    fetch(`http://39.61.51.195:8004/reviews/?product=${id}`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));

    // Fetch category data
    fetch("http://39.61.51.195:8004/account/category/")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch product variations
    fetch(`http://39.61.51.195:8004/productvariation/?pro_id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setVariations(data);
        if (data.length > 0) {
          setSelectedColor(data[0].color); // Default to the first variation's color
          setDisplayedPrice(data[0].price); // Default price
        }
      })
      .catch((error) =>
        console.error("Error fetching product variations:", error)
      );
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

  if (!product) return <div>Loading...</div>;

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
    const numericPrice = parseFloat(price); // Ensure price is a number
    if (isNaN(numericPrice)) {
      return "N/A"; // Return a fallback value if price is invalid
    }
    if (!discountPercentage || discountPercentage <= 0) {
      return numericPrice.toFixed(2); // Return original price if no discount is applicable
    }
    const discountAmount = (numericPrice * discountPercentage) / 100;
    return (numericPrice - discountAmount).toFixed(2);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Find the category name based on the category ID
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

  if (!product) return <div>Loading...</div>;

  return (
    <>
      {/* <div>
        <img
          src="https://demo1.wpthemego.com/themes/sw_bosmarket/wp-content/uploads/2017/12/banner8.jpg"
          alt={product.name}
          style={{ width: "100%" }}
        />
      </div> */}
      <div >
        <div >
          {/* <div>
            <div className="product-images">
              <div className="thumbnail-container">
                {product.images.map((img) => (
                  <img
                    key={img.id}
                    src={img.color_image || img.image}
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
                  src={selectedImage}
                  alt={product.name}
                  className="main-image"
                  style={zoomStyle.backgroundImage ? { opacity: 0 } : {}}
                />
              </div>
            </div>
          </div> */}

          <div >
            {/* <h1 className="product-name">{product.name}</h1> */}
            {/* <p className="productprice">
              {" "}
              <del>PK{product.price} </del>{" "}
              <span style={{ color: "#177401", fontWeight: "bold" }}>
                {" "}
                PK
                {calculateDiscountedPrice(
                  product.price,
                  product.discount_percentage
                )}
              </span>
            </p> */}

            {/* <p className="product-description"> {product.description}</p> */}

            {/* <div className="product-variations">
              {variations.length > 0 ? (
                variations
                  .filter((variation) => variation.pro_id === product.id)
                  .map((variation) => (
                    <div>
                      <div>
                        <h5>Size</h5>
                        <button>{variation.size_number}</button>
                      </div>
                      <div>
                        <h5>Colors</h5>
                        <button
                          key={variation.id}
                          style={{
                            backgroundColor: variation.color,
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            border: "2px solid #FF8000",
                            border:
                              selectedColor === variation.color
                                ? "2px solid #FF8000"
                                : "2px solid gray",
                            cursor: "pointer",
                          }}
                          onClick={() => handleColorClick(variation.color)}
                        />
                      </div>
                    </div>
                  ))
              ) : (
                <p>No variations available for this product.</p>
              )}
            </div> */}

            {/* <div className="phone-responsive">
              <p>
                <strong>Category: </strong>{" "}
                {getCategoryName(product.category_Id) ||
                  "New Item/Category Not Defined"}
              </p>
              <p>
                <strong>Stock: </strong> {product.stock}
              </p>
            </div> */}
            {/* Product quantity */}
            {/* <div className="quantity-control">
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
            </div> */}

            {/* <div className="button-container">
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
                      product,
                      quantity,
                      discountedPrice: calculateDiscountedPrice(
                        product.price,
                        product.discount_percentage
                      ),
                    },
                  })
                }
              >
                Buy Now
              </button>
            </div> */}
            <SingelPage2/>
          </div>
        </div>
      </div>

      {/* Other sections */}
      {/* <div className="product-details-container">
        <div className="tabs">
          <button
            className={`tab-button ${
              activeTab === "description" ? "active" : ""
            }`}
            onClick={() => handleTabClick("description")}
          >
            Description
          </button>
          <button
            className={`tab-button ${activeTab === "product" ? "active" : ""}`}
            onClick={() => handleTabClick("product")}
          >
            More Product
          </button>
          <button
            className={`tab-button ${
              activeTab === "vender-about" ? "active" : ""
            }`}
            onClick={() => handleTabClick("vender-about")}
          >
            Vender About
          </button>

          {activeTab === "description" && (
            <div className="mt-4">
              <p className="button-product-description">
                {product.description}
              </p>
            </div>
          )}

          {activeTab === "product" && (
            <div className="vendor-section">
              <ProductsPage />
            </div>
          )}

          {activeTab === "vender-about" && (
            <div className="pt-4">
              <div className="third-section">
                <h3>About Store/Brand</h3>
                <div>
                  <p
                    className="productprice clickable"
                    onClick={() =>
                      navigate(`/seller-store/${product.seller_id}`)
                    }
                  >
                    <strong>Store ID:</strong>{" "}
                    {product.seller_id || "New Brand"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div> */}
      {/* <div class="products-container-below-product">
        <h4> Related Products:</h4>
      </div>
      <ProductsPage /> */}
    </>
  );
};

export default ProductDetails;
