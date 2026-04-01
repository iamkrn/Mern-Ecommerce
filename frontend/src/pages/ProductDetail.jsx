import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async (productId) => {
          const token = localStorage.getItem("token");
  
          if (!token) {
              toast.error("Login first 🔐");
              navigate("/login");
              return;
          }
  
          try {
              const res = await fetch("http://localhost:5000/api/cart/add", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`, // ✅ MOST IMPORTANT
                  },
                  body: JSON.stringify({ productId }),
              });
  
              const data = await res.json();
  
              // 🔥 HANDLE ERROR PROPERLY
              if (!res.ok) {
                  toast.error(data.message || "Failed to add");
                  return;
              }
  
              toast.success("Added to cart 🛒");
          } catch (error) {
              console.log("ADD ERROR", error);
              toast.error("Server error");
          }
      };
  

  if (!product) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Loading product...
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full grid md:grid-cols-2 overflow-hidden">

        {/* IMAGE */}
        <div className="h-96">
          <img
            src={`http://localhost:5000/uploads/${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* DETAILS */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {product.name}
            </h2>

            <p className="text-gray-500 mt-3">
              {product.description}
            </p>

            <div className="mt-4 text-2xl font-bold text-indigo-600">
              ₹{product.price}
            </div>

            <span className="inline-block mt-3 px-3 py-1 bg-gray-200 rounded-full text-sm">
              {product.category}
            </span>
          </div>

          {/* BUTTON */}
          <button
                                                      onClick={() => addToCart(product._id)}

            className="mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ProductDetail;