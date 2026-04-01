const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const profileImage = req.file ? req.file.filename : "default-profile.png";

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profileImage
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(201).json({
            message: "User registered successfully!",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profileImage: newUser.profileImage
            },
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userId = req.user.id; // From auth middleware (not yet created)

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (username) user.username = username;
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10);

        await user.save();

        res.status(200).json({ message: "Profile updated successfully!", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginUser =async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        console.log("JWT SECRET 👉", process.env.JWT_SECRET);
        res.status(200).json({ message: "User logged in successfully!", user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
