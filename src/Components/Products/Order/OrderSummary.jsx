import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const OrderSummary = ({ orderedItem, totalPrice, couponDetails, setCouponDetails, product }) => {
  const [couponCode, setCouponCode] = useState("");
    const location = useLocation();
  
  const {  discountedPrice } = location.state || {};


  const applyCoupon = async () => {
    if (!couponCode) {
      toast.error("Please enter a coupon code.");
      return;
    }

    if (!product || !product.id) {
      toast.error("Product details not found.");
      return;
    }

    try {
      const response = await fetch("http://39.61.51.195:8004/apply-coupon/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode, product_id: product.id }),
      });

      const data = await response.json();

      if (response.ok && data.discounted_price) {
        setCouponDetails(data);
        toast.success("Coupon applied successfully!");
      } else {
        toast.error(data.message || "Invalid coupon code.");
      }
    } catch (error) {
      toast.error("Error applying coupon.");
    }
  };

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <div className="summary-item">
        <p>Item Price (1 item)</p>
        <p>Rs. { discountedPrice}</p>
      </div>
      <div className="summary-item">
        <p>Total Items</p>
        <p>{orderedItem}</p>
      </div>
      {couponDetails && (
        <div className="summary-item">
          <p>Discount ({couponDetails.discount}%)</p>
          <p>- Rs. {(couponDetails.original_price - couponDetails.discounted_price).toFixed(2)}</p>
        </div>
      )}
       <div className="summary-item ">
        <p>Delivery Charges:</p>
        <p>+ 145</p>
      </div>
      <div className="summary-item total">
        <p>Total:</p>
        <p>Rs. {couponDetails ? totalPrice - (couponDetails.original_price - couponDetails.discounted_price) + 145   : totalPrice + 145}</p>
      </div>
      <div className="coupon-section">
        <input type="text" placeholder="Enter coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
        <button onClick={applyCoupon}>APPLY</button>
      </div>
    </div>
  );
};

export default OrderSummary;
