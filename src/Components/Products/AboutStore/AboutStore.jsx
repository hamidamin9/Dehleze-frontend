import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SellerStore = () => {
  const { sellerId } = useParams();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetch seller store details
    fetch(`http://39.61.51.195:8004/account/store/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Seller data not found");
        }
        return response.json();
      })
      .then((data) => {
        const filteredStore = data.find((item) => item.seller === parseInt(sellerId));
        if (filteredStore) {
          setStore(filteredStore);
          setError(false);
        } else {
          throw new Error("Seller not found");
        }
      })
      .catch(() => {
        setError(true);
      });

    // Fetch seller products
    fetch(`http://39.61.51.195:8004/product-create/`)
      .then((response) => response.json())
      .then((data) => {
        const sellerProducts = data.filter((product) => product.seller_id === parseInt(sellerId));
        setProducts(sellerProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [sellerId]);

  if (error) {
    return (
      <div className="seller-store">
        <div className="error">
          <h1>Seller Not Found</h1>
          <p>We couldn't find the seller you're looking for. Please try again.</p>
        </div>
      </div>
    );
  }

  if (!store) {
    return <div className="loader">Loading store details...</div>;
  }

  return (
    <div className="seller-store">
      <div className="store-banner">
        <img
          src={store.banner || "https://via.placeholder.com/800x200"}
          alt={`${store.store_name} Banner`}
        />
      </div>
      <div className="store-details">
        <h1 className="store-name">{store.store_name}</h1>
        <p>
          <strong>Phone:</strong> {store.phone_number}
        </p>
        <p>
          <strong>Email:</strong> {store.email}
        </p>
      </div>

      <div className="products">
        <h2>Products</h2>
        {products.length > 0 ? (
          <div className="product-list">
            {products.map((product) => (
              <div key={product.name} className="product-card">
                <img src={product.color_image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>
                  <strong>Stock:</strong> {product.stock}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No products available for this seller.</p>
        )}
      </div>
    </div>
  );
};

export default SellerStore;
