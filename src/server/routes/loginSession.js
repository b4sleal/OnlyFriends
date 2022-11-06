const { verifyToken } = require('../auth/jwt');

module.exports = (app) => {
    app.get('/api/auth/loginsession', async (req, res) => {
        const { token } = req.query;

        if (!token) return res.send({ message: 'no token' });

        const loggedin = await verifyToken(token); //basically checks if the token is expired

        if (!loggedin) {
            res.send({ message: 'token expired' });
        } else {
            res.send({ message: 'loggedin' });
        }
    });
};