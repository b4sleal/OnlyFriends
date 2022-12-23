// Our stuff
const { query, getDocs, collection } = require('firebase/firestore'); //database stuff
const { db } = require('../database/firebase');// more database stuff


module.exports = (app) => {
    app.get('/api/auth/fetchallusers', async (req, res) => {
        const documents = await getDocs(query(
            collection(db, 'Users')
        ));

        const users = documents.docs.map(s => ({ email: s.id, ...s.data() }));

        res.send({ users });
    });
};