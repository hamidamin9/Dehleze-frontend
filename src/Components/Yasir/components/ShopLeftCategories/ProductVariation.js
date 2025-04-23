import axios from "axios";
import React, { useEffect, useState } from "react";

function ProductVariation() {
  const [products, setProducts] = useState([]); // Store products with variations

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Fetch products from category 2
      const response = await axios.get(
        "http://39.61.51.195:8004/product/category/2/"
      );
      setProducts(response.data); // Save products
      console.log(response.data, "Product data...");
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <h2>Product Variations</h2>
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            {product.variations && Array.isArray(product.variations.id) ? (
              product.variations.id.map((variationId, index) => (
                <div key={index}>
                  <p>Variation ID: {variationId}</p>
                  <p>Price: {product.variations.price[index]}</p>
                  <p>Color: {product.variations.color[index]}</p>
                  <img
                    src={`http://39.61.51.195:8004${product.variations.color_image[index]}`}
                    alt="Color"
                    width="50"
                  />
                </div>
              ))
            ) : (
              <p>No variations available</p>
            )}
          </div>
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
}

export default ProductVariation;
