const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Route = prisma.route;

const AppError = require("../utilities/app-error");
const catchAsync = require("../utilities/catch-async");

const getAllRoutes = catchAsync(async (req, res, next) => {
    const routes = await Route.findMany({});
    res.status(200).json({ status: "success", results: routes.length, data: { routes }});
});

const getOneRoute = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const route = await Route.findUnique({ where: { id: Number(id) }, include: { messages: true } });
    if (!route) return next(new AppError("No route with the provided ID!", 404));
    res.status(200).json({ status: "success", data: { route }});
});

const createRoute = catchAsync(async (req, res, next) => {
    const route = await Route.create(req.body);
    res.status(201).json({ status: "success", data: { route } });
});

const deleteRoute = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const route = await Route.delete({ where: { id: Number(id) } }); 
    if (!route) return next(new AppError("No route with the provided ID!", 404));
    res.status(204).json({ status: "success", data: null });
});

module.exports = {
    getAllRoutes,
    getOneRoute,
    createRoute,
    deleteRoute,
};