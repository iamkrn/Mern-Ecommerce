import { useEffect, useState } from "react";
import axios from "axios";

const CountDown = () => {
  const [timeLeft, setTimeLeft] = useState("");
  const [endTime, setEndTime] = useState(null);

  // fetch countdown from backend
  useEffect(() => {
    const fetchTime = async () => {
      const { data } = await axios.get("http://localhost:5000/api/get-countdown");
      setEndTime(data.endTime);
    };

    fetchTime();
  }, []);

  // timer logic
  useEffect(() => {
    if (!endTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = new Date(endTime) - now;

      if (diff <= 0) {
        setTimeLeft("SALE LIVE 🔥");
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white">
        Big Sale Up to 50% OFF
      </h1>

      {/* 🔥 COUNTDOWN HERE */}
      <p className="text-2xl text-red-400 mt-4 font-semibold">
        {timeLeft}
      </p>

      <p className="text-gray-400 mt-2">
        Don't miss out on these deals
      </p>

      <button className="mt-5 bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white">
        Shop Deals
      </button>
    </div>
  );
};

export default CountDown;