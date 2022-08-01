const prisma = require("../database/prisma");

const AppError = require("../utilities/app-error");
const catchAsync = require("../utilities/catch-async");
const sendEmail = require("../utilities/send-email");
const createEndpoint = require("../utilities/create-endpoint");

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
    const endpoint = createEndpoint();
    const route = await prisma.route.create({ data: { endpoint, userID: req.user.id } });
    res.status(201).json({ status: "success", data: { route } });
});

const publicRoute = catchAsync(async (req, res, next) => {
    const { endpointID } = req.params;
    const route = await prisma.route.findUnique({ where: { endpoint: endpointID } });
    if (!route) return next(new AppError("No route with the provided endpoint ID", 404));
    const message = await prisma.message.create({ data: { wholeMessage: JSON.stringify(req.body), routeID: route.id } });
    const user = await prisma.user.findUnique({ where: { id: route.userID } });
    const options = { email: user.email, subject: "New Message", message: message.wholeMessage };
    try {
        await sendEmail(options);
        res.render("redirect", { endpointID: route.endpoint });
    } catch (error) {
        return next(new AppError("Error in sending email to the destination email!", 502));
    };
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