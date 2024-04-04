import { createContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [PRODUCTS, setPRODUCTS] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollectionRef = collection(db, "products");
        const data = await getDocs(productsCollectionRef);
        const productsData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPRODUCTS(productsData);
        setCartItems(getDefaultCart(productsData));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const getDefaultCart = (products) => {
    const cart = {};
    products.forEach((product) => {
      cart[product.id] = 0;
    });
    return cart;
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemQuantity = cartItems[itemId];
      if (itemQuantity > 0) {
        const itemInfo = PRODUCTS.find((product) => product.id === itemId);
        if (itemInfo) {
          totalAmount += itemQuantity * itemInfo.price;
        }
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkout = () => {
    setCartItems(getDefaultCart(PRODUCTS));
  };

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
    PRODUCTS,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
