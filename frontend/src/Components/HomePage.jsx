import CountDown from "./CountDown";
import { Link, useNavigate } from "react-router-dom";
import HeroSlider from "./HeroSlider";
import { toast } from "react-toastify";


export default function HomePage({ products = [], blogs = [] }) {
  const navigate = useNavigate();

  const addToCart = async (product) => {
  const token = localStorage.getItem("token");

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
        Authorization: `Bearer ${token}`, // 🔥 MOST IMPORTANT
      },
      body: JSON.stringify({
        productId: product._id, // ✅ only id
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
    navigate("/cart");

  } catch (err) {
    toast.error("Error adding to cart");
  }
};
  return (
    <div className="bg-white text-gray-800">

      {/* HERO */}
      <HeroSlider/>
      {/* CATEGORIES */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10">Categories</h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {["Phones", "Laptops", "Watches", "Accessories", "Gaming"].map((cat, i) => (
              <div
                key={i}
                className="bg-gray-100 p-6 rounded-2xl hover:bg-blue-100 text-center cursor-pointer transition"
              >
                {cat}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10">Featured Products</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {products.slice(0, 8).map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl p-4 hover:shadow-xl transition"
              >
                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.name}
                  loading="lazy"
                  className="h-48 w-full object-cover rounded-xl mb-4"
                />

                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-500 text-sm">{product.category}</p>
                <p className="text-blue-600 font-bold">₹{product.price}</p>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="py-20 text-center bg-black text-white">
        <CountDown />
      </section>

      {/* BLOG */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10">Latest Blogs</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-2xl shadow hover:shadow-xl overflow-hidden transition"
              >
                <img
                  src={`http://localhost:5000/uploads/${blog.image}`}
                  alt={blog.title}
                  loading="lazy"
                  className="h-48 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-500 text-sm mb-4">
                    {blog.description?.slice(0, 80)}...
                  </p>

                  <button className="text-blue-600 font-semibold">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
        <p className="text-gray-600 mb-6">
          Get updates on latest products and offers
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-5 py-3 rounded-xl border w-72"
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
            Subscribe
          </button>
        </div>
      </section>

    </div>
  );
}