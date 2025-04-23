import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "../../Products/CSS/product.css";
import placeholderImage from "../../../Components/Navbar/CSS/Assets/Banners/150x150.png";
import ProductQuickView from '../../Products/QuickViewPage'
import { useUserContext } from "../../Context/Context";
// import ProductVariationAcc from "./ShopPage/ProductVariationAcc";

const Bestsellingproducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    const location = useLocation();
    const { addToCart, cart } = useUserContext(); // Destructure addToCart and cart from context
    // quick view
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showQuickView, setShowQuickView] = useState(false);

    const handleQuickView = (product) => {
        setSelectedProduct(product);
        setShowQuickView(true);
    };

    useEffect(() => {
        // Fetch products from the API
        setLoading(true); // Set loading to true before fetching
        fetch("http://39.61.51.195:8004/product-create/")
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data); // Initially display all products
                setLoading(false); // Set loading to false after fetching
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false); // Set loading to false in case of error
            });
    }, []);

    useEffect(() => {
        setLoading(true); // Set loading to true before filtering
        const searchParams = new URLSearchParams(location.search);
        const searchQuery = searchParams.get("search") || "";
        const categoryId = searchParams.get("category");

        // Filter products that have status "Approved"
        let filtered = products.filter((product) => product.status === "Approved");

        if (categoryId) {
            filtered = filtered.filter(
                (product) =>
                    product.category_Id && product.category_Id.toString() === categoryId
            );
        }

        if (searchQuery) {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
        setLoading(false); // Set loading to false after filtering
    }, [location.search, products]);

    const handleAddToCart = (product) => {
        // Check if product is out of stock
        if (product.stock === 0) {
            toast.error("Sorry, this product is out of stock!", {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }

        // Check if the product already exists in the cart
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

    const capitalizeWords = (string) => {
        if (!string) return "";
        return string
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <>
            <div className="Ccontainer bestsellingcontainer">
                {/* <div className="productLeftAcc">
          <ProductVariationAcc />
        </div> */}
                <div className="productRightAcc ybestsellingAcc">
                    <ToastContainer />
                    <div className="products-container ybestsellingproduct mt-4">
                        {loading ? (
                            <div className="loading-spinner">
                                <p>Loading products...</p>
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            filteredProducts.slice(0, 10).map((product) => (
                                <div key={product.id} className="product-card ybestsellingcard">
                                    <div className="discount-product-badge">
                                        {product.discount_percentage}%
                                    </div>

                                    <div className="product-image-container">
                                        <img
                                            src={product.color_image || placeholderImage}
                                            alt="product" className="product-image"
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
                                                onClick={() => handleQuickView(product)}
                                            >
                                                <i className="fa fa-eye" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <p style={{ color: "black", fontWeight: "bold", textOverflow: "ellipsis", overflow: "hidden", marginBottom: "0px", marginTop: "5px", padding: "5px" }}>
                                        <span className="h4-title">
                                            {capitalizeWords(product.name)}
                                        </span>
                                    </p>
                                    {/* <div className="p-title">
                <h4 className="h4-title">{capitalizeWords(product.name)}</h4>
              </div> */}
                                    <p style={{ color: "#ff4444" }}>
                                        <del>PK{product.price}</del>
                                        <span>
                                            {" "}
                                            PK
                                            {calculateDiscountedPrice(
                                                product.price,
                                                product.discount_percentage
                                            )}
                                        </span>
                                    </p>

                                    <Link className="view-btn bestsellingbtn" to={`/product-details/${product.id}`}>
                                        View Details
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="out-of-stock">
                                <h2>No Products Found</h2>
                                <p>The product you are searching for is out of stock.</p>
                            </div>
                        )}
                    </div>
                    {/* Quick View Modal */}

                    <ProductQuickView
                        show={showQuickView}
                        onHide={() => setShowQuickView(false)}
                        product={selectedProduct}
                    />
                </div>
            </div>
        </>
    );
};

export default Bestsellingproducts;
