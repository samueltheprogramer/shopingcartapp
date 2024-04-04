import React, { useEffect, useState } from "react";
/* import { PRODUCTS } from "../../products"; */
import { Product } from "./product";
import "./shop.css";
import { auth, db } from "../../config/firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export const Shop = () => {
  const [PRODUCTS, setPRODUCTS] = useState([]);
  const productsCollectionRef = collection(db, "products");

  /*  const getProducts = async () => {
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
    <div className="border-black border-2 m-2 bg-white">
      <div className="shopTitle text-xl">
        <h1>shop here !!</h1>
      </div>

      <div className="grid grid-cols-2  ">
        {PRODUCTS.map((product) => (
          <Product data={product} />
        ))}
      </div>
    </div>
  );
};
