const register = require('./register');
const login = require('./login');
const loginSession = require('./loginSession');
const verifyEmail = require('./verifyEmail');
const getUser = require('./getUser');
const getUsers = require('./getUsers');
const getMessages = require('./getMessages');
const profilepic = require('./profilepic');
const fetchAllUsers = require('./fetchAllUsers');
const spotify = require('./spotify');
const editUser = require('./editUser');
const unmatchUser = require('./unmatchUser');

module.exports.init = (app) => {
    register(app);
    login(app);
    loginSession(app);
    verifyEmail(app);
    getUser(app);
    getUsers(app);
    getMessages(app);
    profilepic(app);
    fetchAllUsers(app);
    editUser(app);
    spotify(app);
    unmatchUser(app);
};