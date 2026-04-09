import CountDown from "./CountDown";
import { Link, useNavigate } from "react-router-dom";
import HeroSlider from "./HeroSlider";
import { toast } from "react-toastify";

export default function HomePage({ products = [], blogs = [] }) {
  const navigate = useNavigate();

  const addToCart = async (product) => {
    const token = localStorage.getItem("token");

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(product);

    localStorage.setItem("cart", JSON.stringify(existingCart));

    // 🔥 Navbar update
    window.dispatchEvent(new Event("cartUpdated"));

    if (!token) {
      toast.error("Login first");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
        }),
      });

      const data = await res.json();

      if (res.status === 401) {
        toast.error("Session expired, login again");
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      toast.success("Added to cart 🛒");
    } catch (err) {
      toast.error("Error adding to cart");
    }
  };

  return (
    <div className="bg-white text-stone-800">
      
      {/* FONT */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');`}
      </style>

      {/* HERO */}
      <HeroSlider />

      {/* CATEGORIES */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-3xl md:text-4xl font-light text-stone-900 mb-10"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {["Phones", "Laptops", "Watches", "Accessories", "Gaming"].map(
              (cat, i) => (
                <div
                  key={i}
                  className="bg-stone-50 p-6 rounded-2xl hover:bg-amber-50 text-center cursor-pointer transition-all duration-300"
                >
                  <p className="text-sm font-medium">{cat}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-16 md:py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-3xl md:text-4xl font-light text-stone-900 mb-10"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Featured Products
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {products.slice(0, 8).map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.name}
                  loading="lazy"
                  className="h-48 w-full object-cover rounded-xl mb-4"
                />

                <h3
                  className="text-stone-800 font-medium text-sm mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {product.name}
                </h3>

                <p className="text-stone-400 text-xs">
                  {product.category}
                </p>

                <p className="text-stone-900 font-semibold text-base mt-1">
                  ₹{product.price}
                </p>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-3 w-full bg-stone-900 hover:bg-amber-600 text-white py-2.5 text-xs tracking-widest uppercase transition-colors duration-300"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="py-20 text-center bg-stone-900 text-white">
        <CountDown />
      </section>

      {/* BLOG */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-3xl md:text-4xl font-light text-stone-900 mb-10"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Latest Blogs
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl overflow-hidden transition-all duration-500"
              >
                <img
                  src={`http://localhost:5000/uploads/${blog.image}`}
                  alt={blog.title}
                  loading="lazy"
                  className="h-48 w-full object-cover"
                />

                <div className="p-5">
                  <h3
                    className="text-lg font-medium text-stone-800 mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {blog.title}
                  </h3>

                  <p className="text-stone-400 text-sm mb-4">
                    {blog.description?.slice(0, 80)}...
                  </p>

                  <button className="text-amber-600 text-xs uppercase tracking-widest hover:underline">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}