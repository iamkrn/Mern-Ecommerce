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
    isGoogleUser: {
  type: Boolean,
  default: false
},
   password: {
  type: String,
  required: function () {
    return !this.isGoogleUser;
  }
}, profileImage: {
        type: String,
        default: "default-profile.png"
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
