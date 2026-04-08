import { Link } from "react-router-dom";
import { Home, ShoppingCart, FileText, Plus, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, ResponsiveContainer
} from "recharts";
import axios from "axios";

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [userGraph, setUserGraph] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchUser();
    fetchSales();
    fetchProducts();
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
  const res = await axios.get("http://localhost:5000/api/admin/stats/dashboard");
  setDashboard(res.data);
};

  // USERS
  const fetchUser = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/stats/users");

    setTotalUsers(res.data.totalUsers);

    // ✅ FIX FORMAT
    const formatted = res.data.monthlyGrowth.map(item => ({
      month: item.month,
      users: item.users
    }));

    setUserGraph(formatted);
  };

  // SALES
  const fetchSales = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/stats/sales");

      console.log("SALES DATA", res.data);
      

      setSalesData(res.data || []);

      // ✅ TOTAL REVENUE CALCULATE
      const revenue = res.data.reduce((acc, curr) => acc + (curr.totalRevenue || 0), 0);
      setTotalRevenue(revenue);

    } catch (err) {
      console.log(err);
    }
  };

  // PRODUCTS
  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/stats/products");
    setTotalProducts(res.data.totalProducts);
  };
  const formatMonth = (m) => {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return months[m - 1];
};

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Admin</h1>

        <nav className="flex flex-col gap-4">
          <Link to="/admin" className="hover:bg-gray-800 p-2 rounded flex items-center gap-2">
            <Home size={18}/> Dashboard
          </Link>
          <Link to="/admin/products" className="hover:bg-gray-800 p-2 rounded flex items-center gap-2">
            <ShoppingCart size={18}/> Products
          </Link>
          <Link to="/admin/blogs" className="hover:bg-gray-800 p-2 rounded flex items-center gap-2">
            <FileText size={18}/> Blogs
          </Link>
          <Link to="/admin/add-product" className="hover:bg-gray-800 p-2 rounded flex items-center gap-2">
            <Plus size={18}/> Add Product
          </Link>
          <Link to="/admin/add-blog" className="hover:bg-gray-800 p-2 rounded flex items-center gap-2">
            <Plus size={18}/> Add Blog
          </Link>
          <Link to="/admin/add-countdown" className="hover:bg-gray-800 p-2 rounded flex items-center gap-2">
            <Clock size={18}/> Countdown
          </Link>
        </nav>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

        {/* 🔥 CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

  <div className="bg-white p-5 rounded-xl shadow">
    <h3>Total Users</h3>
    <p className="text-3xl font-bold">{dashboard?.totalUsers}</p>
  </div>

  <div className="bg-white p-5 rounded-xl shadow">
    <h3>Total Products</h3>
    <p className="text-3xl font-bold">{dashboard?.totalProducts}</p>
  </div>

  <div className="bg-white p-5 rounded-xl shadow">
    <h3>Total Orders</h3>
    <p className="text-3xl font-bold">{dashboard?.totalOrders}</p>
  </div>

  <div className="bg-white p-5 rounded-xl shadow">
    <h3>Revenue</h3>
    <p className="text-3xl font-bold">₹ {dashboard?.totalRevenue}</p>
  </div>

</div>
        {/* USER GRAPH */}
        <div className="bg-white p-5 rounded-xl shadow mb-8">
          <h3 className="mb-4 font-semibold">User Growth</h3>

          <div className="w-full h-[300px]">
            <ResponsiveContainer>
              <LineChart data={userGraph}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="month"/>
                <YAxis/>
                <Tooltip/>
                <Line type="monotone" dataKey="users" stroke="#3b82f6"/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SALES GRAPH */}
        <div className="bg-white p-5 rounded-xl shadow">
  <h3 className="mb-4 font-semibold">Sales & Revenue</h3>

  <div className="w-full h-[300px]">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={salesData}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="month" tickFormatter={formatMonth}/>
        <YAxis/>
        <Tooltip/>
        <Bar dataKey="totalSales" fill="#3b82f6"/>
        <Bar dataKey="totalRevenue" fill="#22c55e"/>
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>
      </div>
     <div className="bg-white p-6 rounded-xl shadow mb-8">
  <h3 className="mb-4 font-semibold text-lg">Latest Orders</h3>

  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">

      <thead>
        <tr className="bg-gray-100 text-sm uppercase text-gray-600">
          <th className="p-3">User</th>
          <th className="p-3">Amount</th>
          <th className="p-3">Status</th>
        </tr>
      </thead>

      <tbody>
        {dashboard?.latestOrders?.length > 0 ? (
          dashboard.latestOrders.map((order) => (
            <tr key={order._id} className="border-b hover:bg-gray-50 transition">

              {/* USER */}
              <td className="p-3 font-medium">
    <td>{order.user?.name || order.user?.email || "Guest"}</td>
              </td>

              {/* PRICE */}
              <td className="p-3">
                ₹ {order.totalPrice}
              </td>

              {/* STATUS */}
              <td className="p-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${order.status === "pending" && "bg-yellow-100 text-yellow-700"}
                  ${order.status === "paid" && "bg-green-100 text-green-700"}
                  ${order.status === "shipped" && "bg-blue-100 text-blue-700"}
                  ${order.status === "delivered" && "bg-purple-100 text-purple-700"}
                `}>
                  {order.status}
                </span>
              </td>

            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="text-center p-4 text-gray-400">
              No Orders Yet
            </td>
          </tr>
        )}
      </tbody>

    </table>
  </div>
</div></div>
    
  );
};

export default AdminDashboard;