// Our stuff
const { query, getDocs, collection, orderBy, getDoc, doc, setDoc } = require('firebase/firestore'); //database stuff
const { db } = require('../database/firebase');// more database stuff

// Get DM messages from database
module.exports = (app) => {
    app.get('/api/auth/getmessages', async (req, res) => {
        const data = req.query;
        const users = [data.email, data.user];

        if (!users?.length) {
            return res.send({ error: 'no emails' });
        }

        const emails = users.sort();
        const colRef = query(collection(db, 'Messages', emails.join(' '), 'dms'), orderBy('timestamp'));
        const documents = await getDocs(colRef);
        const dms = documents.docs.map(s => s.data());

        res.send({ dms });
    });
};