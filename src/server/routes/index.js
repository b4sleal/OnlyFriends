const register = require('./register');
const login = require('./login');
const loginSession = require('./loginSession');
const verifyEmail = require('./verifyEmail');

module.exports.init = (app) => {
    register(app);
    login(app);
    loginSession(app);
    verifyEmail(app);
};