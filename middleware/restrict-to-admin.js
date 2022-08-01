const correctPassword = require("../utilities/correct-password");

const AppError = require("../utilities/app-error");
const catchAsync = require("../utilities/catch-async");

const restrictToAdmin = catchAsync(async (req, res, next) => {
    if (req.user.username === process.env.ADMIN_USERNAME && await correctPassword(process.env.ADMIN_PASSWORD, req.user.password)) next();
    return next(new AppError("You do no sufficient permissions in order to be allowed to access this route!", 403));
});

module.exports = restrictToAdmin;