const User = require("../models/User");

exports.getJoinPage = (req, res, next) => {
  res.render("join", {
    errors: null,
    authenticated: true,
    path: "/join",
    pageTitle: "Join Club",
    isMember: req.user.member,
  });
};

exports.postJoinPage = (req, res, next) => {
  if (req.body.passphrase === "uwuilikethis") {
    User.findOneAndUpdate(
      { _id: req.user._id },
      { member: true },
      (err, result) => {
        if (err) return next(err);
        return res.render("join", {
          errors: null,
          authenticated: true,
          path: "/join",
          pageTitle: "Join Club",
          isMember: true,
        });
      }
    );
  } else {
    return res.render("join", {
      errors: [{ msg: "Seems like that's an incorrect passpharse" }],
      authenticated: true,
      path: "/join",
      pageTitle: "Join Club",
      isMember: req.user.member,
    });
  }
};
