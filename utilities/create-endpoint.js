const crypto = require("crypto");

const createEndpoint = () => {
    return crypto.randomBytes(20).toString("hex");
};

module.exports = createEndpoint;