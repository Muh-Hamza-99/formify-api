const express = require("express");
const app = express();

const AppError = require("./utilities/app-error");
const globalErrorHandler = require("./middleware/error-handler");

// Router Imports
const messageRouter = require("./routes/message-routes.js");
const routeRouter = require("./routes/route-routes.js");
const userRouter = require("./routes/user-routes.js");

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

// Router Middleware
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/routes", routeRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
    res.status(404).json({ status: "fail", message: `Can't find ${req.originalUrl} on this server!` });
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;