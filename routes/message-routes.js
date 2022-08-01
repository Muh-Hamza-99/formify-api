const express = require("express");
const router = express.Router({ mergeParams: true });

const { 
    getAllMessages,
    getOneMessage,
    createMessage,
    deleteMessage,
} = require("../controllers/message-controllers");

const protect = require("../middleware/protect");

router.use(protect);

router
    .route("/")
    .get(getAllMessages)
    .post(createMessage);

router
    .route("/:orderID")
    .get(getOneMessage)
    .delete(deleteMessage);

module.exports = router;