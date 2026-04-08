import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Cart() {
  const [cart, setCart] = useState([]);

  const token = localStorage.getItem("token");

  // 🔥 FETCH CART
  const fetchCart = async () => {
    try {
      if (!token) {
        toast.error("Login first");
        return;
      }

      const res = await fetch("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setCart(data?.products || []);
    } catch (err) {
      console.log("FETCH ERROR", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ➕ INCREASE
  const increaseQty = async (id) => {
    const res = await fetch("http://localhost:5000/api/cart/increase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId: id }),
    });

    const data = await res.json();
    setCart(data.products);
  };

  // ➖ DECREASE
  const decreaseQty = async (id) => {
    const res = await fetch("http://localhost:5000/api/cart/decrease", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ FIX
      },
      body: JSON.stringify({ productId: id }),
    });

    const data = await res.json();
    setCart(data.products);
  };

  // ❌ REMOVE
  const removeItem = async (id) => {
    const res = await fetch("http://localhost:5000/api/cart/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ FIX
      },
      body: JSON.stringify({ productId: id }), // ❌ userId removed
    });

    const data = await res.json();
    setCart(data.products);
  };

  // 💰 TOTAL
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // 💳 CHECKOUT
  const handleCheckout = async () => {
    try {
          localStorage.setItem("pendingCart", JSON.stringify(cart));

      const res = await axios.post(
        "http://localhost:5000/api/payment/create-checkout-session",
        { products: cart }
      );

      window.location.href = res.data.url;
    } catch (error) {
      console.log("ERROR:", error.response?.data || error.message);
      toast.error("Payment failed");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h2 className="text-3xl font-bold mb-6">My Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <h3 className="text-xl">Your cart is empty 😔</h3>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.productId}
                className="bg-white p-4 rounded-xl shadow flex gap-4 items-center"
              >
                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500">₹{item.price}</p>

                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => decreaseQty(item.productId)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.productId)}>+</button>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="bg-white p-6 rounded-xl shadow h-fit">
            <h3 className="text-xl font-semibold mb-4">Price Details</h3>

            <div className="flex justify-between mb-2">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>

            <hr className="my-4" />

            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white py-3 rounded-lg"
            >
              Proceed to Checkout
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default Cart;