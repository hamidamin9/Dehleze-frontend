import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [products, setProducts] = useState([]);

  // Fetch subcategories
  useEffect(() => {
    axios
      .get("http://39.61.51.195:8004/product-create")
      .then((res) => {
        setSubcategories(res.data); // Store subcategories
      })
      .catch((err) => {
        console.error("Error fetching subcategories:", err);
      });
  }, []);

  // Fetch products based on selected subcategory ID
  useEffect(() => {
    if (selectedSubcategory) {
      axios
        .get(
          `http://39.61.51.195:8004/product/subcategory2/${selectedSubcategory}/`
        )
        .then((res) => {
          setProducts(res.data); // Store products for the selected subcategory
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
        });
    }
  }, [selectedSubcategory]);

  return (
    <div className="p-4">
      {/* Render Subcategory Buttons */}
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Select a Subcategory:</h2>
        <div className="flex gap-4">
          {subcategories.map((subcategory) => (
            <button
              key={subcategory.id}
              onClick={() => setSelectedSubcategory(subcategory.id)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {subcategory.name}
            </button>
          ))}
        </div>
      </div>

      {/* Render Products for Selected Subcategory */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="border p-4 rounded-xl shadow-md">
              <img
                src={`http://39.61.51.195:8004${product?.product_image}`}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700">Price: {product.price}</p>

              {product.variations && (
                <div className="mt-2 text-sm text-gray-600">
                  <p className="font-medium">Variations:</p>
                  {Object.keys(product.variations).map((key, index) => (
                    <div key={index}>
                      <strong>{key}:</strong>{" "}
                      {Array.isArray(product.variations[key])
                        ? product.variations[key].join(", ")
                        : product.variations[key]}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No products available for this subcategory.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
