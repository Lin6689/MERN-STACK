import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#FAF8F6] text-red-900 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight">ShopEase</h2>
            <p className="text-red-900 mt-3 text-sm leading-relaxed max-w-xs">
              Premium fashion and lifestyle products for modern everyday living.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-red-900 mb-4">
              Explore
            </h3>
            <div className="space-y-2 text-sm">
              <Link to="/" className="block text-red-900 hover:text-white transition">Home</Link>
              <Link to="/shop" className="block text-red-900 hover:text-white transition">Shop</Link>
              <Link to="/colors" className="block text-red-900 hover:text-white transition">Color Stories</Link>
              <Link to="/contact" className="block text-red-900 hover:text-white transition">Contact</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-red-900 tracking-wider uppercase  mb-4">
              Contact
            </h3>
            <p className="text-red-900 text-sm">support@shopease.com</p>
            <p className="text-red-900 text-sm mt-1">+91 98765 43210</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-neutral-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-sm text-red-900">
          <p>© 2026 ShopEase. All rights reserved.</p>
          <p>Crafted with care</p>
        </div>
      </div>
    </footer>
  );
}