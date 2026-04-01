const express  =require('express')
const {setCountDown,getCountDown} = require("../controllers/countDown.controller");

const router = express.Router();

router.post("/set-countdown", setCountDown);
router.get("/get-countdown", getCountDown);

module.exports = router;