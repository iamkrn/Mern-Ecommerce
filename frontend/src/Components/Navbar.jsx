import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, User, Search } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Blogs", path: "/blogs" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    navigate("/login");
    setIsOpen(false);
  };

  const handleRegister = () => {
    navigate("/register");
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null); // ✅ IMPORTANT

    navigate("/login");
  };

  useEffect(() => {
    const updateCart = () => {
      setCart(JSON.parse(localStorage.getItem("cart")) || []);
    };

    const updateUser = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("cartUpdated", updateCart);
    window.addEventListener("storage", updateUser); // ✅ login/logout sync

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <ShoppingCart className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              OurStore
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                  location.pathname === link.path
                    ? "text-blue-600"
                    : "text-gray-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-blue-600">
              <Search className="w-5 h-5" />
            </button>

            <Link to="/cart" className="relative p-2 text-gray-400 hover:text-blue-600">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-blue-600 text-white text-[10px] flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            </Link>

            <div className="h-6 w-px bg-gray-200 mx-2" />

            {/* ✅ CLEAN USER LOGIC */}
            {user ? (
              <div className="flex items-center space-x-3">
                <img
                  src={user.profileImage}
                  alt="user"
                  className="w-9 h-9 rounded-full border"
                />
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="text-sm text-gray-700 hover:text-blue-600"
                >
                  Sign In
                </button>
                <button
                  onClick={handleRegister}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-full"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-gray-400">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white text-[10px] flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            </Link>

            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}>
                  {link.name}
                </Link>
              ))}

              <div className="pt-4">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white py-2 rounded"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <button onClick={handleLogin}>Sign In</button>
                    <button onClick={handleRegister}>Create Account</button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}