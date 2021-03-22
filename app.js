var createError = require("http-errors");
var express = require("express");
var path = require("path");
// var logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const flash = require("connect-flash");
require("dotenv").config();
const route = require("./routes/route");

// DB Connection
mongoose.connect("mongodb+srv://rahul:rahul@rb.icbpz.mongodb.net/authentication?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "DB Connection Error."));

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(logger("dev"));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Setting up the session
app.use(
  session({
    secret: "mynameisvinodbahadurthapayoutuber",
    store: new MongoStore({ mongooseConnection: db, collection: "sessions" }),
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //1day
    },
  })
);

require("./controllers/passportController");

// Setting up passport js middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/", route);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", {
    pageTitle: "Error",
    path: "",
    authenticated: req.isAuthenticated(),
    isMember: req.user ? req.user.isMember : null,
  });
});

module.exports = app;
