import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Context/Context";
import "./CSS/Profile.css";
import ManageMyProfile from "./ManageMyProfile";
import MyProfile from "./MyProfile";
import MyOrders from "./MyOrders";
import MyPendings from "./MyPendings";
import DeliveredOrders from "./DeliveredOrders";
import MyProcessing from "./MyProcessing";
import CancelledOrders from "./CancelledOrders";
import AddressBook from "./AddressBook";
// import RecentOrdersTable from "./RecentOrdersTable";
import FooterTop from "../Footer/FooterTop";
import Footer from "../Footer/Footer";
import MobileViewTabs from "./MobileViewTabs";
import AfterReviewPage from "../Yasir/pages/AfterReviewPage";

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

  const [activeTab, setActiveTab] = useState(0); // State for managing the active tab

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
          // console.log(userData, 'user data checking...')
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

      // console.log(token, 'token checking...')

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
          // console.log(orders, 'orders checking...')
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://39.61.51.195:8004/product-create/"
        );
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
  }, [navigate, setUserData, orders]);

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
          } else if (order.order_status === "processing") {
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
    <>
      <div className="profileContainer">
        <div className="profileFlex desktopProfileFlex">
          <div className="profilepageleft">
            {/* Tab buttons */}
            <div className="profileFilterBtns">
              <span>Hello, {userData.name || "N/A"}</span>
              <h6
                onClick={() => setActiveTab(0)}
                className={activeTab === 0 ? "" : ""}
              >
                Manage My Account
              </h6>

              <p
                onClick={() => setActiveTab(1)}
                className={activeTab === 1 ? "profileActiveClass" : ""}
              >
                My Profile
              </p>
              <p
                onClick={() => setActiveTab(3)}
                className={activeTab === 3 ? "profileActiveClass" : ""}
              >
                Address Book
              </p>
              <p
                onClick={() => setActiveTab(3)}
                className={activeTab === 4 ? "profileActiveClass" : ""}
              >
                My Payment Options
              </p>
              <p
                onClick={() => setActiveTab(3)}
                className={activeTab === 5 ? "profileActiveClass" : ""}
              >
                Dehleze Wallet
              </p>
              <h6 onClick={() => setActiveTab(2)}>My Orders</h6>
              <p
                onClick={() => setActiveTab(4)}
                className={activeTab === 4 ? "profileActiveClass" : ""}
              >
                My Processing
              </p>
              <p
                onClick={() => setActiveTab(8)}
                className={activeTab === 8 ? "profileActiveClass" : ""}
              >
                My Pendings
              </p>
              <p
                onClick={() => setActiveTab(6)}
                className={activeTab === 6 ? "profileActiveClass" : ""}
              >
                Delivered Orders
              </p>
              <p
                onClick={() => setActiveTab(7)}
                className={activeTab === 7 ? "profileActiveClass" : ""}
              >
                My Cancellations
              </p>
              <p
                onClick={() => setActiveTab(79)}
                className={activeTab === 79 ? "profileActiveClass" : ""}
              >
                My Returns
              </p>
              <h6 onClick={() => setActiveTab(12)}>My Reviews</h6>
              <h6 onClick={() => setActiveTab(2)}>
                My Wishlist & <br />
                Followed Stores
              </h6>
              <h6 onClick={() => setActiveTab(2)}>Sell on Dehleze</h6>
            </div>
          </div>
          <div className="profilepageright">
            <div className="profileHeader">
              <h3>
                {activeTab === 0
                  ? "Manage Your Account"
                  : activeTab === 1
                  ? "My Profile"
                  : activeTab === 2
                  ? "My Orders"
                  : activeTab === 3
                  ? "Address Book"
                  : activeTab === 4
                  ? "My Processing"
                  : activeTab === 8
                  ? "Pendings Orders"
                  : activeTab === 6
                  ? "Delivered Orders"
                  : activeTab === 7
                  ? "Cancel Orders"
                  : activeTab === 12
                  ? "My Reviews"
                  : null}
              </h3>
              {/* <button onClick={handleLogout}>Logout</button> */}
            </div>

            <ManageMyProfile
              orderStats={orderStats}
              activeTab={activeTab}
              orders={orders}
              products={products}
              userData={userData}
            />

            <MyProfile
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              userData={userData}
            />

            <MyOrders
              orders={orders}
              setActiveTab={setActiveTab}
              setOrders={setOrders}
              userData={userData}
              orderStats={orderStats}
              products={products}
              activeTab={activeTab}
            />

            <MyProcessing
              orderStats={orderStats}
              activeTab={activeTab}
              orders={orders}
              products={products}
              userData={userData}
            />

            <MyPendings
              orderStats={orderStats}
              activeTab={activeTab}
              orders={orders}
              products={products}
              userData={userData}
            />

            <DeliveredOrders
              orderStats={orderStats}
              activeTab={activeTab}
              orders={orders}
              products={products}
              userData={userData}
            />

            <CancelledOrders activeTab={activeTab} orderStats={orderStats} />

            <AddressBook
              activeTab={activeTab}
              userData={userData}
              setUserData={setUserData}
            />

            <AfterReviewPage activeTab={activeTab} />
          </div>
        </div>
        <div className="profilePageMobileView">
          <MobileViewTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            userData={userData}
            handleLogout={handleLogout}
            ManageMyProfile={ManageMyProfile}
            orderStats={orderStats}
            MyProfile={MyProfile}
            MyOrders={MyOrders}
            orders={orders}
            setOrders={setOrders}
            products={products}
            MyProcessing={MyProcessing}
            MyPendings={MyPendings}
            DeliveredOrders={DeliveredOrders}
            CancelledOrders={CancelledOrders}
            AddressBook={AddressBook}
          />
        </div>
      </div>
      <div className="profilePageFooterTop">
        <FooterTop />
      </div>
      <Footer />
    </>
  );
};

export default Profile;
