import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const Product = (props) => {
  const { id, productName, price, productImageName } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemCount = cartItems[id];

  const handelDeleteProducts = async (id) => {
    const productsDocs = doc(db, "products", id);
    await deleteDoc(productsDocs);
  };
  return (
    <div className="product bg-white shadow-lg">
      <img
        className="h-[100px]"
        src={`https://firebasestorage.googleapis.com/v0/b/cartshopingapp2.appspot.com/o/images%2F${productImageName}?alt=media&token=9a3dfd03-3038-4b38-952b-ebbe4c054b99`}
      />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> ₹{price}</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
      <button
        className="text-black font-black"
        onClick={() => handelDeleteProducts(id)}
      >
        X
      </button>
    </div>
  );
};
