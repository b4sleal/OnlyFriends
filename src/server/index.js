//Heres the main file for the backend (which just manages the database)
//The server is running on localhost:8000


// useful stuff
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const routes = require('./routes');
const port = 8000;
app.emails = {};

// Ensure responses and replies are JSON (objects)
app.use(express.json());

// Makes API only accessible by our website
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
);
//Since theres a lot of routes we're separating them 
routes.init(app);

// Example usage for get and post:
// Look at Test Routes.rest to try them
app.get('/api/test', (req, res) => {
    res.send({ message: 'What the website looks like at this URL' });
});

app.post('/api/sendmestuff', (req, res) => {
    //req.body is the data they sent
    res.send({ message: 'you sent me this!', stuffYOUsent: req.body });
});

// Start server on port 8000
app.listen(port, () => {
    console.log('Backend listening on port ' + port);
});