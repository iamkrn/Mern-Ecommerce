const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    profileImage: {
        type: String,
        default: "default-profile.png"
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
