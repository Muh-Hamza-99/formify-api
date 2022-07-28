const express = require("express");
const router = express.Router();

const { 
    getAllMessages,
    getOneMessage,
    createMessage,
    deleteMessage,
 } = require("../controllers/message-controllers");

router
    .route("/")
    .get(getAllMessages)
    .post(createMessage);

router
    .route("/:id")
    .get(getOneMessage)
    .delete(deleteMessage);

module.exports = router;