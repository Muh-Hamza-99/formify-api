const express = require("express");
const router = express.Router();

const { 
    getAllRoutes,
    getOneRoute,
    createRoute,
    deleteRoute,
} = require("../controllers/route-controllers");

const messageRouter = require("./message-routes");

const protect = require("../middleware/protect");

router.use("/:routeID/messages", messageRouter);

router.use(protect);

router
    .route("/")
    .get(getAllRoutes)
    .post(createRoute);

router
    .route("/:id")
    .get(getOneRoute)
    .delete(deleteRoute);

module.exports = router;