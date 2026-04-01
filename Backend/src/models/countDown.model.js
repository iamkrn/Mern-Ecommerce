const mongoose = require("mongoose");

const countDownSchema = new mongoose.Schema(
    {
    endTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CountDown", countDownSchema);
