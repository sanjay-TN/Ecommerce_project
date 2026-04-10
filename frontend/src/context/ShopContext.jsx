import { createContext, useContext, useEffect, useState } from "react";
import { cartApi, categoryApi, wishlistApi } from "../api/services";
import { useAuth } from "./AuthContext";

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState({ items: [], grandTotal: 0, subtotal: 0, shipping: 0 });
  const [wishlist, setWishlist] = useState([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    categoryApi.getAll().then((response) => setCategories(response.data.data)).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setCart({ items: [], grandTotal: 0, subtotal: 0, shipping: 0 });
      setWishlist([]);
      return;
    }
    refreshCart();
    refreshWishlist();
  }, [isAuthenticated]);

  const refreshCart = async () => {
    const response = await cartApi.get();
    setCart(response.data.data);
  };

  const refreshWishlist = async () => {
    const response = await wishlistApi.get();
    setWishlist(response.data.data);
  };

  const addToCart = async (productId, quantity = 1) => {
    const response = await cartApi.add({ productId, quantity });
    setCart(response.data.data);
  };

  const updateCartItem = async (itemId, quantity) => {
    const response = await cartApi.update(itemId, quantity);
    setCart(response.data.data);
  };

  const removeCartItem = async (itemId) => {
    const response = await cartApi.remove(itemId);
    setCart(response.data.data);
  };

  const toggleWishlist = async (productId) => {
    const exists = wishlist.some((item) => item.id === productId);
    const response = exists ? await wishlistApi.remove(productId) : await wishlistApi.add(productId);
    setWishlist(response.data.data);
  };

  return (
    <ShopContext.Provider
      value={{
        categories,
        cart,
        wishlist,
        refreshCart,
        refreshWishlist,
        addToCart,
        updateCartItem,
        removeCartItem,
        toggleWishlist
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}
