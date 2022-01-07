const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    default: "",
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email is used"],
    lowercase: true,
    validate: (value) => {
      // add validation from validator, read more here https://www.npmjs.com/package/validator
      if (!validator.isEmail(value))
        throw new Error({ error: "Invalid Email address" });
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Minimun code length 8 characters"],
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
        validate: (value) => {
          if (validator.isEmpty(value))
            throw new Error({ error: "token is empty" });
        },
      },
    },
  ],
});

userSchema.pre("save", async function (req, res, next) {
  console.log("saving");
  // Hash the password before saving the user model
  const user = this;
  user.validate(async function (err) {
    if (err) handleError(err);
    if (user.isModified("password")) {
      console.log("password modified");
      user.password = await bcrypt.hash(user.password, 8);
    }
    console.log("going to next");
    next();
  });
});

userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await user.findOne({ email });
  if (!user) {
    throw new Error({ error: "Invalid login credentials" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "Invalid login credentials" });
  }
  return user;
};

const user = mongoose.model("User", userSchema);

module.exports = user;
