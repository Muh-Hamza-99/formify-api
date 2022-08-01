const getMe = (req, res, next) => {
    req.params.id = req.user.id;
};

module.exports = getMe;