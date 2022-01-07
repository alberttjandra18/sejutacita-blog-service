const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { type: String, default: "" },
  content: { type: String, default: "" },
});

const blog = mongoose.model("Blog", blogSchema);

module.exports = blog;
