const bcrypt = require('bcryptjs');

const { doc, getDoc, setDoc } = require('firebase/firestore');
const { db } = require('../database/firebase');
const { createToken } = require('../auth/jwt');

module.exports = (app) => {
    // Handle registers
    app.post('/api/auth/register', async (req, res) => {
        const { code, email, ...userInfo } = req.body;
        const verify = app.emails[email];

        if (!verify || verify.time < Date.now()) {
            return res.send({ error: 'no code' });
        } else if (verify.code !== Number(code)) {
            return res.send({ error: 'wrong code' });
        }

        const token = createToken(userInfo, '2m');
        const initDoc = doc(db, 'Users', email); //yup we also need their email so we takin these 3 things for now
        const document = await getDoc(initDoc);

        // Check if an account exists with that email
        if (document.exists()) {
            return res.send({ error: 'exists' });
        }

        const salt = bcrypt.genSaltSync(); // Generate string to randomize password

        // Save their registered info
        setDoc(initDoc, {
            ...userInfo,
            dms: [],
            matches: [],
            password: bcrypt.hashSync(userInfo.password, salt) // encrypt password
        });

        res.send({ email, token });
    });
};