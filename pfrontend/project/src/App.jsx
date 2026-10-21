import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Layout from "./components/Layout";


import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import ColorStories from "./pages/ColorStories";
import ContactForm from "./pages/ContactForm";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Buy from "./pages/Buy";
import Review from "./pages/Review";
import OrderConfirm from "./pages/OrderConfirm";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/colors" element={<ColorStories />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/buy/:id" element={<Buy />} />
           <Route path="/review/:productId" element={<Review />} />
           <Route path="/order-confirm/:id" element={<OrderConfirm />} />
         <Route path="/profile" element={<Profile />} />
            <Route
              path="/admin"
              element={
               
                  <Admin />
                
              }
            />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}