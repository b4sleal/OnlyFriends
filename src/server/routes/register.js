const bcrypt = require('bcryptjs');

const { doc, getDoc, setDoc } = require('firebase/firestore');
const { db } = require('../firebase');
const { createToken } = require('../auth/jwt');

module.exports = (app) => {
    // Handle registers
    app.post('/api/auth/register', async (req, res) => {
        const { code, ...userInfo } = req.body;
        const verify = app.emails[userInfo.email];

        if (!verify) {
            return res.send({ error: 'no code' });
        }

        if (verify.time < Date.now()) {
            return res.send({ error: 'no code' });
        }

        if (verify.code !== Number(code)) {
            return res.send({ error: 'wrong code' });
        }

        const token = createToken(userInfo, '20s');
        const initDoc = doc(db, 'Users', userInfo.email);
        const document = await getDoc(initDoc);

        // Check if an account exists with that email
        if (document.exists()) {
            return res.send({ error: 'exists' });
        }

        const salt = bcrypt.genSaltSync(); // For 

        // Save their registered info
        setDoc(initDoc, {
            ...userInfo,
            password: bcrypt.hashSync(userInfo.password, salt) // encrypt password
        });

        res.send({ email: userInfo.email, token });
    });
};