const AppError = require("../utilities/app-error");
const catchAsync = require("../utilities/catch-async");

const isRouteOwner = catchAsync(async (req, res, next) => {
    for (let route of req.user.routes) if (route.id === Number(req.params.id)) return next();
    return next(new AppError("You are not the owner of this route.", 403));
});

module.exports = isRouteOwner;