const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signupControllers");
const loginController = require("../controllers/loginControllers");
const messageController = require("../controllers/messageControllers");
const clubController = require("../controllers/clubControllers");

router.get("/", messageController.showMessages);
router.get("/signup", signupController.signup_get);
router.post("/signup", signupController.signup_post);
router.get("/login", loginController.login_get);
router.post("/login", loginController.login_post);
router.get("/logout", loginController.logout);
router.get("/join", loginController.isLoggedIn, clubController.getJoinPage);
router.post("/join", loginController.isLoggedIn, clubController.postJoinPage);
router.get(
  "/add-message",
  loginController.isLoggedIn,
  messageController.getAddMessage
);
router.post(
  "/add-message",
  loginController.isLoggedIn,
  messageController.postAddMessage
);
router.post(
  "/delete",
  loginController.isLoggedIn,
  messageController.postDeleteMessage
);

module.exports = router;
