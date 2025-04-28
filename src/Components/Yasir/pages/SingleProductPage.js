import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useUserContext } from "../../Context/Context";
import Categories from "../../Category/Category";
import Bestsellingproducts from "../../Products/BestSellingProducts/Bestsellingproducts";
import DailyDeals from "../../Products/DealyDeals/DailyDeals";
import FooterTop from "../../Footer/FooterTop";
import Footer from "../../Footer/Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, user, cart } = useUserContext();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [zoomStyle, setZoomStyle] = useState({});
  const [categories, setCategories] = useState([]);
  const [variations, setVariations] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [displayedPrice, setDisplayedPrice] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const [productRes, categoriesRes, variationsRes] = await Promise.all([
          fetch(`http://39.61.51.195:8004/product/${id}/`),
          fetch("http://39.61.51.195:8004/account/category/"),
          fetch(`http://39.61.51.195:8004/productvariation/?pro_id=${id}`)
        ]);

        if (!productRes.ok || !categoriesRes.ok || !variationsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const productData = await productRes.json();
        const categoriesData = await categoriesRes.json();
        const variationsData = await variationsRes.json();

        setProduct(productData);
        setCategories(categoriesData);
        setVariations(variationsData);

        const initialImage = productData.color_image || productData.product_image || (productData.images?.[0]?.image ?? "");
        setSelectedImage(initialImage);

        if (variationsData.length > 0) {
          setSelectedColor(variationsData[0].color);
          setDisplayedPrice(variationsData[0].price);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
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
      backgroundSize: "200%"
    });
  };

  const handleMouseLeave = () => setZoomStyle({});

  const handleAddToCart = () => {
    if (!product) return;
    const alreadyInCart = cart.some(item => item.id === product.id);
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

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    const variation = variations.find(v => v.color === color);
    if (variation) {
      setDisplayedPrice(variation.price);
    }
  };

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  const uniqueColors = [...new Set(variations.map(v => v.color))];
  const discountedPrice = calculateDiscountedPrice(displayedPrice || product.price, product.discount_percentage);

  return (
    <>
      <div className="product-details-container mt-5">
        <div className="product-details">
          <div className="ySingleProductpageflex">
            <div className="yextra">
              {/* Image Section */}
              <div className="product-images">
                <div className="thumbnail-container">
                  {/* Show color_image thumbnail if exists */}
                  {product.color_image && (
                    <img
                      src={product.color_image}
                      alt="Color Variant"
                      className={`thumbnail ${selectedImage === product.color_image ? "selected" : ""}`}
                      onClick={() => setSelectedImage(product.color_image)}
                    />
                  )}

                  {/* Show product_image thumbnail if it exists and different */}
                  {product.product_image && product.product_image !== product.color_image && (
                    <img
                      src={product.product_image}
                      alt="Product Image"
                      className={`thumbnail ${selectedImage === product.product_image ? "selected" : ""}`}
                      onClick={() => setSelectedImage(product.product_image)}
                    />
                  )}

                  {/* Show other images */}
                  {product.images?.map((img, idx) => (
                    <img
                      key={idx}
                      src={img.image}
                      alt={`Thumbnail ${idx + 1}`}
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

              {/* Product Info */}
              <div className="product-info">
                <h1 className="product-name">{product.name}</h1>

                {/* Rating and Stock Info */}
                <div className="ySinglePagePriceFlex">
                  <div className="ySinglePagePriceFlexContent">
                    <img src="/images/singleproductpageimages/star.png" alt="" />
                    <p>4.3/5 (91) - {product.stock}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="productprice">
                  <span className="discounted-price">Rs {discountedPrice}</span>
                  &nbsp;
                  <del className="original-price">Rs {displayedPrice || product.price}</del>
                </div>

                {/* Quantity Control */}
                <div className="quantity-control">
                  <button className="quantity-btn" onClick={decrementQuantity}>−</button>
                  <input type="text" className="quantity-input" value={quantity} readOnly />
                  <button className="quantity-btn" onClick={incrementQuantity}>+</button>
                </div>

                {/* Color Variations */}
                {uniqueColors.length > 0 && (
                  <div className="ySinglePageColor">
                    <p>Colors</p>
                    <div>
                      {uniqueColors.map(color => (
                        <button
                          key={color}
                          style={{
                            backgroundColor: color,
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            border: selectedColor === color ? "3px solid #FF8000" : "1px solid gray",
                            marginRight: "10px",
                            cursor: "pointer"
                          }}
                          onClick={() => handleColorClick(color)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="button-container">
                  <button className="buy-now-btn" onClick={handleAddToCart}>Add to Cart</button>
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
                          discountedPrice
                        }
                      })
                    }
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="ySinglePageLast">
              <div className="ySinglePageLastBoxFlex">
                <div className="ySinglePageLastContent">
                  <div className="yImageDiv">
                    <img src="/images/singleproductpageimages/Shuttle.png" alt="" />
                  </div>
                  <div>
                    <p>Free Delivery</p>
                    <span>From Rs.99</span>
                  </div>
                </div>

                <div className="ySinglePageLastContent">
                  <div className="yImageDiv">
                    <img src="/images/singleproductpageimages/Money.png" alt="" />
                  </div>
                  <div>
                    <p>Cash on Delivery</p>
                    <span>Easy Returns</span>
                  </div>
                </div>
              </div>

              <div className="ySinglePageLastInfo">
                <span>Sold by</span>
                <p>{product.seller_id}</p>
              </div>
            </div>
          </div>

          {/* Mobile Buttons */}
          <div className="button-container Addtocartformobile">
            <button className="buy-now-btn" onClick={handleAddToCart}>Add to Cart</button>
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
                    discountedPrice
                  }
                })
              }
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Sections Below */}
      <div className="cate-heading" style={{ marginBottom: "3rem" }}>
        <h2>Popular Categories</h2>
      </div>
      <Categories />

      <div className="cate-heading" style={{ marginBottom: "3rem" }}>
        <h2>Best Selling Products</h2>
      </div>
      <Bestsellingproducts />

      <div className="cate-heading" style={{ marginBottom: "3rem" }}>
        <h2>Daily Deals</h2>
      </div>
      <DailyDeals />

      <FooterTop />
      <Footer />
      <ToastContainer />
    </>
  );
};

export default ProductDetails;
