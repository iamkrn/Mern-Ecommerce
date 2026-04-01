import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { useState } from 'react'
import { useEffect } from 'react'

const Blog = () => {

  const [blogs,setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("http://localhost:5000/api/blogs");
      const data = await response.json();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <Navbar />

      <div className='w-full min-h-screen bg-gray-100 px-6 py-10'>

        {/* Heading */}
        <h1 className='text-3xl font-bold text-center mb-10'>
          Our Blogs
        </h1>

        {/* Blog Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>

          {blogs.map((blog) => (
            <div 
              key={blog._id} 
              className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300'
            >

              {/* Image */}
              <img 
  src={`http://localhost:5000/uploads/${blog.image}`} 
  alt={blog.title} 
  className='w-full h-52 object-cover'
/>
              {/* Content */}
              <div className='p-4'>
                <p className='text-sm text-gray-500'>{blog.date}</p>

                <h2 className='text-lg font-semibold mt-2'>
                  {blog.title}
                </h2>

                <p className='text-gray-600 text-sm mt-2'>
                  {blog.description}
                </p>

                <button className='mt-4 text-blue-600 font-medium hover:underline'>
                  Read More →
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>

      <Footer />
    </>
  )
}

export default Blog