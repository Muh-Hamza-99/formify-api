const express = require("express");
const router = express.Router({ mergeParams: true });

const { 
    getAllMessages,
    getOneMessage,
    deleteMessage,
} = require("../controllers/message-controllers");

const protect = require("../middleware/protect");
const isRouteOwner = require("../middleware/is-route-owner");

router.use(protect, isRouteOwner);

router
    .route("/")
    .get(getAllMessages)

router
    .route("/:messageID")
    .get(getOneMessage)
    .delete(deleteMessage);

module.exports = router;