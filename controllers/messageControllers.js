const Message = require("../models/Message");

exports.showMessages = (req, res, next) => {
  Message.find({})
    .populate("author")
    .exec((err, results) => {
      if (err) {
        return next(err);
      }
      res.render("index", {
        result: results,
        pageTitle: "MembersOnly",
        path: "/",
        authenticated: req.isAuthenticated(),
        isMember: req.user ? req.user.member : null,
        admin: req.user ? req.user.admin : null,
      });
    });
};

exports.getAddMessage = (req, res, next) => {
  res.render("add-message", {
    pageTitle: "Add Message",
    path: "/add-message",
    authenticated: true,
    isMember: req.user ? req.user.member : null,
    errors: null,
  });
};

exports.postAddMessage = (req, res, next) => {
  const message = new Message({
    title: req.body.title,
    message: req.body.message,
    author: req.user,
  });
  message.save((err) => {
    if (err) return next(err);
    return res.redirect("/");
  });
};

exports.postDeleteMessage = (req, res, next) => {
  Message.deleteOne({ _id: req.body.delete_id }, (err) => {
    if (err) return next(err);
    return res.redirect("/");
  });
};
