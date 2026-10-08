import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import ColorStories from "./pages/ColorStories";
import ContactForm from "./pages/ContactForm";
import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Add to Cart
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Update quantity
  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) {
      handleRemoveFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Remove from cart
  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Toggle Wishlist
  const handleToggleWishlist = (product) => {
  setWishlist((prev) => {
    const productId = product._id || product.id;

    const exists = prev.find(
      (item) => (item._id || item.id) === productId
    );

    if (exists) {
      return prev.filter(
        (item) => (item._id || item.id) !== productId
      );
    }

    return [...prev, product];
  });
};

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar cartCount={cartCount} wishlistCount={wishlistCount} />

        <main className="flex-1">
          <Routes>
           <Route path="/" element={<Home />} />
            <Route
              path="/shop"
              element={
                <Shop
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  wishlist={wishlist}
                />
              }
            />
            <Route
  path="/product/:id"
  element={
    <ProductDetail
      onAddToCart={handleAddToCart}
      onToggleWishlist={handleToggleWishlist}
      wishlist={wishlist}
    />
  }
/>
          




<Route path="/colors" element={<ColorStories />} />
<Route path="/contact" element={<ContactForm />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/admin" element={<Admin />} />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveFromCart={handleRemoveFromCart}
                />
              }
            />
            <Route
              path="/wishlist"
              element={
                <Wishlist
                  wishlist={wishlist}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                />
              }
            />
          </Routes>
        </main>
<Footer/>
        
      </div>
    </BrowserRouter>
  );
}

export default App;