const JWT = require("jsonwebtoken");

const prisma = require("../database/prisma");

const AppError = require("../utilities/app-error");
const catchAsync = require("../utilities/catch-async");
const hashPassword = require("../utilities/hash-password");
const { registerSchema, loginSchema } = require("../utilities/joi-validation");

const signToken = id => JWT.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRES_IN });

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.id);
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
    };
    res.cookie("jwt", token, cookieOptions);
    user.password = undefined;
    res.status(statusCode).json({ status: "success", token });
};

const register = catchAsync(async (req, res, next) => {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return next(new AppError("Validation error!", 403));
    const { username, email, password } = value;
    const user = await prisma.user.create({ data: { username, email, password: (await hashPassword(password)) } });
    createSendToken(user, 201, res);
}); 

const login = catchAsync(async (req, res, next) => {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return next(new AppError("Validation error!", 403));
    const { email, password } = value;
    if (!email || !password) return next(new AppError("Please provide an email and password!", 400));
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return next(new AppError("Incorrect email/password!", 401));
    createSendToken(user, 200, res);
});

module.exports = {
    register,
    login,
};