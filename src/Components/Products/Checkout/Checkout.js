import React, { useState, useEffect } from "react";
import { useUserContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CSS/Checkout.css";

const Checkout = () => {
  const { cart, clearCart } = useUserContext();
  const { userData } = useUserContext();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orderedItems, setOrderedItems] = useState([]);

  // Initialize orderedItems from cart when cart is available
  useEffect(() => {
    if (cart.length > 0) {
      setOrderedItems(cart.map((item) => ({ id: item.id, quantity: 1 })));
    }
  }, [cart]);

  const calculateTotalPrice = () => {
    return cart
      .reduce((total, item) => {
        const orderedItem = orderedItems.find(
          (ordered) => ordered.id === item.id
        );
        return total + item.price * (orderedItem?.quantity || 1);
      }, 0)
      .toFixed(2);
  };

  const handleQuantityChange = (itemId, quantity) => {
    setOrderedItems(
      orderedItems.map((ordered) =>
        ordered.id === itemId
          ? { ...ordered, quantity: Number(quantity) }
          : ordered
      )
    );
  };

  const handleOrder = async () => {
    if (!userData?.id) {
      toast.error("You need to log in to place an order!");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      toast.warning("Your cart is empty.");
      return;
    }

    const orders = cart.map((item) => {
      const orderedItem = orderedItems.find(
        (ordered) => ordered.id === item.id
      );
      return {
        name: userData?.name || "You need to login",
        ordered_item: orderedItem?.quantity || 1,
        Phone_no: phoneNumber,
        address: address,
        total_price: (item.price * (orderedItem?.quantity || 1)).toFixed(2),
        order_status: "processing",
        refund_status: "not_requested",
        clear_status: "not_clear",
        user: userData?.id,
        product: item.id,
        seller: item.seller_id,
      };
    });

    try {
      for (const order of orders) {
        const response = await fetch(
          "http://39.61.51.195:8004/account/create-order/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error Response Data:", errorData);
          toast.error(
            `Failed to place the order: ${
              errorData.message || response.statusText
            }`
          );
          return;
        }
      }

      toast.success("All orders placed successfully!");
      clearCart();
      navigate("/thank-you");
    } catch (error) {
      console.error("Error placing orders:", error);
      toast.error(
        "An error occurred while placing the order. Please try again."
      );
    }
  };

  return (
    <div className="checkout container mt-5">
      <h1>{userData ? userData.name : "you need to login"}</h1>
      <ul className="list-group mb-4">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => {
            const orderedItem = orderedItems.find(
              (ordered) => ordered.id === item.id
            );
            return (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <img
                    src={item.images?.[0]?.image || ""}
                    alt={item.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                  />
                  <span>{item.name}</span>
                </div>
                <div className="d-flex align-items-center">
                  <span className="total-price">
                    ${(item.price * (orderedItem?.quantity || 1)).toFixed(2)}
                  </span>
                  <div className="form-group">
                    <label htmlFor={`quantity-${item.id}`}>Quantity</label>
                    <input
                      type="number"
                      id={`quantity-${item.id}`}
                      value={orderedItem?.quantity || 1}
                      onChange={(e) =>
                        handleQuantityChange(item.id, e.target.value)
                      }
                      min="1"
                    />
                  </div>
                </div>
              </li>
            );
          })
        )}
      </ul>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          className="form-control"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          className="form-control"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
        />
      </div>
      <h4>Total Price: ${calculateTotalPrice()}</h4>
      <button className="btn btn-success" onClick={handleOrder}>
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
