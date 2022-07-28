const prisma = require("../database/prisma");

const AppError = require("../utilities/app-error");
const catchAsync = require("../utilities/catch-async");

const register = catchAsync(async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = await prisma.user.create({ username, email, password });
    res.status(201);
}); 

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new AppError("Please provide an email and password!", 400));
    const user = await prisma.user.findUnique({ where: { email} });
    if (!user) return next(new AppError("Incorrect email/password!", 401));
    res.status(200);
});