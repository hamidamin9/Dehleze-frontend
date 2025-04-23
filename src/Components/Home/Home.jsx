import React from "react";
import ProductsPage from "../Products/Product";
import Category from "../Category/Category";
import Banner from "../Products/Banners/Banners";
import FeatureProducts from "../Products/FeatureProducts/FeatureProducts";
import DailyDeals from "../Products/DealyDeals/DailyDeals";
import Sliders from "../Navbar/Sliders";
import Bestsellingproducts from "../Products/BestSellingProducts/Bestsellingproducts";
import Footer from "../Footer/Footer";

const Home = () => {
  const products = [
    {
      name: "Product 1",
      image: "https://via.placeholder.com/800x400?text=Product+1",
    },
    {
      name: "Product 2",
      image: "https://via.placeholder.com/800x400?text=Product+2",
    },
    {
      name: "Product 3",
      image: "https://via.placeholder.com/800x400?text=Product+3",
    },
    {
      name: "Product 4",
      image: "https://via.placeholder.com/800x400?text=Product+4",
    },
    {
      name: "Product 5",
      image: "https://via.placeholder.com/800x400?text=Product+5",
    },
  ];

  const product = {
    image:
      "https://demo1.wpthemego.com/themes/sw_bosmarket/wp-content/uploads/2016/10/16.jpg",
    discount: 4,
    title: "Quia Dolor Sit",
    originalPrice: 83,
    salePrice: 80,
    description:
      "Style Code Live is a daily, live show where style enthusiasts can connect, chat, shop, and get the inside scoop on the latest fashion and beauty trends.",
    available: 13,
    sold: 8,
    countdown: "3384 DAYS : 07 HOURS : 43 MINS : 12 SECS",
  };

  return (
    <>
      <Sliders />
      <div className="cate-heading" style={{ marginBottom: "3rem" }}>
        <h2 className="">Popular Categories</h2>
      </div>
      <Category />
      <Banner />
      <div className="cate-heading" style={{ marginBottom: "3rem" }}>
        <h2 className="">Best selling products</h2>
      </div>

      <Bestsellingproducts />

      <div className="cate-heading" style={{ marginBottom: "3rem" }}>
        <h2 className="">Daily Deals</h2>
      </div>
      <DailyDeals />
      <div
        className="cate-heading"
        style={{ marginBottom: "0.5rem", marginTop: "20px" }}
      >
        <h2 className="">Best Feature products</h2>
      </div>
      <FeatureProducts />
      <Footer />
    </>
  );
};

export default Home;
