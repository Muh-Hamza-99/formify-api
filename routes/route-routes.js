const express = require("express");
const router = express.Router();

const { 
    getAllRoutes,
    getOneRoute,
    createRoute,
    deleteRoute,
 } = require("../controllers/route-controllers");

router
    .route("/")
    .get(getAllRoutes)
    .post(createRoute);

router
    .route("/:id")
    .get(getOneRoute)
    .delete(deleteRoute);

module.exports = router;