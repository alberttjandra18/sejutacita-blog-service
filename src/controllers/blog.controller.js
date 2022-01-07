const blogModel = require("../models/blog.model");

exports.addBlog = async (req, res) => {
  try {
    const blog = new blogModel(req.body);
    await blog.save();
    res.status(200).send({ blog });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog_id = req.params.id;
    let blog = null;
    if (blog_id) {
      blog = await blogModel.findOne({ _id: blog_id });
    } else {
      blog = await blogModel.find();
    }
    res.status(200).send(blog);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateBlog = async (req, res) => {
  if (!req.body) res.status(400).send("Missing request body");
  const blog = new blogModel(req.body);
  if (!req.params.id) {
    res.status(400).send(error);
  }
  try {
    const data = await blogModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteBlog = async (req, res) => {
  if (!req.params) res.status(400).send("Missing request params");
  try {
    const result = await blogModel.deleteOne({ _id: req.params.id });
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};
