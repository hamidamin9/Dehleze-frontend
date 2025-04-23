import React from "react";
import PropTypes from "prop-types";
import './CSS/CartDropdown.css'

const CartDropdown = ({ cart, onRemoveItem, onViewCart, onCheckout }) => {
  return (
    <div className="cart-dropdown">
      {cart.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-unstyled cart-items">
            {cart.map((item) => (
              <li
                key={item.id}
                className="d-flex justify-content-between align-items-center mb-3"
              >
                <img
                  src={item.images?.[0]?.image || ""}
                  alt={item.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
                <div className="cart-item-info flex-grow-1">
                  <span className="d-block fw-bold">{item.name}</span>
                  <span className="text-muted">${item.price}</span>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onRemoveItem(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="d-flex ">
            {/* <button className="btn btn-primary" onClick={onViewCart}>
              View Cart
            </button> */}
            <button className="btn btn-success w-full" onClick={onCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

CartDropdown.propTypes = {
  cart: PropTypes.array.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onViewCart: PropTypes.func.isRequired,
  onCheckout: PropTypes.func.isRequired,
};

export default CartDropdown;
