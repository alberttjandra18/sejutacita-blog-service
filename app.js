require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000;

const userRouter = require("./src/routes/user.route");
const blogRouter = require("./src/routes/blog.route");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// use db
require("./src/db/db");

app.use((req, res, next) => {
  console.log(`${new Date()} => ${req.originalUrl}`, req.body);
  next();
});

//for Routes
app.use([userRouter, blogRouter]);

app.get("/", (req, res) => {
  res.json({ message: "Home" });
});

app.use((req, res, next) => {
  res.status(404).send("Lost?");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
