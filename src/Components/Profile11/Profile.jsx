import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Context/Context";
import "./CSS/Profile.css";

const Profile = () => {
  const { userData, setUserData } = useUserContext();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderStats, setOrderStats] = useState({
    total: 0,
    pending: 0,
    delivered: 0,
    canceled: 0,
    processing: 0,
    totalPrice: 0,
  });

  const [activeTab, setActiveTab] = useState(1); // State for managing the active tab

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://39.61.51.195:8004/account/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Failed to fetch user data");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error:", error);
        navigate("/login");
      }
    };

    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://39.61.51.195:8004/account/create-order/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch("http://39.61.51.195:8004/product-create/");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
    fetchOrders();
    fetchProducts();
  }, [navigate, setUserData]);

  useEffect(() => {
    const calculateOrderStats = () => {
      const stats = {
        total: 0,
        pending: 0,
        processing: 0,
        delivered: 0,
        canceled: 0,
        totalPrice: 0, // ensure it's set as a number
      };

      orders.forEach((order) => {
        if (order.user === userData.id) {
          stats.total += 1;
          if (order.order_status === "pending") {
            stats.pending += 1;
          } else if (order.order_status === "delivered") {
            stats.delivered += 1;
          } else if (order.order_status === "canceled") {
            stats.canceled += 1;
          }
          else if (order.order_status === "processing") {
            stats.processing += 1;
          }

          const product = products.find((prod) => prod.id === order.product);
          if (product) {
            // Safely add product price, ensure it's treated as a number
            stats.totalPrice += Number(product.price) || 0;
          }
        }
      });

      setOrderStats(stats);
    };

    if (orders.length > 0 && products.length > 0 && userData) {
      calculateOrderStats();
    }
  }, [orders, products, userData]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
    setUserData(null);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container profileContainer">
      <div className="profileFlex">
        <div className="profilepageleft">
          {/* Tab buttons */}
          <div className="tabs profiletabs">
            <button onClick={() => setActiveTab(1)} className={activeTab === 1 ? "activeprofiletab" : ""}>My Profile</button>
            <button onClick={() => setActiveTab(2)} className={activeTab === 2 ? "activeprofiletab" : ""}>My Orders</button>
            {/* <button onClick={() => setActiveTab(3)} className={activeTab === 3 ? "activeprofiletab" : ""}>Tab 3</button> */}
          </div>
        </div>
        <div className="profilepageright">
          <div className="profile-header">
            <h1>{userData.name || "N/A"}</h1>
            <button onClick={handleLogout}>Logout</button>
          </div>
          {/* Tab Content */}
          {activeTab === 1 && (
            <div>
              <div className="profile-info">
                <h2>Personal Information</h2>
                <div className="profile-details">
                  <div>
                    <p><strong>Name:</strong> {userData.name || "N/A"}</p>
                  </div>
                  <div>
                    <p>
                      <strong>Email:</strong> {userData.email || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Phone:</strong> {userData.phone_number || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Address:</strong> {userData.address || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 2 && <div>
            <div className="orders-section">
              <h2>My Orders</h2>
              <div className="order-stats">
                <div>
                  <p>
                    <strong>Total Orders:</strong> {orderStats.total}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Pending Orders:</strong> {orderStats.pending}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Delivered Orders:</strong> {orderStats.delivered}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Canceled Orders:</strong> {orderStats.canceled}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Processing Orders:</strong> {orderStats.processing}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Total Order Amount: </strong>PKR{orderStats.totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
              {orders.length === 0 ? (
                <p>No orders found.</p>
              ) : (
                <ul>
                  {orders
                    .filter((order) => order.user === userData.id)
                    .map((order) => {
                      const product = products.find(
                        (prod) => prod.id === order.product
                      );
                      return (
                        <li key={order.id} className="order-item">
                          <div className="order-product">
                            <img
                              src={product?.images[0]?.image || ""}
                              alt={product?.name || "Product"}
                              className="profile-product-image"
                            />
                          </div>
                          <div className="order-details">
                            <div className="detail-row">
                              <p>
                                <strong>Order ID:</strong> {order.id} <strong> Qty:</strong> {order.ordered_item}
                              </p>
                            </div>
                            <div className="detail-row">
                              <p>
                                <strong>User:</strong> {userData.name || "N/A"}
                              </p>
                            </div>
                            <div className="detail-row">
                              <p>
                                {/* <strong>Price:</strong> {product?.price || "N/A"} */}
                                <strong>  Total Price:</strong> {order.total_price || "N/A"}
                              </p>
                            </div>
                            <div className="detail-row">
                              <p>
                                <strong>Address:</strong> {order.address}
                              </p>
                            </div>
                            <div className="detail-row">
                              <p>
                                <strong>Product:</strong> {product?.name || "N/A"}
                              </p>
                            </div>
                            <div className="detail-row">
                              <p>
                                <strong>Status:</strong> {order.order_status}
                              </p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              )}
            </div>
          </div>}
          {/* {activeTab === 3 && <div>Tab 3 Content (Empty for now)</div>} */}
        </div>
      </div>
    </div>
  );
};

export default Profile;