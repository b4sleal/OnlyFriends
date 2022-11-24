
// Our stuff
const { doc, getDoc } = require('firebase/firestore'); //database stuff
const { db } = require('../database/firebase');// more database stuff

module.exports = (app) => {
    app.get('/api/auth/getuser', async (req, res) => {
        const data = req.query;

        if (!data.email) {
            return res.send({ error: 'no email' });
        }

        const document = await getDoc(doc(db, 'Users', data.email));

        if (document.exists()) {
            return res.send({ ...document.data(), profilepic: '', password: '', email: data.email });
        }

        res.send({ message: 'error' });
    });
};