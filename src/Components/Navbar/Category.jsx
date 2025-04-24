import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./CSS/sliderStyles.css"; // Ensure this CSS file contains your styles

const CategoryBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategory1, setSubcategory1] = useState({});
  const [subcategory2, setSubcategory2] = useState({});
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredSubcat1, setHoveredSubcat1] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Ref for outside click detection

  // Fetch categories, subcategory1, and subcategory2
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [catRes, sub1Res, sub2Res] = await Promise.all([
          axios.get("http://39.61.51.195:8004/account/category/"),
          axios.get("http://39.61.51.195:8004/account/subcategory1/"),
          axios.get("http://39.61.51.195:8004/account/subcategory2/"),
        ]);

        // Set State
        setCategories(catRes.data);

        const groupedSub1 = {};
        sub1Res.data.forEach((sub) => {
          const catId = sub.category;
          if (!groupedSub1[catId]) groupedSub1[catId] = [];
          groupedSub1[catId].push(sub);
        });
        setSubcategory1(groupedSub1);

        const groupedSub2 = {};
        sub2Res.data.forEach((sub) => {
          const sub1Id = sub.category1_id;
          if (!groupedSub2[sub1Id]) groupedSub2[sub1Id] = [];
          groupedSub2[sub1Id].push(sub);
        });
        setSubcategory2(groupedSub2);

        // Save to localStorage
        localStorage.setItem("categories", JSON.stringify(catRes.data));
        localStorage.setItem("subcategory1", JSON.stringify(sub1Res.data));
        localStorage.setItem("subcategory2", JSON.stringify(sub2Res.data));

        // Log data to console for debugging
        console.log("Categories:", catRes.data);
        console.log("Subcategory1:", sub1Res.data);
        console.log("Subcategory2:", sub2Res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setHoveredCategory(null);
        setHoveredSubcat1(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle category, subcategory1, subcategory2 selection
  const handleSelection = (id, level) => {
    if (!id || !level) {
      console.warn("handleSelection requires both id and level.");
      return;
    }

    setIsDropdownOpen(false);
    setHoveredCategory(null);
    setHoveredSubcat1(null);

    console.log(`${id} ${level}Id checking..../////`);

    // 🧹 Remove all previously stored selections
    localStorage.removeItem("selected_category");
    localStorage.removeItem("selected_subcategory1");
    localStorage.removeItem("selected_subcategory2");
    localStorage.removeItem("last_selected");

    // ✅ Save only the current selection
    try {
      localStorage.setItem(
        "last_selected",
        JSON.stringify({ level, id, time: Date.now() })
      );
      console.log(`✅ Saved latest selection: ${level} -> ${id}`);
    } catch (error) {
      console.error("❌ Error saving selection:", error);
    }

    let url = "/products?";
    url += `${level}=${id}`;
    url += `&t=${Date.now()}`; // avoid caching

    navigate(url);
  };

  return (
    <div className="h-header">
      <div className="h-header-left">
        <div className="desktop-menu">
          <div className="h-container" ref={dropdownRef}>
            <div
              className="h-category"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                <strong className="cate-strong">
                  <i className="fa fa-th-list p-2" aria-hidden="true"></i>
                  All Categories
                </strong>
              </span>

              {/* Dropdown Starts */}
              {isDropdownOpen && (
                <ul className="h-dropdown">
                  {categories.map((category) => (
                    <li
                      key={category.category_id}
                      onMouseEnter={() =>
                        setHoveredCategory(category.category_id)
                      }
                      onClick={() =>
                        handleSelection(category.category_id, "category")
                      }
                    >
                      <Link className="slide-link">{category.name}</Link>

                      {/* Subcategory1 */}
                      {hoveredCategory === category.category_id &&
                        subcategory1[category.category_id] && (
                          <div className="subcategory-box">
                            <ul>
                              {subcategory1[category.category_id].map(
                                (sub1) => (
                                  <li
                                    key={sub1.category1_id}
                                    onMouseEnter={() =>
                                      setHoveredSubcat1(sub1.category1_id)
                                    }
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSelection(
                                        sub1.category1_id,
                                        "subcategory1"
                                      );
                                    }}
                                    className="sub1-item"
                                  >
                                    <Link className="slide-link">
                                      {sub1.name}
                                    </Link>

                                    {/* Subcategory2 */}
                                    {hoveredSubcat1 === sub1.category1_id &&
                                      subcategory2[sub1.category1_id] && (
                                        <div className="subcategory-box sub-sub">
                                          <ul>
                                            {subcategory2[
                                              sub1.category1_id
                                            ].map((sub2) => (
                                              <li
                                                key={sub2.category2_id}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleSelection(
                                                    sub2.category2_id,
                                                    "subcategory2"
                                                  );
                                                }}
                                              >
                                                <Link className="slide-link">
                                                  {sub2.name}
                                                </Link>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                    </li>
                  ))}
                </ul>
              )}
              {/* Dropdown Ends */}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="yNavFlex">
            <NavLink to="/" className="h-heading">
              Home
            </NavLink>
            {/* <NavLink to="/shop" className="h-heading">
              Shop
            </NavLink> */}
            <NavLink to="/aboutus" className="h-heading">
              About
            </NavLink>
            <NavLink to="/contactus" className="h-heading">
              Contact Us
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default CategoryBar;
