"use client";

import {
  createContext,
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

export const FavoriteContext =
  createContext();

export default function FavoriteProvider({
  children,
}) {
  const [favorites, setFavorites] =
    useState([]);

  useEffect(() => {
    const storedFavorites =
      localStorage.getItem("favorites");

    if (storedFavorites) {
      setFavorites(
        JSON.parse(storedFavorites)
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  function toggleFavorite(product) {
    const exists = favorites.find(
      (item) => item.id === product.id
    );

    if (exists) {
      setFavorites((prev) =>
        prev.filter(
          (item) =>
            item.id !== product.id
        )
      );
      toast.success(
        "Product removed from favorites"
      );
    } else {
      setFavorites((prev) => [
        ...prev,
        product,
      ]);

      toast.success(
        "Product added to favorites"
      );
    }
  }

  function isFavorite(productId) {
    return favorites.some(
      (item) => item.id === productId
    );
  }
  const favoriteItems = favorites.length
  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        favoriteItems
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}