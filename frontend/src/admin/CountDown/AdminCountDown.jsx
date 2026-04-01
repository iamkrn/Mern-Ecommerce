import { useState } from "react";
import axios from "axios";

const AdminCountDown = () => {
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    console.log("TIME:", time);

    if (!time) {
      alert("Please select date & time ❌");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/set-countdown", {
        endTime: new Date(time).toISOString(), // ✅ proper format
      });

      alert("Countdown Set Successfully ✅");
      setTime(""); // reset input
    } catch (error) {
      console.error("ERROR:", error.response?.data || error.message);
      alert("Error setting countdown ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-xl mb-4 font-bold">Set Live Sale</h1>

      <input
        type="datetime-local"
        value={time}
        onChange={(e) => {
          console.log("VALUE:", e.target.value);
          setTime(e.target.value);
        }}
        className="border p-2"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="ml-3 bg-black text-white px-4 py-2 disabled:bg-gray-400"
      >
        {loading ? "Setting..." : "Set"}
      </button>
    </div>
  );
};

export default AdminCountDown;