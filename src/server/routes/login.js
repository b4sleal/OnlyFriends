const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Our stuff
const { doc, getDoc } = require('firebase/firestore'); //database stuff
const { db } = require('../firebase');// more database stuff

module.exports = (app) => {
    // Log in page stuff thing 
    app.post('/api/auth/login', async (req, res) => {
        const token = jwt.sign(req.body, process.env.TOKEN_SECRET, { expiresIn: '30s' });
        const initialDoc = doc(db, 'Users', req.body.email);
        const document = await getDoc(initialDoc);


        if (!document.exists()) {
            res.send({ error: 'email' });
        } else {
            const validPass = bcrypt.compareSync(req.body.password, document.get('password'));

            // if the password is valid, we send them back the token
            if (validPass) {
                res.send({ email: req.body.email, token });
            } else { //otherwise reply that they entered the wrong password
                res.send({ error: 'password' });
            }
        }
    });
};