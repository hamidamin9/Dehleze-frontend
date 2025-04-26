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
  const [categories, setCategories] = useState([]); // State for category data
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("description");
  const { addToCart, user, cart } = useUserContext();
  const [quantity, setQuantity] = useState(1);
  const [variations, setVariations] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [displayedPrice, setDisplayedPrice] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();

  // Fetch product details and reviews
  useEffect(() => {
    fetch(`http://39.61.51.195:8004/product/${id}/`)
    .then((response) => response.json())
    .then((data) => {
      setProduct(data);
      console.log("products", data);
      
      // Use color_image if available, otherwise first image
      setSelectedImage(data.color_image || data.images[0]?.image);
    })
    .catch((error) => console.error("Error fetching product details:", error));

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
        console.log("variations",data)
        if (data.length > 0) {
          setSelectedColor(data[0].color); // Default to the first variation's color
          setDisplayedPrice(data[0].price); // Default price
        }
      })
      .catch((error) =>
        console.error("Error fetching product variations:", error)
      );
  }, [id]);

  // useEffect(() => {
  //   axios
  //     .get(`http://39.61.51.195:8004/product/${id}/variations/`)
  //     .then((response) => {
  //       if (response.data.length > 0) {
  //         setVariations(response.data); // ✅ Directly store product variations
  //         setSelectedColor(response.data[0].color); // ✅ Default color
  //         setDisplayedPrice(response.data[0].price); // ✅ Default price
  //       } else {
  //         setVariations([]); // ✅ Ensure no old data remains
  //         setSelectedColor(null);
  //         setDisplayedPrice(null);
  //       }
  //     })
  //     .catch((error) => console.error("Error fetching product variations:", error));
  // }, [id]);

  const uniqueColors = Array.from(
    new Set(variations.map((variation) => variation.color))
  );

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
      <div className="product-details-container mt-5">
        <div className="product-details">
          <div className="ySingleProductpageflex">
            <div className="yextra">
              <div className="product-images">
                <div className="thumbnail-container">
                  {product.images.map((img) => (
                    <img
                      key={img.id}
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
                    <img
                      src="/images/singleproductpageimages/star.png"
                      alt=""
                    />
                    <p>4.3/5(91) - {product.stock}</p>
                  </div>
                  <div className="ySinglePagePriceFlexContent">
                    <img
                      src="/images/singleproductpageimages/star.png"
                      alt=""
                    />
                    <p>94%</p>
                  </div>
                  <div className="ySinglePagePriceFlexContent">
                    <img
                      src="/images/singleproductpageimages/star.png"
                      alt=""
                    />
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
                      {" "}
                      Rs
                      {calculateDiscountedPrice(
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
                      Rs {product.price}{" "}
                    </del>{" "}
                  </div>
                  <div>
                    <img
                      src="/images/singleproductpageimages/info.png"
                      alt=""
                    />
                  </div>
                </p>

                {/* <p className="product-description"> {product.description}</p>

              <div className="product-variations">
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

                {variations.length > 0 ? (
                  <div
                    className="ySinglePageColor"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "1rem",
                    }}
                  >
                    <p>Colors</p>
                    <div>
                      {uniqueColors.map((color, index) => (
                        <button
                          key={color} // ✅ Now guaranteed unique because duplicates are removed
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
                ) : (
                  <p>No variations found!</p>
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
                <p>Smart Tech (Lahore)</p>
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
    </>
  );
};

export default ProductDetails;

// import React, { useEffect, useState } from "react";
// import { NavLink, useNavigate, useParams } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import ProductsPage from "../../Products/Product";
// import { useUserContext } from "../../Context/Context";
// import Footer from "../../Footer/Footer";
// import Bestsellingproducts from "../../Products/BestSellingProducts/Bestsellingproducts";
// import DailyDeals from "../../Products/DealyDeals/DailyDeals";
// import FooterTop from "../../Footer/FooterTop";
// import Categories from "../../Category/Category";
// import axios from 'axios'

// const ProductDetails = () => {
//   const { id } = useParams();
//   console.log("ID", id)
//   const [product, setProduct] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [zoomStyle, setZoomStyle] = useState({});
//   const [categories, setCategories] = useState([]); // State for category data
//   const [reviews, setReviews] = useState([]);
//   const [activeTab, setActiveTab] = useState("description");
//   const { addToCart, user, cart } = useUserContext();
//   const [quantity, setQuantity] = useState(1);
//   const [variations, setVariations] = useState([]);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [displayedPrice, setDisplayedPrice] = useState(null);
//   const [isExpanded, setIsExpanded] = useState(false);

//   const navigate = useNavigate();

//   // Fetch product details and reviews
//   useEffect(() => {
//     fetch(`http://39.61.51.195:8004/product/${id}/`)
//       .then((response) => response.json())
//       .then((data) => {
//         setProduct(data);
//         setSelectedImage(data.images[0]?.image);
//       })
//       .catch((error) =>
//         console.error("Error fetching product details:", error)
//       );

//     fetch(`http://39.61.51.195:8004/reviews/?product=${id}`)
//       .then((response) => response.json())
//       .then((data) => setReviews(data))
//       .catch((error) => console.error("Error fetching reviews:", error));

//     // Fetch category data
//     fetch("http://39.61.51.195:8004/account/category/")
//       .then((response) => response.json())
//       .then((data) => setCategories(data))
//       .catch((error) => console.error("Error fetching categories:", error));

//   }, [id]);

//   useEffect(() => {
//     axios
//       .get(`http://39.61.51.195:8004/product/${id}/variations/`)
//       .then((response) => {
//         if (response.data.length > 0) {
//           setVariations(response.data); // ✅ Directly store product variations
//           setSelectedColor(response.data[0].color); // ✅ Default color
//           setDisplayedPrice(response.data[0].price); // ✅ Default price
//         } else {
//           setVariations([]); // ✅ Ensure no old data remains
//           setSelectedColor(null);
//           setDisplayedPrice(null);
//         }
//       })
//       .catch((error) => console.error("Error fetching product variations:", error));
//   }, [id]);

//   console.log(variations, 'variations')

//   // ✅ Remove duplicates & ensure colors are relevant to this product
//   const uniqueColors = Array.from(new Set(variations.map((variation) => variation.color)));

//   const handleBuyNow = async () => {
//     console.log("Buy Now button clicked!"); // Debugging log

//     if (!user || !user.id) {
//       console.log("User is not logged in!");
//       toast.error("You need to log in to place an order!");
//       navigate("/login");
//       return;
//     }

//     if (!product || !product.id) {
//       console.log("Product details are missing!");
//       toast.error("Product details are missing!");
//       return;
//     }

//     if (!selectedColor) {
//       console.log("No color selected!");
//       toast.error("Please select a color first!");
//       return;
//     }

//     const orderData = {
//       name: user.name || "Guest",
//       ordered_item: quantity,
//       Phone_no: user.phone || "No phone number provided",
//       address: user.address || "No address provided",
//       total_price: (displayedPrice * quantity).toFixed(2),
//       order_status: "processing",
//       refund_status: "not_requested",
//       clear_status: "not_clear",
//       user: user.id,
//       product: product.id,
//       seller: product.seller_id || null,
//     };

//     console.log("Order Data:", orderData); // Debugging log

//     try {
//       const response = await fetch("http://39.61.51.195:8004/account/create-order/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       });

//       console.log("Response Status:", response.status); // Debugging log

//       if (response.ok) {
//         const responseData = await response.json();
//         console.log("Order Response Data:", responseData);
//         toast.success("Order placed successfully!");
//         navigate("/checkout");
//       } else {
//         const errorData = await response.json();
//         console.error("Error Response Data:", errorData);
//         toast.error(`Failed to place order: ${errorData.message || response.statusText}`);
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//       toast.error("An error occurred. Please try again.");
//     }
//   };

//   const handleMouseMove = (e) => {
//     const { left, top, width, height } = e.target.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;

//     setZoomStyle({
//       backgroundImage: `url(${selectedImage})`,
//       backgroundPosition: `${x}% ${y}%`,
//       backgroundSize: "200%",
//     });
//   };

//   const handleMouseLeave = () => {
//     setZoomStyle({});
//   };

//   if (!product) return <div>Loading...</div>;

//   const handleAddToCart = (product) => {
//     if (!user || !user.id) {
//       toast.error("User is not logged in!");
//       return;
//     }

//     if (!product || !product.id) {
//       toast.error("Product details are missing!");
//       return;
//     }

//     const alreadyInCart = cart.some((item) => item.id === product.id);

//     if (alreadyInCart) {
//       toast.info("Product is already in the cart!");
//     } else {
//       addToCart(product);
//       toast.success("Product added to cart successfully!");
//     }
//   };

//   // const handleAddToCart = (product) => {
//   //   if (!user || !user.id) {
//   //     toast.error("User is not logged in!");
//   //     return;
//   //   }

//   //   if (!product || !product.id) {
//   //     toast.error("Product details are missing!");
//   //     return;
//   //   }

//   //   if (!selectedColor) {
//   //     toast.error("Please select a color first!");
//   //     return;
//   //   }

//   //   addToCart({
//   //     id: product.id,
//   //     name: product.name,
//   //     price: displayedPrice,
//   //     color: selectedColor,
//   //     image: selectedImage,
//   //     quantity,
//   //   });

//   //   axios
//   //     .post("http://39.61.51.195:8004/account/create-order/", {
//   //       user: user.id,
//   //       product: product.id,
//   //       color: selectedColor,  // ✅ Ensure selected color is sent
//   //       quantity,
//   //     })
//   //     .then(() => toast.success("Product added to cart successfully!"))
//   //     .catch((error) => {
//   //       console.error("Error adding to cart:", error);
//   //       toast.error("Failed to add to cart. Please try again.");
//   //     });
//   // };

//   const calculateDiscountedPrice = (price, discountPercentage) => {
//     const numericPrice = parseFloat(price); // Ensure price is a number
//     if (isNaN(numericPrice)) {
//       return "N/A"; // Return a fallback value if price is invalid
//     }
//     if (!discountPercentage || discountPercentage <= 0) {
//       return numericPrice.toFixed(2); // Return original price if no discount is applicable
//     }
//     const discountAmount = (numericPrice * discountPercentage) / 100;
//     return (numericPrice - discountAmount).toFixed(2);
//   };

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   // Find the category name based on the category ID
//   const getCategoryName = (categoryId) => {
//     const category = categories.find((cat) => cat.category_id === categoryId);
//     return category ? category.name : "Category Not Found";
//   };

//   const incrementQuantity = () => setQuantity((prev) => prev + 1);
//   const decrementQuantity = () => {
//     if (quantity > 1) setQuantity((prev) => prev - 1);
//   };

//   const handleColorClick = (color) => {
//     setSelectedColor(color);
//     const selectedVariation = variations.find((variation) => variation.color === color);
//     if (selectedVariation) {
//       setDisplayedPrice(selectedVariation.price);
//     }
//   };

//   if (!product) return <div>Loading...</div>;

//   return (
//     <>
//       <div className="product-details-container mt-5">
//         <div className="product-details">
//           <div className="ySingleProductpageflex">
//             <div className="yextra">
//               <div className="product-images">
//                 <div className="thumbnail-container">
//                   {product.images.map((img) => (
//                     <img
//                       key={img.id}
//                       src={img.image}
//                       alt={`${product.name} thumbnail`}
//                       className={`thumbnail ${selectedImage === img.image ? "selected" : ""
//                         }`}
//                       onClick={() => setSelectedImage(img.image)}
//                     />
//                   ))}
//                 </div>
//                 <div
//                   className="main-image-container"
//                   onMouseMove={handleMouseMove}
//                   onMouseLeave={handleMouseLeave}
//                   style={zoomStyle}
//                 >
//                   <img
//                     src={selectedImage}
//                     alt={product.name}
//                     className="main-image"
//                     style={zoomStyle.backgroundImage ? { opacity: 0 } : {}}
//                   />
//                 </div>
//               </div>
//               <div className="product-info">
//                 <h1 className="product-name">{product.name}</h1>

//                 <div className="ySinglePagePriceFlex">
//                   <div className="ySinglePagePriceFlexContent">
//                     <img src="/images/singleproductpageimages/star.png" alt="" />
//                     <p>4.3/5(91) - {product.stock}</p>
//                   </div>
//                   <div className="ySinglePagePriceFlexContent">
//                     <img src="/images/singleproductpageimages/star.png" alt="" />
//                     <p>94%</p>
//                   </div>
//                   <div className="ySinglePagePriceFlexContent">
//                     <img src="/images/singleproductpageimages/star.png" alt="" />
//                     <p>8</p>
//                   </div>
//                 </div>

//                 <p className="productprice">
//                   <div>
//                     <span style={{ color: "rgba(0, 0, 0, 1)", fontSize: '16.96px', fontWeight: "bold" }}>
//                       {" "}
//                       Rs
//                       {calculateDiscountedPrice(
//                         product.price,
//                         product.discount_percentage
//                       )}
//                     </span>
//                     &nbsp;
//                     &nbsp;
//                     <del style={{ color: 'rgba(177, 177, 177, 1)', fontSize: '15.08px' }}>Rs {product.price} </del>{" "}
//                   </div>
//                   <div>
//                     <img src="/images/singleproductpageimages/info.png" alt="" />
//                   </div>
//                 </p>

//                 {/* <p className="product-description"> {product.description}</p>

//               <div className="product-variations">
//                 {variations.length > 0 ? (
//                   variations
//                     .filter((variation) => variation.pro_id === product.id)
//                     .map((variation) => (
//                       <div>
//                         <div>
//                           <h5>Size</h5>
//                           <button>{variation.size_number}</button>
//                         </div>
//                         <div>
//                           <h5>Colors</h5>
//                           <button
//                             key={variation.id}
//                             style={{
//                               backgroundColor: variation.color,
//                               width: "30px",
//                               height: "30px",
//                               borderRadius: "50%",
//                               border: "2px solid #FF8000",
//                               border:
//                                 selectedColor === variation.color
//                                   ? "2px solid #FF8000"
//                                   : "2px solid gray",
//                               cursor: "pointer",
//                             }}
//                             onClick={() => handleColorClick(variation.color)}
//                           />
//                         </div>
//                       </div>
//                     ))
//                 ) : (
//                   <p>No variations available for this product.</p>
//                 )}
//               </div> */}

//                 {/* <div className="phone-responsive">
//                 <p>
//                   <strong>Category: </strong>{" "}
//                   {getCategoryName(product.category_Id) ||
//                     "New Item/Category Not Defined"}
//                 </p>
//                 <p>
//                   <strong>Stock: </strong> {product.stock}
//                 </p>
//               </div> */}

//                 {/* Product quantity */}
//                 {/* <div className="quantity-control">
//                 <button className="quantity-btn" onClick={decrementQuantity}>
//                   &ndash;
//                 </button>
//                 <input
//                   type="text"
//                   className="quantity-input"
//                   value={quantity}
//                   readOnly
//                 />
//                 <button className="quantity-btn" onClick={incrementQuantity}>
//                   +
//                 </button>
//               </div> */}

// {
//   variations.length > 0 ? (
//     <div className="ySinglePageColor" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
//       <p>Colors</p>
//       <div>
//         {uniqueColors.map((color, index) => (
//           <button
//             key={color} // ✅ Now guaranteed unique because duplicates are removed
//             style={{
//               backgroundColor: color,
//               width: "20px",
//               height: "20px",
//               borderRadius: "50%",
//               border: selectedColor === color ? "3px solid #FF8000" : "1px solid gray",
//               cursor: "pointer",
//               marginRight: "10px",
//             }}
//             onClick={() => handleColorClick(color)}
//           />
//         ))}
//       </div>

//     </div>
//   ) : <p>No variations found!</p>
// }

//                 <div className="button-container">
//                   <button
//                     className="buy-now-btn"
//                     onClick={() => handleAddToCart(product)}
//                   >
//                     Add to Cart
//                   </button>
//                   <button className="buy-now-btn" onClick={handleBuyNow}>
//                     Buy Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="ySinglePageLast">
//               <div className="ySinglePageLastBoxFlex">
//                 <div className="ySinglePageLastContent">
//                   <div className="yImageDiv">
//                     <img src="/images/singleproductpageimages/Shuttle.png" alt="" />
//                   </div>
//                   <div>
//                     <p>Free Delivery</p>
//                     <span>From $99</span>
//                   </div>
//                 </div>
//                 <div className="ySinglePageLastContent">
//                   <div className="yImageDiv">
//                     <img src="/images/singleproductpageimages/Money.png" alt="" />
//                   </div>
//                   <div>
//                     <p>Free Delivery</p>
//                     <span>From $99</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="ySinglePageLastInfo">
//                 <span>Sold by</span>
//                 <p>Smart Tech (Lahore)</p>
//                 <div className="ySinglePageLastSellerInfo">
//                   <div className="ySinglePageLastSellerInfoFlex">
//                     <div className="ySinglePageLastSellerInfoFlexContent">
//                       <span>Positive Seller Ratings</span>
//                       <p>85%</p>
//                     </div>
//                     <div className="ySinglePageLastSellerInfoFlexContent">
//                       <span>Ship on Time</span>
//                       <p>50%</p>
//                     </div>
//                     <div className="ySinglePageLastSellerInfoFlexContent">
//                       <span>Chat Response Rate</span>
//                       <p>65%</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <p className="product-description">
//             {isExpanded ? product.description : `${product.description.slice(0, 250)}...`}
//             <button onClick={() => setIsExpanded(!isExpanded)} className="read-more-btn">
//               {isExpanded ? " Read Less" : " Read More"}
//             </button>
//           </p>
//           <div className="button-container Addtocartformobile">
//             <button
//               className="buy-now-btn"
//               onClick={() => handleAddToCart(product)}
//             >
//               Add to Cart
//             </button>
//             <button
//               className="buy-now-btn"
//               onClick={() =>
//                 navigate(`/create-order/${product.id}`, {
//                   state: {
//                     product,
//                     quantity,
//                     discountedPrice: calculateDiscountedPrice(
//                       product.price,
//                       product.discount_percentage
//                     ),
//                   },
//                 })
//               }
//             >
//               Buy Now
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="cate-heading" style={{ marginBottom: "3rem" }}>
//         <h2 className="">Popular Categories</h2>
//       </div>
//       <Categories />
//       <div className="cate-heading" style={{ marginBottom: "3rem" }}>
//         <h2 className="">Best selling products</h2>
//       </div>
//       <Bestsellingproducts />
//       <div className="cate-heading" style={{ marginBottom: "3rem" }}>
//         <h2 className="">Daily Deals</h2>
//       </div>
//       <DailyDeals />
//       <FooterTop />
//       <Footer />
//     </>
//   );
// };

// export default ProductDetails;
