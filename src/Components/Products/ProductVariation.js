import React, { useState, useEffect } from "react";
import "../Products/ProductVariations.css";

function ProductVariation({
  categoryId,
  subcategory1_id,
  subcategory2_id,
  subcategory3_id,
}) {
  const [variations, setVariations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (!categoryId || isNaN(categoryId)) {
      console.warn("Invalid or missing categoryId:", categoryId);
      setLoading(false);
      return;
    }

    // Add checks for subcategory1, subcategory2, subcategory3
    if (![subcategory1_id, subcategory2_id, subcategory3_id].some(Boolean)) {
      console.warn("Invalid or missing subcategory IDs:", {
        subcategory1_id,
        subcategory2_id,
        subcategory3_id,
      });
      setLoading(false);
      return;
    }

    const fetchVariations = async () => {
      try {
        let url = "";

        // Determine which URL to fetch based on available category or subcategory
        if (subcategory1_id) {
          url = `http://39.61.51.195:8004/product/subcategory1/${subcategory1_id}/`;
        } else if (subcategory2_id) {
          url = `http://39.61.51.195:8004/product/subcategory2/${subcategory2_id}/`;
        } else if (subcategory3_id) {
          url = `http://39.61.51.195:8004/product/subcategory3/${subcategory3_id}/`;
        } else if (categoryId) {
          url = `http://39.61.51.195:8004/product/category/${categoryId}/`;
        }

        // If no valid URL is constructed, return early
        if (!url) {
          console.warn("No valid category or subcategory provided.");
          setLoading(false);
          return;
        }

        // Fetch the variations data
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch: ${url}`);

        const data = await response.json();
        console.log("Fetched Data:", data);
        setVariations(data);
      } catch (error) {
        console.error("Error fetching product variations:", error);
        setVariations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVariations();
  }, [categoryId, subcategory1_id, subcategory2_id, subcategory3_id]);

  // Extract unique variation types across all products
  const variationTypes = variations.reduce((acc, product) => {
    if (product.variations) {
      Object.keys(product.variations).forEach((key) => {
        if (
          [
            "id",
            "price",
            "SKU",
            "color_stock",
            "color_image",
            "discount_percentage",
            "pro_id",
          ].includes(key)
        )
          return;

        acc[key] = acc[key] || [];

        product.variations[key].forEach((value) => {
          if (!acc[key].includes(value)) {
            acc[key].push(value);
          }
        });
      });
    }
    return acc;
  }, {});

  if (loading) return <p>Loading...</p>;

  return (
    <div className="YshopLeftSections productVariationLeft">
      {Object.keys(variationTypes).length > 0 ? (
        Object.keys(variationTypes).map((key) => (
          <div key={key} className="variation-accordion">
            <div className="productaccordionHeading">
              <h3 className="upercase">{key.replace(/_/g, " ")}</h3>
            </div>
            <ul style={{ padding: 0, listStyle: "none" }}>
              {variationTypes[key].map((value, index) => (
                <li key={index} style={{ outline: "none", border: "none" }}>
                  {key === "color" ? (
                    <div
                      style={{
                        backgroundColor: value,
                        width: 20,
                        height: 20,
                        display: "inline-block",
                        marginRight: 5,
                        borderRadius: "100%",
                        border: "none",
                        outline: "none",
                      }}
                    />
                  ) : (
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <input
                        type="checkbox"
                        style={{ outline: "none", border: "none" }}
                      />
                      <p className="yproductAccValue">{value}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No variations available</p>
      )}
    </div>
  );
}

export default ProductVariation;
