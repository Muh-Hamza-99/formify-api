const express = require("express");
const router = express.Router();

const {
    register,
    login,
} = require("../controllers/auth-controllers");

const { 
    getAllRoutes,
    getOneRoute,
    createRoute,
    deleteRoute,
 } = require("../controllers/route-controllers");

router.post("/register", register);
router.post("/login", login);

router
    .route("/")
    .get(getAllRoutes)
    .post(createRoute);

router
    .route("/:id")
    .get(getOneRoute)
    .delete(deleteRoute);

module.exports = router;