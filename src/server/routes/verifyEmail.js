const nodemailer = require('nodemailer');
const { doc, getDoc, setDoc } = require('firebase/firestore');
const { db } = require('../firebase');

module.exports = (app) => {
    app.post('/api/auth/verifyemail', async (req, res) => {
        const data = req.body;
        const sent = app.emails[data.email];
        const code = random(14672, 89457);

        const initDoc = doc(db, 'Users', data.email);
        const document = await getDoc(initDoc);

        if (document.exists()) {
            return res.send({ error: 'exists' });
        }

        // Only allow them to send 1 request at a time
        if (sent) {
            if (sent < Date.now()) {
                return res.send({ error: 'limit' });
            } else {
                delete app.emails[data.email];
            }
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'onlyfriends2fa@gmail.com',
                pass: 'zginvacjvjqhvzgu'
            }
        });

        const mailOptions = {
            from: 'OnlyFriends',
            to: data.email,
            subject: 'Verification Code',
            html: `Enter the verification code to create your account: ${code}`,
        };

        app.emails[data.email] = { code, time: Date.now() + 20 * 1000 }; // 20 seconds 

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

const random = (min, max) => ~~(Math.random() * (max - min + 1)) + min;
