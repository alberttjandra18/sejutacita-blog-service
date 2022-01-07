const express = require("express");
const blog = require("../controllers/blog.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/blog/add", auth, blog.addBlog);
router.put("/blog/update/:id", auth, blog.updateBlog);
router.get("/blog/get/:id", auth, blog.getBlog);
router.get("/blog/getAll", auth, blog.getBlog);
router.delete("/blog/delete", auth, blog.deleteBlog);

module.exports = router;
