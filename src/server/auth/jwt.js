const jwt = require('jsonwebtoken');

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
