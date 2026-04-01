import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Register from './pages/Register';
import UpdateProfile from './pages/UpdateProfile';

import AdminProducts from './admin/Product/AdminProducts';
import AddProduct from './admin/Product/AddProduct';
import Blog from './pages/Blog';
import AddBlogs from './admin/Blogs/AddBlogs';
import Products from './pages/Products';
import AdminDashboard from './admin/AdminDashboard';
import AdminBlogs from './admin/Blogs/AdminBlogs';
import AdminCountDown from './admin/CountDown/AdminCountDown';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Success from './pages/Success';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update" element={<UpdateProfile />} />
        <Route path='/products' element={<Products/>}/>
        <Route path="/blogs" element={<Blog />} />
        <Route path='/about' element={<About/>}/>
                <Route path='/contact' element={<Contact/>}/>

        <Route path="/product/:id" element={<ProductDetail />} />

        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/admin/add-product" element={<AddProduct/>} />
        <Route path='/admin/products' element={<AdminProducts/>}/>

        {/**Admin Blogs */}
        <Route path="/admin/add-blog" element={<AddBlogs />} />
        <Route path="/admin/blogs" element={<AdminBlogs/>} />

        {/**Admin CountDown */}
        <Route path="/admin/add-countdown" element={<AdminCountDown/>} />

        <Route path="/cart" element={<Cart/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/success" element={<Success />} />
        
        
      </Routes>
    
      
    </Router>
  );
}

export default App;
