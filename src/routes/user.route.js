const express = require("express");
const user = require("../controllers/user.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/user/register", user.register);

router.post("/user/login", user.login);

// pass middleware auth to check this is route is only for logged in user
router.get("/user/profile", auth, user.getUserProfile);

router.put("/user/update", auth, user.userEdit);

router.post("/user/logout", auth, user.logout);

router.post("/user/logoutall", auth, user.logoutAll);

module.exports = router;
