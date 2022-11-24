const bcrypt = require('bcryptjs');

const { doc, getDoc, setDoc } = require('firebase/firestore');
const { db } = require('./database/firebase');

module.exports = (app) => {
    // Handle registers
    app.post('/api/auth/quickregister', async (req, res) => {
        const users = req.body;

        users.forEach(async s => {
            const { email, ...userInfo } = s;

            const initDoc = doc(db, 'Users', email);
            const document = await getDoc(initDoc);

            // Check if an account exists with that email
            if (document.exists()) {
                return res.send({ error: 'account exists' });
            }

            const salt = bcrypt.genSaltSync(); // Generate string to randomize password

            // Save their registered info
            setDoc(initDoc, {
                ...userInfo,
                password: bcrypt.hashSync(userInfo.password, salt) // encrypt password
            });
        });

        res.send({ message: 'Done' });
    });
};