const express = require("express");
const router = express.Router({ mergeParams: true });

const { 
    getAllMessages,
    getOneMessage,
    deleteMessage,
} = require("../controllers/message-controllers");

const protect = require("../middleware/protect");

router.use(protect);

router
    .route("/")
    .get(getAllMessages)

router
    .route("/:messageID")
    .get(getOneMessage)
    .delete(deleteMessage);

module.exports = router;