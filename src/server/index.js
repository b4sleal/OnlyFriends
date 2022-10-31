// useful stuff
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Our stuff
const { doc, getDoc, setDoc } = require('firebase/firestore');
const { authenticateToken } = require('./auth/jwt');
const { db } = require('./firebaseConfig');
const port = 8000;

// Ensure responses are of only JSON i think
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
);

// Send a message to a url
// View here: http://localhost:8000/api/auth/test
app.get('/api/auth/test', (req, res) => {
    res.send({ message: 'success i think' });
});

// Verify if the user is logged in
app.post('/api/auth/verifytoken', authenticateToken, async (req, res) => {
    res.send({ message: 'loggedin' });
});

// Log in page stuff thing 
app.post('/api/auth/login', async (req, res) => {
    const token = jwt.sign(req.body, process.env.TOKEN_SECRET, { expiresIn: '30s' });
    const col = doc(db, 'Users', req.body.email);
    const document = await getDoc(col);

    if (!document.exists()) {
        res.send({ invalid: 'email' });
    } else {
        const validPass = bcrypt.compareSync(req.body.password, document.get('password'));

        if (validPass) {
            res.send({ invalid: 'password' });
        } else {
            res.send({ email: req.body.email, token });
        }
    }
});

// Handle registers
app.post('/api/auth/register', async (req, res) => {
    const token = jwt.sign(req.body, process.env.TOKEN_SECRET, { expiresIn: '30s' });
    const col = doc(db, 'Users', req.body.email);
    const document = await getDoc(col);
    const salt = bcrypt.genSaltSync();

    if (document.exists()) {
        return res.send({ invalid: 'exists' });
    }

    // Save their registered info
    setDoc(col, {
        ...req.body,
        password: bcrypt.hashSync(req.body.password, salt)
    });

    res.send({ email: req.body.email, token });
});

app.listen(port, () => {
    console.log('Backend listening on port ' + port);
});