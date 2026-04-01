import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';
import '../style.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 🔥 FETCH PRODUCTS
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('/products');
                setProducts(response.data);
            } catch (error) {
                toast.error('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // 🔐 LOGOUT
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // ✅ important
        toast.success("Logged out");
        navigate('/');
    };

    // 🛒 ADD TO CART (FINAL FIXED)
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

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">

                {/* Top Bar */}
                <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-800">
                            🛍️ Explore Products
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Find the best items just for you
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Link
                            to="/update"
                            className="px-4 py-2 text-sm bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition shadow-sm font-medium"
                        >
                            My Profile
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium shadow"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="text-center text-gray-500 mt-20 text-lg animate-pulse">
                        Loading products...
                    </div>
                )}

                {/* Empty */}
                {!loading && products.length === 0 && (
                    <div className="text-center text-gray-400 mt-20">
                        <p className="text-6xl mb-4">📦</p>
                        <p className="text-xl font-semibold">No products available</p>
                        <p className="text-sm mt-1">Please add some products</p>
                    </div>
                )}

                {/* Grid */}
                {!loading && products.length > 0 && (
                    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                        {products.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition duration-300 group flex flex-col"
                            >

                                {/* Image */}
                                <div className="relative h-52 overflow-hidden">
                                    {product.image ? (
                                        <img
                                            src={`http://localhost:5000/uploads/${product.image}`}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            onError={(e) => {
                                                e.target.src = "https://dummyimage.com/400x300/cccccc/000000&text=No+Image";
                                            }}
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-5xl bg-gray-100">
                                            🛒
                                        </div>
                                    )}

                                    <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                                        {product.category}
                                    </span>
                                </div>

                                {/* Info */}
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                                        {product.name}
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                        {product.description}
                                    </p>

                                    {/* Price */}
                                    <div className="mt-3 text-xl font-bold text-indigo-600">
                                        ₹{product.price}
                                    </div>

                                    {/* Buttons */}
                                    <div className="mt-auto pt-4 flex gap-2">
                                        <Link
                                            to={`/product/${product._id}`}
                                            className="flex-1 text-center bg-gray-100 text-gray-700 text-sm py-2 rounded-lg hover:bg-gray-200 transition"
                                        >
                                            View
                                        </Link>

                                        <button
                                            onClick={() => addToCart(product._id)}
                                            className="flex-1 bg-indigo-600 text-white text-sm py-2 rounded-lg hover:bg-indigo-700 transition"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))}

                    </div>
                )}
            </div>

            <Footer />
        </>
    );
};

export default Products;