import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000); // 5 sec baad home
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-10 rounded-xl shadow text-center">
        <h1 className="text-3xl font-bold text-green-600">
          ✅ Payment Successful
        </h1>
        <p className="mt-4 text-gray-600">
          Thank you for your purchase 🎉
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Redirecting to home...
        </p>
      </div>
    </div>
  );
}

export default Success;