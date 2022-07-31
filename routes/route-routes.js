const express = require("express");
const router = express.Router();

const { 
    getAllRoutes,
    getOneRoute,
    createRoute,
    publicRoute,
    deleteRoute,
 } = require("../controllers/route-controllers");

const protect = require("../middleware/protect");

router.post("/:endpointID", publicRoute);

router
    .route("/")
    .get(getAllRoutes)
    .post(protect, createRoute);

router
    .route("/:id")
    .get(getOneRoute)
    .delete(deleteRoute);

module.exports = router;