const Blog = require("../models/blog.model");

exports.createBlog = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const image = req.file.filename;
        const blog = new Blog({ title, description, image, date });
        await blog.save();
        res.status(201).json({ message: "Blog created!", blog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const updates = req.body;
        if (req.file) {
            updates.image = req.file.filename;
        }
        const blog = await Blog.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Blog updated!", blog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Blog deleted!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};