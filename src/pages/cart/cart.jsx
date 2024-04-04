import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shop-context";
/* import { PRODUCTS } from "../../products"; */
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";

import "./cart.css";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
export const Cart = () => {
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const navigate = useNavigate();

  const [PRODUCTS, setPRODUCTS] = useState([]);
  const productsCollectionRef = collection(db, "products");

  /* const getProducts = async () => {
    const data = await getDocs(productsCollectionRef);
    setPRODUCTS(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getProducts();
  }); */

  useEffect(() => {
    const querydata = query(
      productsCollectionRef,
      where("userId", "==", auth.currentUser.uid)
    );
    const unsuscribe = onSnapshot(querydata, (snapshot) => {
      let products = [];
      snapshot.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });
      setPRODUCTS(products);
    });
    return () => unsuscribe;
  }, []);

  return (
    <div className="cart border-2 border-black m-1">
      <div>
        <h1 className="text-xl">Your Cart Items</h1>
      </div>
      <div className="cart">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} />;
          }
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p className="text-center text-xl m-2">
            Total Amount: ₹{totalAmount}
          </p>
          <button onClick={() => navigate("/shop")}> Continue Shopping </button>
          <button
            onClick={() => {
              checkout();
              navigate("/checkouts");
            }}
          >
            Checkout
          </button>
        </div>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};
