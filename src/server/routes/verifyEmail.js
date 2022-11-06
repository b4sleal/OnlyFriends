const nodemailer = require('nodemailer');
const { doc, getDoc, setDoc } = require('firebase/firestore');
const { db } = require('../firebase');

module.exports = (app) => {
    app.post('/api/auth/verifyemail', async (req, res) => {
        const data = req.body;
        const sent = app.emails[data.email]; // Storage for verification codes (time limit of 20 seconds)
        const code = random(14672, 89457);

        const initDoc = doc(db, 'Users', data.email);
        const document = await getDoc(initDoc);

        // Dont send an email request if they already got an account
        if (document.exists()) {
            return res.send({ error: 'exists' });
        }

        // If they sent a request within 20 seconds of the last, tell them they gotta wait
        // If its already past 20 seconds then theyre good
        if (sent) {
            if (sent < Date.now()) {
                return res.send({ error: 'limit' });
            } else {
                delete app.emails[data.email];
            }
        }

        // Set up email communicator transfigurator
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'onlyfriends2fa@gmail.com',
                pass: 'zginvacjvjqhvzgu'
            }
        });

        const mailOptions = {
            from: 'OnlyFriends <dbrown@wlu.ca>',
            to: data.email,
            subject: 'Verification Code',
            html: `Enter the verification code to create your account: ${code}`,
        };

        app.emails[data.email] = { code, time: Date.now() + 40 * 1000 }; // current date and 20 seconds

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log(err);
                res.send({ error: 'something went wrong' });
            } else {
                res.send({ message: 'sent' });
            }
        });
    });
};

//code generator (from google)
//everythings good!
const random = (min, max) => ~~(Math.random() * (max - min + 1)) + min;
