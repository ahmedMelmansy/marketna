"use client";
import {  createContext, useEffect, useState,} from "react";
import toast from "react-hot-toast";

export const CartContext =
  createContext();

export default function CartProvider({
  children,
}) {
  const [cart, setCart] =useState([]);

  useEffect(() => {
    const storedCart =
      localStorage.getItem("cart");

    if (storedCart) {
      setCart(
        JSON.parse(storedCart)
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

function addProductCart(product, quantity = 1) {
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
    );

    toast.success(`Quantity added +${quantity}`);
  } else {
    setCart((prev) => [
      ...prev,
      {
        ...product,
        quantity,
      },
    ]);

    toast.success("Product added to cart");
  }
}
function deleteProductFormCart(product){
    setCart((prev)=> prev.filter((item)=> item.id !== product.id))
}
function updateQuantity(product, type) {
  setCart((prev) =>
    prev.map((item) =>
      item.id === product.id
        ? {
            ...item,
            quantity:
              type === "inc"
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1),
          }
        : item
    )
  );
}
function clearCart() {
  setCart([]);
}
  const getTotal = () => {
  return cart.reduce((acc, item) => acc + (item.sale_price || item.price) * item.quantity, 0);
  };
const cartItems = cart.length
  return (
    <CartContext.Provider
      value={{
        cart,
        addProductCart,
        deleteProductFormCart,
        cartItems,
        getTotal,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}