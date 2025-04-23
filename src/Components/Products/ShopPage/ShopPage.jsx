// src/pages/ShopPage.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { useUserContext } from "../../Context/Context";
import Sidebar from "./Sidebar"; 
import '../CSS/ShopPage.css'

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Categories state
  const [loading, setLoading] = useState(true); 
  const location = useLocation();
  const { addToCart, cart } = useUserContext(); 

  useEffect(() => {
    setLoading(true);
    fetch("http://39.61.51.195:8004/products/")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Fetch categories
    fetch("http://39.61.51.195:8004/categories/")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

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

  // Handle filtering
  const handleFilter = (categoryId, priceRange) => {
    let filtered = products;

    if (categoryId) {
      filtered = filtered.filter(
        (product) => product.category_Id && product.category_Id.toString() === categoryId
      );
    }

    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  };

  return (
    <div className="shop-page">
      <ToastContainer />
      <Sidebar categories={categories} onFilter={handleFilter} />

      <div className="s-products-container">
        {loading ? (
          <div className="loading-spinner">
            <p>Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="s-product-card">
              <div className="s-product-image-container">
                <img
                  src={product.images[0]?.image || "https://via.placeholder.com/150"}
                  alt={product.name}
                  className="s-product-image"
                />
                <div className="s-hover-icons">
                  <div className="s-icon">
                    <i className="fa fa-heart" aria-hidden="true"></i>
                  </div>
                  <div className="s-icon" onClick={() => handleAddToCart(product)}>
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                  </div>
                  <div className="s-icon" onClick={() => handleViewDetails(product)}>
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
              <div className="s-p-title">
                <h4 className="s-h4-title">{product.name}</h4>
              </div>
              <p style={{ color: "#ff4444" }}>
                PK{product.price}{" "}
                <span style={{ color: "blue", fontSize: "15px" }}>
                  Stock: ({product.stock})
                </span>
              </p>
              <button className="view-btn" onClick={() => handleViewDetails(product)}>
                View Details
              </button>
            </div>
          ))
        ) : (
          <div className="out-of-stock">
            <h2>No Products Found</h2>
            <p>The product you are searching for is out of stock.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
