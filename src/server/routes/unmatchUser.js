
// Our stuff
const { doc, updateDoc, arrayRemove } = require('firebase/firestore'); //database stuff
const { db } = require('../database/firebase');// more database stuff

module.exports = (app) => {
    app.get('/api/auth/unmatchuser', async (req, res) => {
        const { email, user } = req.query
        const initDoc = doc(db, 'Users', email); 

        updateDoc(initDoc, {
            dms: arrayRemove(user)
        });

        // Confirmation
        res.send({message: 'removed!'}) 
    });
}; 
