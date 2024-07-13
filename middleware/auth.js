const jwt = require('jsonwebtoken');

exports.check_token = async (req, res, next) => {
    const token = req.headers.authorization
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.userData = decoded;
    next();
}