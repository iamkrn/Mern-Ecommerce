import { Link } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>

            <Link to="/admin/add-product">
                <button className=" cursor-pointer  bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors mb-4 w-64">Add Product</button>
            </Link>

            <Link to="/admin/add-countdown">
                <button className=" cursor-pointer  bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors mb-4 w-64">Add CountDown</button>
            </Link>



            


            <Link to="/admin/add-blog">
                <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors mb-4 w-64">Add Blog</button>
            </Link>

            <br /><br />
            <div className="flex gap-4">

            <Link to="/admin/products">
                <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors mb-4 w-64">View Products</button>
            </Link>

            <Link to="/admin/blogs">
                <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors mb-4 w-64">View Blogs</button>
            </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;