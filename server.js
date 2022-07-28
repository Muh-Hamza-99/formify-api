require("dotenv").config({ path: "./.env" });

const mongoose = require("mongoose");
const app = require("./app");

process.on("uncaughtException", err => {
    console.log(`Uncaught Exception! ${err.name}, ${err.message}.`);
    process.exit(1);
});

const PORT = process.env.PORT || 8080;


const server = app.listen(PORT, () => console.log(`Server is up on port ${PORT}...`));

process.on("unhandledRejection", err => {
    console.log(`Unhandled Rejection! ${err.name}, ${err.message}.`);
    server.close(() => process.exit(1));
});