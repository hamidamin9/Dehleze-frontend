import React from "react";
import sellerBanner from "../../Navbar/CSS/Assets/Banners/SellerBanner.jpg";

const SellerPage = () => {
  return (
    
    <div className="image-container">
        <a
          href="http://39.61.51.195:8004/seller/"
          target="_blank"
          rel="noopener noreferrer"
        >
      <img src={sellerBanner} alt="Background" className="background-image" />
        </a>
    </div>
  );
};

export default SellerPage;
