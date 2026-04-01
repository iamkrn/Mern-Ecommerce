import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  
    const navigate = useNavigate();
    const handleRegister = () => {
        navigate("/register");
    }
    const handleLogin = () => {
        navigate("/login");
    }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <h1 className="text-6xl font-bold text-blue-600">
          Our Store
          </h1>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">
              Contacts
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600">
              Products
            </Link>
            <Link to="/blogs" className="text-gray-700 hover:text-blue-600">
              Blogs
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-blue-600">
              Cart
            </Link>
            </div>
            {/**Button div */}
            <div>
              <button onClick={handleLogin} className="bg-blue-600 cursor-pointer text-white px-4 mr-3 py-2 rounded-full hover:bg-blue-700 transition">
            Login
          </button>
          <button onClick={handleRegister} className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
            SignUp
          </button>
          </div>

          {/* Register Button */}
          
        </div>
      </div>
    </nav>
  );
}