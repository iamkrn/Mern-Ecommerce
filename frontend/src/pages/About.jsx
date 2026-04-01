import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const About = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">

        {/* HERO SECTION */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-16 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Our Store
          </h1>
          <p className="max-w-2xl mx-auto text-lg opacity-90">
            We bring you the best products with top quality and unbeatable prices.
          </p>
        </div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">

          {/* IMAGE */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
              alt="store"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </div>

          {/* TEXT */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Who We Are
            </h2>

            <p className="text-gray-600 mb-4">
              We are a modern eCommerce platform dedicated to providing high-quality
              products across multiple categories like electronics, fashion, and
              lifestyle.
            </p>

            <p className="text-gray-600 mb-4">
              Our mission is simple — deliver the best shopping experience with
              fast delivery, secure payments, and excellent customer support.
            </p>

            <p className="text-gray-600">
              Whether you're looking for the latest gadgets or daily essentials,
              we've got you covered.
            </p>
          </div>
        </div>

        {/* FEATURES */}
        <div className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6 text-center">

            <div className="p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-3">🚚</div>
              <h3 className="font-semibold text-lg">Fast Delivery</h3>
              <p className="text-gray-500 mt-2 text-sm">
                Get your orders delivered quickly at your doorstep.
              </p>
            </div>

            <div className="p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-semibold text-lg">Secure Payment</h3>
              <p className="text-gray-500 mt-2 text-sm">
                100% secure payment methods for safe transactions.
              </p>
            </div>

            <div className="p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-3">💎</div>
              <h3 className="font-semibold text-lg">Premium Quality</h3>
              <p className="text-gray-500 mt-2 text-sm">
                We ensure top-notch quality for all our products.
              </p>
            </div>

          </div>
        </div>

        {/* CTA */}
        <div className="bg-indigo-600 text-white text-center py-12 px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to start shopping?
          </h2>
          <p className="mb-6 opacity-90">
            Explore our products and find what suits you best.
          </p>

          <a
            href="/products"
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Browse Products
          </a>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default About;