import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

function load(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [ready, setReady] = useState(false); // load hone tak save mat karo

  // 1) pehle load
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (token && userId) {
      setCart(load(`cart_${userId}`));
      setWishlist(load(`wishlist_${userId}`));
    }

    setReady(true);
  }, []);

  // 2) load ke baad hi save
  useEffect(() => {
    if (!ready) return;
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
  }, [cart, ready]);

  useEffect(() => {
    if (!ready) return;
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    localStorage.setItem(`wishlist_${userId}`, JSON.stringify(wishlist));
  }, [wishlist, ready]);

  const token = localStorage.getItem("token");
  const visibleCart = token ? cart : [];
  const visibleWishlist = token ? wishlist : [];

  const handleAddToCart = (product) => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
      return;
    }

    const productId = product._id || product.id;
    const stock = product.stock ?? 0;

    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          (item._id || item.id) === productId && item.size === product.size
      );
      const currentQty = existing ? existing.quantity : 0;

      if (currentQty + 1 > stock) {
        alert(`Only ${stock} available`);
        return prev;
      }

      if (existing) {
        return prev.map((item) =>
          (item._id || item.id) === productId && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, size, quantity) => {
    setCart((prev) =>
      prev.map((item) => {
        if ((item._id || item.id) !== id || (item.size || "M") !== (size || "M"))
          return item;
        const stock = item.stock ?? 0;
        if (quantity > stock) {
          alert(`Only ${stock} available`);
          return item;
        }
        if (quantity < 1) return item;
        return { ...item, quantity };
      })
    );
  };

  const handleRemoveFromCart = (id, size) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            (item._id || item.id) === id &&
            (item.size || "M") === (size || "M")
          )
      )
    );
  };

  const handleToggleWishlist = (product) => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
      return;
    }

    setWishlist((prev) => {
      const productId = product._id || product.id;
      const exists = prev.find((item) => (item._id || item.id) === productId);
      if (exists) {
        return prev.filter((item) => (item._id || item.id) !== productId);
      }
      return [...prev, product];
    });
  };

  const cartCount = visibleCart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );
  const wishlistCount = visibleWishlist.length;

  return (
    <CartContext.Provider
      value={{
        cart: visibleCart,
        wishlist: visibleWishlist,
        cartCount,
        wishlistCount,
        handleAddToCart,
        handleUpdateQuantity,
        handleRemoveFromCart,
        handleToggleWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);