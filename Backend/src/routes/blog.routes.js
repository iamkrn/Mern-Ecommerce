const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog.controller");
const upload = require("../middlewares/multer.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", upload.single("image"), blogController.createBlog);
router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.put("/:id", authMiddleware, upload.single("image"), blogController.updateBlog);
router.delete("/:id", authMiddleware, blogController.deleteBlog);

module.exports = router;