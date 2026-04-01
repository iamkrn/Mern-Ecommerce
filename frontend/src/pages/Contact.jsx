import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { toast } from "react-toastify";

import axios from "axios"

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange =(e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try {
        
    const res  = await axios.post("http://localhost:5000/api/contact",form);
    toast.success(res.data.message || "message send successfully");

    setForm({
      name: "",
      email: "",
      message: "",


    })

    } catch (error) {
         if(error.response && error.response.data && error.response.data.message ){
            toast.error(error.response.data.message)
         }else{
          toast.error("something went wrong")
         }
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">

        {/* HERO */}
        <div className="bg-indigo-600 text-white py-14 text-center">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-2 opacity-90">
            We'd love to hear from you
          </p>
        </div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">

          {/* LEFT INFO */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>

            <p className="text-gray-600 mb-6">
              Have questions about products, orders, or anything else?  
              Our team is ready to help you.
            </p>

            <div className="space-y-4 text-gray-700">
              <p>📍 Address: Amritsar, India</p>
              <p>📞 Phone: +91 9876543210</p>
              <p>📧 Email: ourstore@gmail.com</p>
            </div>
          </div>

          {/* FORM */}
          <div className="bg-white p-6 rounded-2xl shadow">

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded-lg"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded-lg"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded-lg"
              />

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;