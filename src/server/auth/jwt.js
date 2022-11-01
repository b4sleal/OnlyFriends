const jwt = require('jsonwebtoken');

module.exports.authToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.send({ message: 'no token' });

    const loggedin = await this.verifyToken(token);

    if (!loggedin) {
        res.send({ message: 'token expired' });
    } else {
        next();
    }
};

module.exports.createToken = (data, expiresIn) => {
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn });
};

module.exports.verifyToken = (token) => {
    return new Promise((resolve) => {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
};
