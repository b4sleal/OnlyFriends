const { storage } = require('../database/firebase');
const { ref, uploadString, getDownloadURL, getBytes } = require('firebase/storage');

module.exports = (app) => {
    app.post('/api/auth/profilepic', async (req, res) => {
        const { data, path } = req.body;
        const base64 = data.split(',')[1];

        if (!data || !path) {
            return res.send({ error: 'no image' });
        }

        const imageRef = ref(storage, path);

        uploadString(imageRef, base64, 'base64', {
            contentType: 'image/jpg'
        }).then(() => {
            res.send({ message: 'uploaded' });
        }).catch(() => {
            res.send({ message: 'error' });
            console.log(error);
        });
    });

    app.get('/api/auth/getpic', async (req, res) => {
        const { path } = req.query;
        const imageRef = ref(storage, path);
        getBytes(imageRef).then(url => res.send({ url: base64(url) })).catch((error) => {
            res.send({ error: 'no' });
            console.log(error);
        });
        //getDownloadURL(imageRef).then(url => res.send({ url }));
    });
};

const base64 = (arr) => 'data:image/jpg;base64,' + Buffer.from(arr).toString('base64');
