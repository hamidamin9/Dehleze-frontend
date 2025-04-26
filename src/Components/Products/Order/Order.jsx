import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../CSS/Order.css";
import { useUserContext } from "../../Context/Context";
import { toast, ToastContainer } from "react-toastify";
import OrderForm from "./OrderForm";
import OrderSummary from "./OrderSummary";
import FooterTop from "../../Footer/FooterTop";
import Footer from "../../Footer/Footer";

const CreateOrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData } = useUserContext();
  const location = useLocation();
  const { quantity, discountedPrice } = location.state || {};

  const [name, setName] = useState(userData?.name || "");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [orderedItem, setOrderedItem] = useState(quantity || 1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [couponDetails, setCouponDetails] = useState(null);

  useEffect(() => {
    if (!userData || !userData.id) {
      alert("Please log in to place an order.");
      navigate("/login");
    }
  }, [userData, navigate]);

  useEffect(() => {
    fetch(`http://39.61.51.195:8004/product/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setTotalPrice(data.price * orderedItem + 145);
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);

  useEffect(() => {
    if (product) {
      setTotalPrice(discountedPrice * orderedItem);
    }
  }, [orderedItem, product]);

  const handleOrderSubmit = () => {
    if (!name || !PhoneNumber || !address) {
      setError("Please fill in all required fields.");
      return;
    }

    const totalAmount = totalPrice + 145;

    const orderData = {
      name,
      address,
      Phone_no: PhoneNumber,
      order_status: "processing",
      refund_status: "not_requested",
      clear_status: "not_clear",
      seller: product.seller_id,
      product: product.id,
      user: userData.id,
      total_price: totalAmount,
      ordered_item: orderedItem,
    };

    fetch("http://39.61.51.195:8004/account/create-order/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) =>
        response.ok ? response.json() : Promise.reject("Failed to create order")
      )
      .then(() => {
        alert("Order created successfully!");
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Error creating order:", error);
        setError("Failed to create order. Please try again.");
        alert(error);
      });
  };

  if (!product)
    return <div className="loading-spinner">Loading product details...</div>;

  return (
    <>
      <ToastContainer />
      <div className="create-order-container">
        <h1>Complete Your Order</h1>
        {/* <p>Discounted Price: PKR {discountedPrice}</p> */}
        <div className="order-content">
          <OrderForm
            name={name}
            setName={setName}
            PhoneNumber={PhoneNumber} 
            setPhoneNumber={setPhoneNumber}
            address={address}
            setAddress={setAddress}
            handleOrderSubmit={handleOrderSubmit}
          />
          <OrderSummary
            orderedItem={orderedItem}
            totalPrice={totalPrice}
            couponDetails={couponDetails}
            setCouponDetails={setCouponDetails}
            product={product}
          />
        </div>
      </div>
      <FooterTop />
      <Footer />
    </>
  );
};

export default CreateOrderPage;
