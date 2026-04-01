import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/blogs");

            const data = Array.isArray(res.data)
                ? res.data
                : Array.isArray(res.data?.data)
                ? res.data.data
                : [];

            setBlogs(data);

        } catch (error) {
            console.error(error);
            setBlogs([]);
        }
    };

    //DELETE FUNCTION
    const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
        const token = localStorage.getItem("token");

        await axios.delete(
            `http://localhost:5000/api/blogs/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setBlogs(blogs.filter((p) => p._id !== id));

    } catch (error) {
        console.error(error.response?.data || error.message);
        alert("Delete failed");
    }
};
    //EDIT FUNCTION (basic prompt)
   const handleEdit = async (blog) => {
    const newName = prompt("Enter new name", blog.name);
    if (!newName) return;

    try {
        const token = localStorage.getItem("token");

        const res = await axios.put(
            `http://localhost:5000/api/blogs/${blog._id}`,
            { name: newName },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setBlogs(blogs.map((p) =>
            p._id === blog._id ? res.data : p
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
                    🛠️ Manage Blogs
                </h1>
            </div>

            {/* List */}
            <div className="max-w-4xl mx-auto space-y-5">

                {blogs.length === 0 && (
                    <p className="text-center text-gray-400 mt-20">
                        No products found
                    </p>
                )}

                {blogs.map((p) => (
                    <div
                        key={p._id}
                        className="bg-white rounded-xl h-full w-full shadow-sm border flex overflow-hidden hover:shadow-md transition"
                    >

                        {/* Image (Left side) */}
                        <div className="w-80 h-80 bg-gray-100 flex shrink-0">
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
                                    {p.title}
                                </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                    {p.description}
                                </p>

                                </div>

                            <div className="flex items-center justify-between mt-4">
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

}

export default AdminBlogs