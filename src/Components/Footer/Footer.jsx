import React, { useState, useEffect, useRef } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import logo from "./footericons/logo.png";
import fb from "./footericons/fb.png";
import insta from "./footericons/insta.png";
import twitter from "./footericons/x.png";
import yt from "./footericons/yt.png";
import ep from "./footericons/ep.png";
import jc from "./footericons/jc.png";
import v from "./footericons/v.png";
import mc from "./footericons/mc.png";

const Footer = () => {
  // tags from api
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://39.61.51.195:8004/account/category/")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <>
      <footer className="footer">
        <div className="yfooterContainer">
          <img src={logo} alt="" className="yfooterLogo" />
          <div className="footer-main">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              <div className="column">
                <p className="p-heading">About Us</p>
                <ul>
                  <li>48-A Main Gulberg, Lahore Pakistan</li>
                  <li>dehleze@gmail.Com</li>
                  <li>(+92) 300-8410868</li>
                  <li>Mon - Fri (09:00 AM to 04:50 PM)</li>
                </ul>
              </div>
              <div className="column">
                <p className="p-heading">Our Services</p>
                <ul>
                  <li>
                    <Link className="footer-button" to={"/terms-&-condition"}>
                      Terms & Condition
                    </Link>
                  </li>
                  <li>New Collection</li>
                  <li>Contact Us</li>
                  <li>
                    {" "}
                    <Link
                      className="footer-button"
                      to={"/policies-&-guidelines"}
                    >
                      Policies-&-Guidelines
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="column">
                <p className="p-heading">Information</p>
                <ul>
                  <li>New Collection</li>
                  <li>Contact Us</li>
                  <li>Latest News</li>
                  <li>Our Sitemap</li>
                </ul>
              </div>
              <div className="column">
                <p className="p-heading">Dehleze</p>
                <ul>
                  <li>
                    <Link to="contactus">Help Center</Link>
                  </li>
                  <li>
                    <Link to="contactus">Return & Refunds</Link>
                  </li>
                  <li>
                    <Link to="contactus">Contact us</Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="column">
              <p className="p-heading">Popular Tags</p>
              <div className="tags">
                {categories.map((category) => (
                  <Link
                    key={category.category_id}
                    to={`/products?category=${category.category_id}`}
                    className="footer-tags-link"
                  >
                    <span >{category.name}</span>
                  </Link>
                ))}
              </div>
            </div> */}
            <div className="yfooterSecondRow">
              <div className="column">
                <p className="p-heading">Information</p>
                <div className="ybottomfootericons">
                  <img src={fb} alt="facebook icon" />
                  <img src={insta} alt="instagram icon" />
                  <img src={twitter} alt="twitter icon" />
                  <img src={yt} alt="youtube icon" />
                </div>
                <div>
                  <Link
                    className="YaddToCartBtn footersellerbtn"
                    to="/seller-login"
                    style={{
                      textDecoration: "none",
                      padding: "0.7rem 1rem",
                      fontSize: "1rem",
                    }}
                  >
                    Become a Seller
                  </Link>
                </div>
              </div>
              <div className="column">
                <p className="p-heading">Payment Methods</p>
                <div className="ybottomfootericons yvisa">
                  <div>
                    <img src={ep} alt="Easypaisa icon" />
                    <img src={jc} alt="Jazzcash icon" />
                  </div>
                  <div>
                    <img src={v} alt="Visa card icon" />
                    <img src={mc} alt="Master card icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footerSocialIcons"></div>
          <div class="footer-bottom">
            <p>
              @2025 designed by dehleze.com all coyprights reserved for this
              site
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
