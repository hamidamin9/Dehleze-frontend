import React from "react";
import { NavLink } from "react-router-dom";

function DShopTopPagination() {
  return (
    <>
      <div className="YglobalFlex YshopTopPagination">
        <NavLink to="/">
          <i className="fa-solid fa-chevron-left"></i>&nbsp; Home
        </NavLink>
        <NavLink to="/">
          Shop
        </NavLink>
        {/* <p>Shop</p> */}
      </div>
    </>
  );
}

export default DShopTopPagination;
