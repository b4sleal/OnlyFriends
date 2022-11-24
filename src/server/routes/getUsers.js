// Our stuff
const { query, getDocs, getDoc, documentId, collection, where, doc } = require('firebase/firestore'); //database stuff
const { db } = require('../database/firebase');// more database stuff

module.exports = (app) => {
    app.get('/api/auth/getusers', async (req, res) => {
        const { email } = req.query;

        if (!email) {
            return res.send({ error: 'no email' });
        }

        const document = await getDoc(doc(db, 'Users', email));
        const { dms, matches } = document.data();

        const chunks = chunk(removeDupes(dms, matches), 10);
        const documents = [];

        for await (const items of chunks.map(async s =>
            await getDocs(query(
                collection(db, 'Users'),
                where(documentId(), "in", s)
            )))
        ) {
            documents.push(items.docs);
        }

        const messages = await getDocs(query(
            collection(db, 'Messages'),
            where('users', 'array-contains', email)
        ));

        const lastMessages = messages.docs.reduce((prev, current) => {
            const data = current.data();
            const user = data.users.filter(s => s != email)[0];
            const { message, timestamp } = data.lastMessage;

            return { ...prev, [user]: { message, timestamp: timestamp.toMillis() } };
        }, {});

        const users = documents.flat().filter(s => dms.includes(s.id)).map(s => (
            {
                email: s.id,
                ...s.data(),
                password: '',
                lastMessage: lastMessages[s.id] || { message: '', timestamp: 0 }
            }
        ));

        const matches2 = documents.flat().filter(s => matches.includes(s.id)).map(s => (
            {
                email: s.id,
                ...s.data(),
                password: ''
            }
        ));

        res.send({ users, matches: matches2 });
    });
};

const removeDupes = (...arr) => {
    return Array.from(new Set([...arr].flat()));
};

const chunk = (list, chunk) => {
    const result = [];

    for (let i = 0; i < list.length; i += chunk) {
        result.push(list.slice(i, i + chunk));
    }

    return result;
};