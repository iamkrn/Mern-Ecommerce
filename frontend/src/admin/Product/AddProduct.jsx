import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';


const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: ""
    });
     
    const [image, setImage] = useState(null);
        const navigate = useNavigate();
    
    // handle text input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // handle file input
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    // submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("category", formData.category);
            data.append("image", image);

            const res = await axios.post(
                "http://localhost:5000/api/products",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

setTimeout(() => navigate('/admin/products'), 2000);            
console.log(res.data);

        } catch (error) {
            console.error(error);
            alert("Error adding product");
        }
    };

    return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 border border-slate-100">

            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                ➕ Add Product
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Name */}
                <div>
                    <label className="text-sm font-medium text-slate-600">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter product name"
                        onChange={handleChange}
                        required
                        className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="text-sm font-medium text-slate-600">
                        Description
                    </label>
                    <textarea
                        name="description"
                        placeholder="Enter description"
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="text-sm font-medium text-slate-600">
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Enter price"
                        onChange={handleChange}
                        required
                        className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="text-sm font-medium text-slate-600">
                        Category
                    </label>
                    <input
                        type="text"
                        name="category"
                        placeholder="Enter category"
                        onChange={handleChange}
                        required
                        className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                {/* Image */}
                <div>
                    <label className="text-sm font-medium text-slate-600">
                        Product Image
                    </label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full mt-1 text-sm"
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="w-full py-2 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition"
                >
                    Add Product
                </button>

            </form>
        </div>
    </div>
);};

export default AddProduct;