const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Our stuff
const { doc, getDoc } = require('firebase/firestore');
const { db } = require('../firebase');

module.exports = (app) => {
    // Log in page stuff thing 
    app.post('/api/auth/login', async (req, res) => {
        const token = jwt.sign(req.body, process.env.TOKEN_SECRET, { expiresIn: '30s' });
        const col = doc(db, 'Users', req.body.email);
        const document = await getDoc(col);

        if (!document.exists()) {
            res.send({ error: 'email' });
        } else {
            const validPass = bcrypt.compareSync(req.body.password, document.get('password'));

            if (validPass) {
                res.send({ email: req.body.email, token });
            } else {
                res.send({ error: 'password' });
            }
        }
    });
};