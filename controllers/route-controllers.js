const prisma = require("../database/prisma");

const AppError = require("../utilities/app-error");
const catchAsync = require("../utilities/catch-async");

const getAllRoutes = catchAsync(async (req, res, next) => {
    const routes = await prisma.route.findMany({});
    res.status(200).json({ status: "success", results: routes.length, data: { routes }});
});

const getOneRoute = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const route = await prisma.route.findUnique({ where: { id: Number(id) }, include: { messages: true } });
    if (!route) return next(new AppError("No route with the provided ID!", 404));
    res.status(200).json({ status: "success", data: { route }});
});

const createRoute = catchAsync(async (req, res, next) => {
    const route = await prisma.route.create({ data: req.body });
    res.status(201).json({ status: "success", data: { route } });
});

const publicRoute = catchAsync(async (req, res, next) => {
    const { endpointID } = req.params;
    const route = await prisma.route.findUnique({ where: { endpoint: endpointID } });
    res.status(200);
});

const deleteRoute = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const route = await prisma.route.delete({ where: { id: Number(id) } }); 
    if (!route) return next(new AppError("No route with the provided ID!", 404));
    res.status(204).json({ status: "success", data: null });
});

module.exports = {
    getAllRoutes,
    getOneRoute,
    createRoute,
    publicRoute,
    deleteRoute,
};