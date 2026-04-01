import React from "react";
import { Link } from "react-router-dom";

const HeroSlider = () => {
  return (
    <section className="bg-[#f5efe6] py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP HERO */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT TEXT */}
          <div>
            <h1 className="text-5xl font-semibold text-gray-900 leading-tight mb-6">
              Enjoy Your Day <br />
              With <span className="text-orange-400">Fashion.</span>
            </h1>

            <p className="text-gray-600 mb-6 max-w-md">
              Discover premium products, modern designs, and trending collections
              crafted for your lifestyle.
            </p>

            <Link
              to="/products"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Shop Now
            </Link>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center">
            <div className="bg-gray-200 rounded-[40px] p-6">
              <img
                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
                alt="model"
                className="w-[280px] h-[380px] object-cover rounded-[30px]"
              />
            </div>
          </div>

        </div>

        {/* BRANDS ROW */}
        <div className="mt-16 flex flex-wrap justify-between items-center gap-6 text-gray-500 text-sm">

          <span>120+ Branded Products</span>

          <div className="flex gap-8 opacity-70">
            <span>Adidas</span>
            <span>Nike</span>
            <span>Puma</span>
            <span>Reebok</span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSlider;