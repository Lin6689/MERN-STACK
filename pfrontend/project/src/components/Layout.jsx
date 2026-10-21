import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  const location = useLocation();
  const role = localStorage.getItem("role");
  const isAdminPage = location.pathname.startsWith("/admin");

  // Admin cannot open other pages
  if (role === "admin" && !isAdminPage) {
    window.location.replace("/admin");
    return null;
  }

  // Admin page = no navbar / footer
  if (isAdminPage) {
    return <Outlet />;
  }

  // Normal user pages
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}