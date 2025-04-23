import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Components/Home/Home";
import NotFound from "./Components/NotFound/NotFound";
import Product from "./Components/Products/Product";
import ProductDetails from "./Components/Products/ProductDetails";
import UserLoginPage from "./Components/Account/Login";
import UserSignupPage from "./Components/Account/SignUp";
import { UserProvider } from "./Components/Context/Context";
import ProfilePage from "./Components/Profile/Profile";
import Checkout from "./Components/Products/Checkout/Checkout";
import OrderPage from "./Components/Products/Order/Order";
// yasir file
import DehlezeShopPage from "./Components/Yasir/pages/DehlezeShopPage";
import SingleProductPage from "./Components/Yasir/pages/SingleProductPage";
import ContactPage from "./Components/Yasir/pages/ContactPage";
import AboutUsPage from "./Components/Yasir/pages/AboutUsPage";
import OrderConfirmationPage from "./Components/Yasir/pages/OrderConfirmationPage";
import ShopPage from "./Components/Products/ShopPage/ShopPage";
import Header from "./Components/Navbar/Header";
// footer
// import Footer from "./Components/Footer/Footer";
import TermsandConditions from "./Components/Footer/Pages/TermsandConditions";
import PoliciesGuidelines from "./Components/Footer/Pages/PoliciesGuidelines";
import SellerStore from "./Components/Yasir/pages/SellerStore";
import QuickViewPage from "./Components/Products/QuickViewPage";
import SellerPage from "./Components/Products/AboutStore/SellerPage";
import SelectPaymentPage from "./Components/Yasir/pages/SelectPaymentPage";
import CardDetails from "./Components/Yasir/pages/CardDetails";
import ThankyouPage from "./Components/Yasir/pages/ThankyouPage";
import New from "./Components/Yasir/pages/new";

import ReviewsPage from "./Components/Yasir/pages/ReviewsPage";
import AfterReviewPage from "./Components/Yasir/pages/AfterReviewPage";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function App() {
  return (
    <>
      <div className="w-full">
        <BrowserRouter>
          <UserProvider>
            <Header />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="products" element={<Product />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route
                path="/login"
                element={
                  <UserProvider>
                    <UserLoginPage />
                  </UserProvider>
                }
              />

              <Route path="/shop-page" element={<ShopPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/signup" element={<UserSignupPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/create-order/:id" element={<OrderPage />} />
              <Route
                path="/terms-&-condition"
                element={<TermsandConditions />}
              />
              <Route
                path="/policies-&-guidelines"
                element={<PoliciesGuidelines />}
              />
              <Route path="/seller-store/:sellerId" element={<SellerStore />} />
              <Route path="/quickview/:productId" element={<QuickViewPage />} />
              <Route path="/seller-login" element={<SellerPage />} />
              {/* yasir page route */}
              <Route path="/shop" element={<DehlezeShopPage />} />
              <Route
                path="/product-details/:id"
                element={<SingleProductPage />}
              />
              <Route path="/cart" element={<SingleProductPage />} />
              {/* <Route path="/product-details/:id" element={<detailpage />} /> */}
              <Route
                path="/orderconfirmation"
                element={<OrderConfirmationPage />}
              />
              <Route path="/selectpayment" element={<SelectPaymentPage />} />
              <Route path="/thankyouforshopping" element={<ThankyouPage />} />
              <Route path="/newpage" element={<New />} />
              <Route path="/carddetails" element={<CardDetails />} />
              <Route path="/revieworder" element={<ReviewsPage />} />
              {/* <Route path="/yourreviews" element={<AfterReviewPage/>} /> */}

              <Route path="/aboutus" element={<AboutUsPage />} />
              <Route path="/contactus" element={<ContactPage />} />
            </Routes>
            {/* <Footer /> */}
          </UserProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

// paste in html file
