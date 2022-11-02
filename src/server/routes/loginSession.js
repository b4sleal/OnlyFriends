const { verifyToken } = require('../auth/jwt');

module.exports = (app) => {
    app.post('/api/auth/loginsession', async (req, res) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) return res.send({ message: 'no token' });

        const loggedin = await verifyToken(token); //basically checks if the token is expired

        if (!loggedin) {
            res.send({ message: 'token expired' });
        } else {
            res.send({ message: 'loggedin' });
        }
    });
};