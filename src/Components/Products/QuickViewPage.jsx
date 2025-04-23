import React from "react";
import { Modal, Button } from "react-bootstrap";

const ProductQuickView = ({ show, onHide, product }) => {
  const placeholderImage = "https://via.placeholder.com/150";

  if (!product) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.name || "Product Details"}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
        <div className="row">
          {/* Left Section: Product Images */}
          <div className="col-md-6">
            <img
              src={product.images[0]?.image || placeholderImage}
              alt={product.name}
              className="img-fluid mb-3"
            />
            <div className="d-flex justify-content-center">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img.image || placeholderImage}
                  alt={`Thumbnail ${index + 1}`}
                  className="img-thumbnail mx-1"
                  style={{ width: "60px", cursor: "pointer" }}
                />
              ))}
            </div>
          </div>

          {/* Right Section: Product Info */}
          <div className="col-md-6">
            <p>
              <strong>Price:</strong>{" "}
              <span style={{ color: "#ff4444", textDecoration: "line-through" }}>
                PKR {product.price}
              </span>{" "}
              <span style={{ color: "#28a745" }}>
                PKR {(product.price * 0.95).toFixed(2)} (5% Off)
              </span>
            </p>
            <p>
              <strong>In Stock:</strong> {product.stock > 0 ? "Yes" : "No"}
            </p>
            <p>
              <strong>SKU:</strong> {product.sku || "N/A"}
            </p>
            <p>
              <strong>Description:</strong> {product.description || "N/A"}
            </p>
            <div className="d-flex align-items-center mt-3">
             
              <Button
                variant="primary"
                className="ml-3"
                onClick={() => alert("Added to cart")}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProductQuickView;
