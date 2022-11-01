const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();

// Flash messages
const flash = require("connect-flash");
const session = require("express-session");

// MONGO
const mongoose = require("mongoose");
// MongoDB Config Key File
const db = require("./config/keys").MongoURI;
// Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// EJS Middleware
app.use(expressLayouts);
app.set("view engine", "ejs");

// BodyParser
app.use(express.urlencoded({ extended: false }));

// Express session middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport config
const passport = require("passport");
require("./config/passport")(passport);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server started at on port ${PORT}, http://localhost:5000/`)
);
