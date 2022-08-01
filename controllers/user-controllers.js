const prisma = require("../database/prisma");

const AppError = require("../utilities/app-error");
const catchAsync = require("../utilities/catch-async");

const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await prisma.user.findMany({});
    res.status(200).json({ status: "success", results: users.length, data: { users }});
});

const getOneUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id: Number(id) }, include: { routes: true } });
    if (!user) return next(new AppError("No user with the provided ID!", 404));
    res.status(200).json({ status: "success", data: { user }});
});

const createUser = catchAsync(async (req, res, next) => {
    const user = await prisma.user.create({ data: req.body });
    res.status(201).json({ status: "success", data: { user } });
});

const updateUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await prisma.user.update({ where: { id: Number(id) } , data: req.body, include: { routes: true } });
    if (!user) return next(new AppError("No user with the provided ID!", 404));
    res.status(200).json({ status: "success", data: { user } });
});

const deleteUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await prisma.user.delete({ where: { id: Number(id) } });
    if (!user) return next(new AppError("No user with the provided ID!", 404));
    res.status(204).json({ status: "success", data: null });
});

const deleteMe = catchAsync(async (req, res, next) => {
    const user = await prisma.user.update({ where: { id: Number(req.user.id) }, data: { active: false } });
    if (!user) return next(new AppError("No user with the provided ID!", 404));
    res.status(204).json({ status: "success", data: null });
});

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    deleteMe,
};