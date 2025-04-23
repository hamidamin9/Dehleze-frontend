import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../Context/Context";
import logo from "./CSS/Assets/logo.png";
import user from "./CSS/Assets/User.png";
import axios from "axios";
import "./CSS/Header.css";
import CategoryBar from "./Category";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { cart } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all products
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://39.61.51.195:8004/product-create/"
        );
        setAllProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle search filtering
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const results = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, allProducts]);

  // Redirect to search results page
  const handleSearchResultClick = (productName) => {
    navigate(`/products?search=${encodeURIComponent(productName)}`);
    setSearchQuery(""); // Clear search input
    setFilteredProducts([]); // Hide search results
  };

  // Handle search button click
  const handleSearchButtonClick = () => {
    if (searchQuery.trim().length > 0) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(""); // Clear search input
      setFilteredProducts([]); // Hide search results
    }
  };

  return (
    <>
      <header className="header">
        <div className="d-flex justify-content-between align-items-center">
          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                style={{ height: "65px", width: "auto" }}
              />
            </Link>
          </div>
          <div className="desktop-search-bar">
            <input
              type="text"
              placeholder="Search Item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button onClick={handleSearchButtonClick}>
              <i className="fa fa-search text-white"></i>
            </button>

            {/* Display filtered search results */}
            {filteredProducts.length > 0 && (
              <div className="search-results">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="search-result-item"
                    onClick={() => handleSearchResultClick(product.name)}
                    style={{ cursor: "pointer", padding: "5px 10px" }}
                  >
                    {product.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Search Bar */}
          <div className="yLeftHeader">
            <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              <div>
                <NavLink
                  className="YaddToCartBtn headerSellerBtn"
                  to="/seller-login"
                  style={{
                    textDecoration: "none",
                    padding: "0.7rem 1rem",
                    fontSize: "1rem",
                  }}
                >
                  Become a Seller
                </NavLink>
              </div>
              <NavLink to="/profile">
                <img src={user} alt="Cart" className="cart-logo" />
              </NavLink>

              {/* Cart */}
              <div
                className="cart position-relative"
                onClick={() => navigate("/checkout")}
              >
                <img
                  src="https://demo1.wpthemego.com/themes/sw_bosmarket/wp-content/themes/bosmarket/assets/img/orange/cart.png"
                  alt="Cart"
                  className="cart-logo"
                />
                <span className="cart-count">{cart.length}</span>
                <div className="login text-end me-4 d-flex flex-column">
                  <span className="cart-total text-danger">
                    {/* <span className="cart-inside-title">Cart</span> */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <CategoryBar />
    </>
  );
};

export default Header;
