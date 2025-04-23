import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  // Load user, userData, and cart from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (storedUser) setUser(storedUser);
    if (storedUserData) setUserData(storedUserData);
    setCart(storedCart);
  }, []);

  // Save user and userData to localStorage when they change
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userData");
    }
  }, [userData]);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const logout = () => {
    setUser(null);
    setUserData(null);
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        user,
        setUser,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
