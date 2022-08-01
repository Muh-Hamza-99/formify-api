const prisma = require("../database/prisma");

const AppError = require("../utilities/app-error");
const catchAsync = require("../utilities/catch-async");

const getAllMessages = catchAsync(async (req, res, next) => {
    const { routeID } = req.params;
    const messages = await prisma.message.findMany({ where: { routeID: Number(routeID) } });
    res.status(200).json({ status: "success", results: messages.length, data: { messages }});
});

const getOneMessage = catchAsync(async (req, res, next) => {
    const { messageID } = req.params;
    const message = await prisma.message.findUnique({ where: { id: Number(messageID) } });
    if (!message) return next(new AppError("No message with the provided ID!", 404));
    res.status(200).json({ status: "success", data: { message }});
});

const deleteMessage = catchAsync(async (req, res, next) => {
    const { messageID } = req.params;
    const message = await prisma.message.delete({ where: { id: Number(messageID) } }); 
    if (!message) return next(new AppError("No message with the provided ID!", 404));
    res.status(204).json({ status: "success", data: null });
});

module.exports = {
    getAllMessages,
    getOneMessage,
    deleteMessage,
};