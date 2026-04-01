const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    date: String
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;