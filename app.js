const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");


const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");

const app = express();


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

// catch 404 and forward to error
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  
  res.status(err.status || 500);
  res.render("error");
});

app.listen("3001", () => {
  console.log("API is working on localhost:3001");
});

module.exports = app;
