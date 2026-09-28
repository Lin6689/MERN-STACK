import React from "react";
import { CheckCircle, Database, Grid, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const adminLinks = [
    {
      title: "Categories",
      icon: <Grid className="w-5 h-5" />,
      href: "/admin/categories",
    },
    {
      title: "Products",
      icon: <Database className="w-5 h-5" />,
      href: "/admin/products",
    },
    {
      title: "Todos",
      icon: <CheckCircle className="w-5 h-5" />,
      href: "/admin/todos",
    },
  ];

  const userLinks = [
    {
      title: "User Products",
      icon: <ShoppingCart className="w-5 h-5" />,
      href: "/user/products",
    },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-5 flex flex-col gap-6">
      {/* ADMIN SECTION */}
      <div>
        <h3 className="text-gray-400 text-sm mb-2">ADMIN</h3>
        {adminLinks.map((link) => {
          const isActive = location.pathname === link.href;

          return (
            <Link
              key={link.title}
              to={link.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition 
                ${isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-800"}`}
            >
              {link.icon}
              {link.title}
            </Link>
          );
        })}
      </div>

      {/* USER SECTION */}
      <div>
        <h3 className="text-gray-400 text-sm mb-2">USER</h3>
        {userLinks.map((link) => {
          const isActive = location.pathname === link.href;

          return (
            <Link
              key={link.title}
              to={link.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition 
                ${isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-800"}`}
            >
              {link.icon}
              {link.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;