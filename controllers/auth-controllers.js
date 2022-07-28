const prisma = require("../database/prisma");

const AppError = require("../utilities/app-error");
const catchAsync = require("../utilities/catch-async");

const register = catchAsync(async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = await prisma.user.create({ username, email, password });
    res.status(201);
}); 