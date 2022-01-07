const userModel = require("../models/user.model");

exports.register = async (req, res) => {
  const user = new userModel(req.body);
  console.log("presave");
  await user.save(async function (err) {
    if (err) {
      if (err.code === 11000) {
        // Duplicate email
        return res
          .status(422)
          .send({ succes: false, message: "Email already exist!" });
      }
      // Some other error
      return res.status(422).send(err);
    }
    const token = await user.generateAuthToken();
    console.log(token);
    console.log(user);
    res.status(200).send({ user, token });
  });
};

exports.login = async (req, res) => {
  // Login a registered user
  try {
    const { email, password } = req.body;
    const user = await userModel.findByCredentials(email, password);
    if (!user) {
      throw new Error("Login failed! Check your credentials");
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(401).send(error);
  }
};

exports.getUserProfile = async (req, res) => {
  // Get user profile
  res.send(req.user);
};

exports.logout = async (req, res) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.status(200).send("logout successfully");
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.logoutAll = async (req, res) => {
  // Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.status(200).send("logout all device successfully");
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.userEdit = async (req, res) => {
  if (!req.body) res.status(400).send("Missing request body");
  Object.keys(req.body).forEach(function (data) {
    req.user[data] = req.body[data];
  });

  req.user.save(function (error) {
    if (err) return res.status(500).send(error);
    res.status(200).send(user);
  });
};
