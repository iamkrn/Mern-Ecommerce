import { useEffect, useState } from "react";
import axios from "axios";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products");

            const data = Array.isArray(res.data)
                ? res.data
                : Array.isArray(res.data?.data)
                ? res.data.data
                : [];

            setProducts(data);

        } catch (error) {
            console.error(error);
            setProducts([]);
        }
    };

    //DELETE FUNCTION
    const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
        const token = localStorage.getItem("token");

        await axios.delete(
            `http://localhost:5000/api/products/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setProducts(products.filter((p) => p._id !== id));

    } catch (error) {
        console.error(error.response?.data || error.message);
        alert("Delete failed");
    }
};
    //EDIT FUNCTION (basic prompt)
   const handleEdit = async (product) => {
    const newName = prompt("Enter new name", product.name);
    if (!newName) return;

    try {
        const token = localStorage.getItem("token");

        const res = await axios.put(
            `http://localhost:5000/api/products/${product._id}`,
            { name: newName },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setProducts(products.map((p) =>
            p._id === product._id ? res.data : p
        ));

    } catch (error) {
        console.error(error.response?.data || error.message);
        alert("Update failed");
    }
};
    return (
        <div className="min-h-screen bg-gray-50 p-6">

            {/* Header */}
            <div className="max-w-4xl mx-auto mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    🛠️ Manage Products
                </h1>
            </div>

            {/* List */}
            <div className="max-w-4xl mx-auto space-y-5">

                {products.length === 0 && (
                    <p className="text-center text-gray-400 mt-20">
                        No products found
                    </p>
                )}

                {products.map((p) => (
                    <div
                        key={p._id}
                        className="bg-white rounded-xl shadow-sm border flex overflow-hidden hover:shadow-md transition"
                    >

                        {/* Image (Left side) */}
                        <div className="w-40 h-40 bg-gray-100 flex shrink-0">
                            <img
                                src={`http://localhost:5000/uploads/${p.image}`}
                                alt={p.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = "https://dummyimage.com/200x200/cccccc/000000&text=No+Image";
                                }}
                            />
                        </div>

                        {/* Content (Right side) */}
                        <div className="flex-1 p-4 flex flex-col justify-between">

                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {p.name}
                                </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                    {p.description}
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                    {p.category}
                                </p>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <span className="text-indigo-600 font-bold text-lg">
                                    ₹{p.price}
                                </span>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(p)}
                                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(p._id)}
                                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
};

export default AdminProducts;