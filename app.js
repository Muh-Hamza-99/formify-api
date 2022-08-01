const express = require("express");
const app = express();

const expressRateLimit = require("express-rate-limit");
const XSS = require("xss-clean");
const helmet = require("helmet");

const CORS = require("cors");

const AppError = require("./utilities/app-error");
const globalErrorHandler = require("./middleware/error-handler");

const { publicRoute } = require("./controllers/route-controllers");

// Router Imports
const messageRouter = require("./routes/message-routes.js");
const routeRouter = require("./routes/route-routes.js");
const userRouter = require("./routes/user-routes.js");

const limiter = expressRateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this device! Please try again after an hour!",
});

app.options("*", CORS());

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.use(XSS());
app.use(helmet());

app.use("/api", limiter);

// Router Middleware
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/routes", routeRouter);
app.use("/api/v1/users", userRouter);

app.post("/:endpointID", publicRoute)

app.all("*", (req, res, next) => {
    res.status(404).json({ status: "fail", message: `Can't find ${req.originalUrl} on this server!` });
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;