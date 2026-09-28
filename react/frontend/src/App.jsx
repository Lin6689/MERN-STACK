import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Common Components
import Sidebar from "./components/common/Sidebar";

// Pages
import Home from "./pages/Home";

// Admin - Categories
import CategoriesList from "./admin/categories/CategoriesList";
import CategoryCreate from "./admin/categories/CategoryCreate";
import CategoryUpdate from "./admin/categories/CategoryUpdate";

// Admin - Products
import ProductList from "./admin/products/ProductList";
import ProductCreate from "./admin/products/ProductCreate";
import ProductUpdate from "./admin/products/ProductUpdate";

// Admin - Todo
import TodoList from "./admin/todo/TodoList";

// User Pages
import UserProducts from "./user/pages/UserProducts";
import UserCart from "./user/pages/UserCart";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <div className="flex min-h-screen">
      
        <Sidebar />

    
        <div className="flex-1 p-6 overflow-auto">
          <Routes>
            
            <Route path="/" element={<Home />} />

            
        
            <Route path="/admin/categories" element={<CategoriesList />} />
            <Route path="/admin/categories/create" element={<CategoryCreate />} />
            <Route path="/admin/categories/:id" element={<CategoryUpdate />} />

            {/* Products */}
            <Route path="/admin/products" element={<ProductList />} />
            <Route path="/admin/products/create" element={<ProductCreate />} />
            <Route path="/admin/products/:id" element={<ProductUpdate />} />

            
            <Route path="/admin/todos" element={<TodoList />} />

            
            <Route path="/user/products" element={<UserProducts />} />
            <Route path="/user/cart" element={<UserCart cart={[]} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;