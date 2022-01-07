const mongoose = require("mongoose");

module.exports = (async () => {
  await mongoose.connect(process.env.MONGODB_URL);

  mongoose.connection.once("connected", () => console.log("DB Connected"));
})();
