const { authToken } = require('../auth/jwt');

module.exports = (app) => {
    // Verify if the user is logged in
    app.post('/api/auth/loginsession', authToken, async (req, res) => {
        res.send({ message: 'loggedin' });
    });
};