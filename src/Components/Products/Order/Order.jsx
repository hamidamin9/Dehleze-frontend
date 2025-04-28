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

  // Destructure from location.state (including quantity, discountedPrice)
  const { quantity, discountedPrice, selectedVariation } = location.state || {};

  // Define all required states
  const [name, setName] = useState(userData?.name || "");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [orderedItem, setOrderedItem] = useState(quantity || 1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [couponDetails, setCouponDetails] = useState(null);
  const [variationId, setVariationId] = useState(null); // State for variationId
  const [selectedVariationState, setSelectedVariationState] = useState(
    selectedVariation || null
  ); // Store variation data

  // Fetch variationId from localStorage (async storage equivalent for web)
  useEffect(() => {
    const storedVariation = localStorage.getItem("selectedVariation");

    if (storedVariation) {
      try {
        const parsedVariation = JSON.parse(storedVariation);
        console.log("Fetched Variation from localStorage:", parsedVariation);

        // Directly use the variation ID from localStorage, no need to check product matching
        if (parsedVariation?.id && !isNaN(parsedVariation.id)) {
          setVariationId(parsedVariation.id);
          console.log("Variation ID fetched and set:", parsedVariation.id);
        } else {
          console.warn("Invalid variation ID in localStorage.");
        }
      } catch (err) {
        console.error("Error parsing variation from storage:", err);
        setVariationId(null);
      }
    }
  }, []); // Only run once when component mounts

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!userData || !userData.id) {
      navigate("/login");
    }
  }, [userData, navigate]);

  // Fetch product details from the server
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

  // Update total price based on product and quantity
  useEffect(() => {
    if (product && discountedPrice) {
      setTotalPrice(discountedPrice * orderedItem);
    }
  }, [orderedItem, product, discountedPrice]);

  // Handle order submission
  const handleOrderSubmit = () => {
    setError(""); // Clear previous error

    console.log("Submitting order with Variation:", variationId);

    if (!name || !PhoneNumber || !address) {
      setError("Please fill in all required fields.");
      toast.error("Please fill in all required fields.");
      return;
    }

    // Validate phone number format (basic)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(PhoneNumber)) {
      setError("Invalid phone number format.");
      toast.error("Invalid phone number format.");
      return;
    }

    const totalAmount = totalPrice + 145;

    const orderData = {
      name: name.trim(),
      address: address.trim(),
      Phone_no: PhoneNumber.trim(),
      order_status: "processing",
      refund_status: "not_requested",
      clear_status: "not_clear",
      seller: product?.seller_id,
      product: product?.id,
      user: userData?.id,
      total_price: totalAmount,
      ordered_item: orderedItem,
    };

    // Ensure variationId is included if available
    if (variationId && !isNaN(variationId)) {
      orderData.variation = variationId; // Add the variationId to the orderData
      console.log("Variation attached to order:", variationId); // Log the variation ID attached to order
    } else {
      console.warn("No variation ID found or variation is invalid.");
    }

    console.log("Sending order data:", orderData);

    fetch("http://39.61.51.195:8004/account/create-order/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Order API error response:", errorData);
          throw new Error(
            errorData.detail ||
              Object.values(errorData).flat().join("\n") ||
              "Failed to create order"
          );
        }
        return response.json();
      })
      .then(() => {
        toast.success("Order placed successfully!");
        navigate("/thankyouforshopping");
      })
      .catch((error) => {
        console.error("Error creating order:", error.message);
        toast.error(error.message || "Failed to create order.");
        setError(error.message);
      });
  };

  if (!product)
    return <div className="loading-spinner">Loading product details...</div>;

  return (
    <>
      <ToastContainer />
      <div className="create-order-container">
        <h1>Complete Your Order</h1>
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
            selectedVariation={selectedVariationState} // Pass selected variation to summary
          />
        </div>
      </div>
      <FooterTop />
      <Footer />
    </>
  );
};

export default CreateOrderPage;
