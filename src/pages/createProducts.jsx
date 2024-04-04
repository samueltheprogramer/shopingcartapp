import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db, storage } from "../config/firebase";
import { ref, uploadBytes } from "firebase/storage";

export default function CreateProducts() {
  const [productImage, setProductImage] = useState();
  const [productImageName, setProductImageName] = useState();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const productsCollectionRef = collection(db, "products");

  const handelAddProducts = async () => {
    await addDoc(productsCollectionRef, {
      productName,
      price,
      productImageName,
      userId: auth.currentUser.uid,
    });
  };

  const handelImageuplode = async () => {
    imageName();
    addImage();
  };

  const imageName = () => {
    setProductImageName(productImage?.name);
  };
  const addImage = async () => {
    if (productImage == null) return;
    const metadata = { contentType: "image/jpeg" };
    const imageRef = ref(storage, `images/${productImage.name}`);
    await uploadBytes(imageRef, productImage, metadata);
  };
  return (
    <div className="p-2 bg-blue-300">
      <div
        action=""
        className="flex flex-col border-black border-2 rounded-lg justify-center items-center text-center gap-2"
      >
        <div className="flex flex-col">
          <label htmlFor="" className="text-xl">
            productName
          </label>
          <input
            className="border-black border-2"
            type="text"
            name=""
            id=""
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="" className="text-xl">
            price
          </label>
          <input
            className="border-black border-2"
            type="number"
            name=""
            id=""
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-2">
          <input
            type="file"
            name=""
            id=""
            onChange={(e) => setProductImage(e.target.files[0])}
          />
        </div>
        <button
          onClick={handelImageuplode}
          className="bg-blue-600 text-white rounded-xl p-2 hover:bg-green-300 hover:text-black"
        >
          step1: uplode Image
        </button>
        <button
          className="bg-blue-600 text-white rounded-xl p-2 hover:bg-green-300 hover:text-black"
          onClick={handelAddProducts}
        >
          step2: create product
        </button>
      </div>
    </div>
  );
}
