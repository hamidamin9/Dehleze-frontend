import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import PaginationBtns from "./PaginationBtns";
import { YglobalAppContext } from "../context/AppContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const placeholderImage = "https://via.placeholder.com/150";

function YShopRightProducts({ filter_products }) {
  console.log(filter_products, 'filter_products checking 123...')
  window.scrollTo(0, 0);
  const { productsperpage, currentpagenumber, isLoading } =
    useContext(YglobalAppContext);

  let indexOfLastProduct = currentpagenumber * productsperpage;
  let indexOfFirstProduct = indexOfLastProduct - productsperpage;
  let currentProducts = filter_products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  console.log(currentProducts, "current products checking....");
  return (
    <>
      <div className="YshopRightProducts">
        {!isLoading ? (
          <div className="YshopRightProductsFlex YglobalFlex">
            {currentProducts.map((p) => {
              return (
                <>
                  <div key={p.id} className="YshopRightProduct">
                    <div className="productImage">
                      <img
                        src={p.color_image || placeholderImage}
                        alt=""
                      />
                    </div>
                    <div className="productDetails YglobalFlex">
                      <h3>{p.name}</h3>
                      {
                        p.discount_percentage > 0 && <h5>{p.discount_percentage}% Off</h5>
                      }
                      {
                        p.discount_percentage > 0 ? <h2>Rs {(p.price * (1 - p.discount_percentage / 100)).toFixed(2)} </h2> :
                          <h2>Rs {p.price} </h2>
                      }

                      {/* <h2>Stock: {p.stock} </h2> */}
                      <NavLink
                        style={{ textDecoration: "none" }}
                        to={`/product-details/${p.id}`}
                        className="YaddToCartBtn"
                      >
                        View Details
                      </NavLink>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>
      <PaginationBtns
        totalProducts={filter_products.length}
        productsperpage={productsperpage}
        currentpagenumber={currentpagenumber}
      />
    </>
  );
}

export default YShopRightProducts;
