"use client";

import { auth } from "@/firebase/firebaseConfig";
import { createCheckout } from "@/lib";
import { TCartData, TProduct } from "@/types/typescript.types";
import { Timestamp, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";

const BuyNowButton = ({
  product,
  selectedSize,
}: {
  product: TProduct;
  selectedSize: string;
}) => {
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyNowClick = async () => {
    if (!user) {
      alert("Login first");
      return;
    }

    setIsLoading(true);

    const cartItem: TCartData = {
      category: product.category,
      createdAt: serverTimestamp() as Timestamp,
      productName: product.productName,
      productDescription: product.productDescription,
      price: Number(product.price),
      productImages: [product.productImages[0]],
      slug: product.slug,
      quantity: Number(product.quantity),
      selectedSize: selectedSize,
    };

    try {
      await createCheckout(user, {
        cartData: [cartItem],
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating checkout:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleBuyNowClick}
        disabled={isLoading}
        className={`flex-none bg-purple-500 border border-transparent rounded-full py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-[#bf86da] ${
          isLoading ? "opacity-50 cursor-not-allowed" : "" 
        }`}
      >
        {isLoading ? "Loading..." : "Buy Now"}
      </button>
    </>
  );
};

export default BuyNowButton;