import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import HomePage from "../Components/HomePage";

function Home() {
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // PRODUCTS API
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        console.log("Products:", data);
        setProducts(data);
      })
      .catch(err => console.log(err));

    // BLOGS API
    fetch("http://localhost:5000/api/blogs")
      .then(res => res.json())
      .then(data => {
        console.log("Blogs:", data);
        setBlogs(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <HomePage products={products} blogs={blogs} />
      <Footer />
    </>
  );
}

export default Home;