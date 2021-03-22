const passport = require("passport");

const { body, validationResult } = require("express-validator");

exports.login_get = function (req, res, next) {
  const errorMessage = req.flash("error");
  let error = null;
  if (errorMessage.length > 0) {
    error = [{ msg: errorMessage[0] }];
  }
  res.render("login", {
    data: {
      email: "",
    },
    pageTitle: "Login",
    path: "/login",
    errors: error,
    authenticated: req.isAuthenticated(),
    isMember: null,
  });
};

exports.login_post = [
  body("email").trim().isEmail().withMessage("Invalid Email Format").escape(),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Wrong Password Length"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("login", {
        data: {
          email: req.body.email,
        },
        errors: errors.array(),
        pageTitle: "Login",
        path: "/login",
        authenticated: req.isAuthenticated(),
        isMember: null,
      });
    }
    next();
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: "Invalid Email or Password",
  }),
];

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect("/");
  }
};

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};
