// useful stuff
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const routes = require('./routes');
const port = 8000;
app.emails = {};

// Ensure responses are of only JSON i think
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
);

routes.init(app);

// Send a message to a url
// View here: http://localhost:8000/api/auth/test
app.get('/api/auth/test', (req, res) => {
    res.send({ message: 'success i think' });
});

// Start server on port 8000
app.listen(port, () => {
    console.log('Backend listening on port ' + port);
});