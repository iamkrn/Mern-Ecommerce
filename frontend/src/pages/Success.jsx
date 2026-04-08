import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Success() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [orderCreated, setOrderCreated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createOrder();
  }, []);

  const createOrder = async () => {
    try {
      const cart = JSON.parse(localStorage.getItem("pendingCart") || "[]");

      if (cart.length === 0) {
        setLoading(false);
        setOrderCreated(true);
        redirectHome();
        return;
      }

      const totalPrice = cart.reduce(
        (acc, item) => acc + item.price * item.quantity, 0
      );

      // ✅ Order create karo
      await axios.post(
        "http://localhost:5000/api/orders/create-after-payment",
        { products: cart, totalPrice },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ Backend cart clear karo
      await axios.delete("http://localhost:5000/api/cart/clear", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ localStorage cart clear karo
      localStorage.removeItem("pendingCart");

      setOrderCreated(true);
      setLoading(false);
      redirectHome();

    } catch (err) {
      console.log("Order create error:", err);
      setLoading(false);
      redirectHome();
    }
  };

  // 5 sec baad home
  const redirectHome = () => {
    setTimeout(() => navigate("/"), 5000);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-10 rounded-xl shadow text-center">

        {loading ? (
          // ⏳ Order ban raha hai
          <>
            <div className="flex justify-center mb-4">
              <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"/>
            </div>
            <h1 className="text-2xl font-bold text-gray-700">
              Order place ho raha hai...
            </h1>
            <p className="mt-2 text-gray-400 text-sm">
              Please wait, mat jana abhi 🙏
            </p>
          </>
        ) : (
          // ✅ Order ban gaya
          <>
            <h1 className="text-4xl mb-2">🎉</h1>
            <h1 className="text-3xl font-bold text-green-600">
              Payment Successful!
            </h1>
            <p className="mt-4 text-gray-600">
              Aapka order place ho gaya hai ✅
            </p>
            <p className="mt-2 text-sm text-gray-400">
              5 seconds mein home pe redirect ho jaoge...
            </p>

            {/* Manual buttons */}
            <div className="flex gap-3 justify-center mt-6">
              <button
                onClick={() => navigate("/")}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Home Jao
              </button>
              <button
                onClick={() => navigate("/orders")}
                className="border border-green-600 text-green-600 px-5 py-2 rounded-lg hover:bg-green-50 transition"
              >
                My Orders
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Success;