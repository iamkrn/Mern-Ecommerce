import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddBlogs = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    date: ""
  });

  const { title, description, image, date } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      data.append("image", image);
      data.append("date", date);

      await axios.post("http://localhost:5000/api/blogs", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      toast.success("Blog added successfully");
      navigate("/blogs");

    } catch (error) {
      console.error(error);
      toast.error("Error adding blog");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add Blog</h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>

        {/* Image */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full"
            required
          />
        </div>

        {/* Date */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="text"
            name="date"
            value={date}
            onChange={handleChange}
            placeholder="March 2026"
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Blog
        </button>
      </form>

    </div>
  );
};

export default AddBlogs;