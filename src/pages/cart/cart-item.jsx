import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const CartItem = (props) => {
  const { id, productName, price, productImageName } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  return (
    <div className="cartItem ">
      <img
        className="h-[100px]"
        src={`https://firebasestorage.googleapis.com/v0/b/cartshopingapp2.appspot.com/o/images%2F${productImageName}?alt=media&token=9a3dfd03-3038-4b38-952b-ebbe4c054b99`}
      />
      <div className="description text-center">
        <p>
          <b className="text-black font-black text-xl">{productName}</b>
        </p>
        <p className="text-black font-black text-base"> Price: ₹{price}</p>
        <div className="countHandler">
          <button className="text-xl" onClick={() => removeFromCart(id)}>
            -
          </button>
          <input
            className="border-blue-400 border-2 m-2"
            value={cartItems[id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <button className="text-xl" onClick={() => addToCart(id)}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};
