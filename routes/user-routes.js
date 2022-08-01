const express = require("express");
const router = express.Router();

const {
    register,
    login,
} = require("../controllers/auth-controllers");

const { 
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    deleteMe,
} = require("../controllers/user-controllers");

const protect = require("../middleware/protect");
const getMe = require("../middleware/get-me");

router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, getMe, getOneUser);
router.patch("/deleteMe", protect, deleteMe);

router.use(protect);

router
    .route("/")
    .get(getAllUsers)
    .post(createUser);

router
    .route("/:id")
    .get(getOneUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;