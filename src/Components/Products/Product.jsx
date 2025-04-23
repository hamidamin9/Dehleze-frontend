import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import placeholderImage from "../Navbar/CSS/Assets/Banners/150x150.png";
import "./CSS/product.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [availableFilters, setAvailableFilters] = useState({});

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("category");
  const subcategory1Id = searchParams.get("subcategory1");
  const subcategory2Id = searchParams.get("subcategory2");
  const subcategory3Id = searchParams.get("subcategory3");

  const filterKeys = [
    "color",
    "size_number",
    "size_text",
    "material",
    "style",
    "pattern",
    "brand",
    "fit",
    "age_baby_products",
    "size_baby_products",
    "material_baby_products",
    "brand_baby_products",
    "notes",
    "weight_capacity",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let productRes;
        if (categoryId) {
          productRes = await fetch(
            `http://39.61.51.195:8004/product/category/${categoryId}`
          );
        } else if (subcategory1Id) {
          productRes = await fetch(
            `http://39.61.51.195:8004/product/subcategory1/${subcategory1Id}`
          );
        } else if (subcategory2Id) {
          productRes = await fetch(
            `http://39.61.51.195:8004/product/subcategory2/${subcategory2Id}`
          );
        } else if (subcategory3Id) {
          productRes = await fetch(
            `http://39.61.51.195:8004/product/subcategory3/${subcategory3Id}`
          );
        }

        if (!productRes.ok) throw new Error("Failed to fetch products");

        const fetchedProducts = await productRes.json();
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);

        const filterOptions = {};
        filterKeys.forEach((key) => (filterOptions[key] = new Set()));

        fetchedProducts.forEach((product) => {
          filterKeys.forEach((key) => {
            product.variations?.[key]?.forEach((val) => {
              if (val) filterOptions[key].add(val);
            });
          });
        });

        const available = {};
        Object.entries(filterOptions).forEach(([key, set]) => {
          if (set.size > 0) available[key] = [...set];
        });
        setAvailableFilters(available);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, subcategory1Id, subcategory2Id, subcategory3Id]);

  useEffect(() => {
    if (!products.length) return;
    let newFiltered = [...products];

    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        newFiltered = newFiltered.filter((product) =>
          product.variations?.[key]?.some((val) => values.includes(val))
        );
      }
    });

    setFilteredProducts(newFiltered);

    if (newFiltered.length === 0) {
      setFilters({});
    } else {
      const newAvailable = {};
      const variationSet = {};
      filterKeys.forEach((key) => (variationSet[key] = new Set()));

      newFiltered.forEach((product) => {
        filterKeys.forEach((key) => {
          product.variations?.[key]?.forEach((val) => {
            if (val) variationSet[key].add(val);
          });
        });
      });

      filterKeys.forEach((key) => {
        if (variationSet[key].size > 0)
          newAvailable[key] = [...variationSet[key]];
      });
      setAvailableFilters(newAvailable);
    }
  }, [filters, products]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const current = prev[key] || [];
      return {
        ...prev,
        [key]: current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
  };

  const handleAddToCart = (product) => {
    console.log("Add to cart:", product);
  };

  const handleViewDetails = (product) => {
    const productId = product.id;
    console.log("📦 Clicked product ID:", productId);
    localStorage.setItem("selectedProductId", productId);
    window.location.href = `/product-details/${productId}`;
  };

  return (
    <div className="shop-page">
      <ToastContainer />

      <div className="sidebar">
        <h4>Filter by Variations</h4>

        <div className="filterOptions">
          {Object.entries(availableFilters).map(([key, options]) => (
            <div key={key} className="filterSection">
              <h5>{key.replaceAll("_", " ").toUpperCase()}</h5>
              <div className="filterCheckboxes">
                {options.map((val) => (
                  <label key={val} className="filterLabel">
                    <input
                      type="checkbox"
                      onChange={() => handleFilterChange(key, val)}
                      checked={filters[key]?.includes(val) || false}
                    />
                    {val}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="s-products-container">
        {loading ? (
          <div className="loading-spinner">
            <p>Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const variations = product.variations || {};
            const image =
              variations.color_image?.[0] ||
              product.product_image ||
              placeholderImage;

            const imageUrl = image.startsWith("/media")
              ? `http://39.61.51.195:8004${image}`
              : image;

            return (
              <div key={product.id} className="s-product-card">
                <div className="s-product-image-container">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="s-product-image"
                  />
                  <div className="s-hover-icons">
                    <div className="s-icon">
                      <i className="fa fa-heart" aria-hidden="true"></i>
                    </div>
                    <div
                      className="s-icon"
                      onClick={() => handleAddToCart(product)}
                    >
                      <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    </div>
                    <div
                      className="s-icon"
                      onClick={() => handleViewDetails(product)}
                    >
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
                <br />
                <p
                  title={product.name}
                  style={{
                    fontSize: "15px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                    display: "block",
                  }}
                >
                  {product.name.split(" ").slice(0, 4).join(" ")}
                  {product.name.split(" ").length > 4 && "..."}
                </p>
                <p className="price-stock">
                  <span style={{ marginLeft: "23px" }}>
                    PKR {variations.price?.[0] || product.price}
                  </span>
                  <span className="stock-info">Stock: ({product.stock})</span>
                </p>

                <button
                  className="view-btn"
                  onClick={() => handleViewDetails(product)}
                >
                  View Details
                </button>
              </div>
            );
          })
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

export default ProductsPage;
