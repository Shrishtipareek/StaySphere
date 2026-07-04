require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const aiRouter = require("./routes/ai");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const port = 8080;

const MONGO_URL = "mongodb://127.0.0.1:27017/staysphere";

// =====================
// MongoDB Connection
// =====================
async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("✅ DB CONNECTED!");
  })
  .catch((err) => {
    console.log(err);
  });

// =====================
// View Engine
// =====================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// =====================
// Middlewares
// =====================
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser("signedCookie"));

// =====================
// Session
// =====================
const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// =====================
// Passport
// =====================
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =====================
// Global Variables
// =====================
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user || null;
  next();
});

// =====================
// Home Route
// =====================
app.get("/", (req, res) => {
  res.render("home");
});

// =====================
// Routes
// =====================
app.use("/ai", aiRouter);   
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// =====================
// 404
// =====================
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// =====================
// Error Handler
// =====================
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;

  res.status(statusCode).render("error.ejs", {
    err,
  });
});

// =====================
// Server
// =====================
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});