
// Our stuff
const { doc, updateDoc } = require('firebase/firestore'); //database stuff
const { db } = require('../database/firebase');// more database stuff
const bcrypt = require('bcryptjs');

module.exports = (app) => {
    app.post('/api/auth/edituser', async (req, res) => {
        const { email, password, ...userInfo } = req.body;
        const initDoc = doc(db, 'Users', email); 
        
        // Generate randomness
        const salt = bcrypt.genSaltSync();
   
        updateDoc(initDoc, filterObject({
            ...userInfo,
            password: password && bcrypt.hashSync(password, salt)
        }));

        // Confirmation
        res.send({message: 'saved'})
    });
}; 

const filterObject = (obj) => Object.keys(obj).forEach(s => !obj[s] && delete obj[s]) || obj
