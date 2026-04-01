const CountDown = require("../models/countDown.model");

exports.setCountDown = async (req, res) => {
  try {
    const { endTime } = req.body;

    if (!endTime) {
      return res.status(400).json({ message: "End time is required" });
    }

    await CountDown.deleteMany();

    const countDown = new CountDown({
      endTime: new Date(endTime),
    });

    await countDown.save();

    res.status(201).json({
      success: true,
      message: "CountDown created!",
      endTime: countDown.endTime,
    });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getCountDown = async (req, res) => {
  try {
    const countDown = await CountDown.findOne();

    res.status(200).json({
      success: true,
      endTime: countDown ? countDown.endTime : null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};