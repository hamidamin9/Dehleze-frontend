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
  const [voucher, setVoucher] = useState("");
  const [orderedItems, setOrderedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const savedAddress = localStorage.getItem("savedAddress");
    const savedPhoneNumber = localStorage.getItem("savedPhoneNumber");

    if (savedAddress) setAddress(savedAddress);
    if (savedPhoneNumber) setPhoneNumber(savedPhoneNumber);
  }, []);

  useEffect(() => {
    localStorage.setItem("savedAddress", address);
  }, [address]);

  useEffect(() => {
    localStorage.setItem("savedPhoneNumber", phoneNumber);
  }, [phoneNumber]);

  useEffect(() => {
    if (cart.length > 0) {
      setOrderedItems(cart.map((item) => ({ id: item.id, quantity: 1 })));
      setSelectedItems(cart.map((item) => item.id));
    }
  }, [cart]);

  const calculateTotalPrice = () => {
    return cart
      .filter((item) => selectedItems.includes(item.id))
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

  const handleItemSelect = (itemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item.id));
    }
  };

  const handleOrder = async () => {
    if (!userData?.id) {
      toast.error("You need to log in to place an order!");
      navigate("/login");
      return;
    }

    if (selectedItems.length === 0) {
      toast.warning("Please select at least one item to order.");
      return;
    }

    const orders = cart
      .filter((item) => selectedItems.includes(item.id))
      .map((item) => {
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
      navigate("/thankyouforshopping");
    } catch (error) {
      console.error("Error placing orders:", error);
      toast.error(
        "An error occurred while placing the order. Please try again."
      );
    }
  };

  return (
    <div className="checkout-page container mt-5">
      <div className="d-flex justify-content-between align-items-start flex-wrap">
        {/* Left Section */}
        <div className="left-section">
          <h3 className="mb-4">{userData ? userData.name : "Please login"}</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedItems.length === cart.length}
                  onChange={handleSelectAll}
                />
                <label className="form-check-label">Select All</label>
              </div>

              {cart.map((item) => {
                const orderedItem = orderedItems.find(
                  (ordered) => ordered.id === item.id
                );
                return (
                  <div
                    key={item.id}
                    className="cart-item d-flex align-items-center mb-4 p-3 shadow-sm"
                  >
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleItemSelect(item.id)}
                      className="form-check-input me-3"
                    />
                    <img
                      src={item.images?.[0]?.image || ""}
                      alt={item.name}
                      className="cart-item-img"
                    />
                    <div className="cart-item-details flex-grow-1 mx-3">
                      <h5>{item.name}</h5>
                      <p className="text-muted">Brand: No Brand</p>
                      <p className="text-danger">Only 2 items left!</p>
                    </div>
                    <div className="cart-item-actions d-flex align-items-center">
                      <input
                        type="number"
                        className="form-control quantity-input mx-2"
                        min="1"
                        value={orderedItem?.quantity || 1}
                        onChange={(e) =>
                          handleQuantityChange(item.id, e.target.value)
                        }
                      />
                      <h6 className="mb-0 text-success">
                        $
                        {(item.price * (orderedItem?.quantity || 1)).toFixed(2)}
                      </h6>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Right Section */}
        <div className="right-section">
          <div className="card shadow p-4">
            <h4>Order Summary</h4>
            <div className="mt-3">
              <hr />
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter delivery address"
                />
              </div>
              <div className="form-group mt-3">
                <label>Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-group mt-3">
                <label>Voucher Code</label>
                <input
                  type="text"
                  className="form-control"
                  value={voucher}
                  onChange={(e) => setVoucher(e.target.value)}
                  placeholder="Enter voucher code"
                />
              </div>

              <div className="summary-details mt-4">
                <div className="d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>${calculateTotalPrice()}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Shipping Fee</span>
                  <span>Free</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <strong>Total</strong>
                  <strong>${calculateTotalPrice()}</strong>
                </div>
              </div>

              <button
                className="btn btn-danger w-100 mt-4"
                onClick={handleOrder}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
