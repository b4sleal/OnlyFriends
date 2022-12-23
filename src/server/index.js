//Heres the main file for the backend (which just manages the database)
//The server is running on localhost:8000

// useful stuff
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const socketio = require('./socketio');
const port = 8000;
const app = express();

// Store email verification
app.emails = {};

// Makes API only accessible by our website
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
);

// Ensure responses and replies are JSON (objects)
app.use(express.json());

// separating socketio package and routes 
socketio.init(app);
routes.init(app);

// Quick register users for testing
require('./quickRegister')(app);
// require('./generateUsers')(13);

// Start server on port 8000
app.listen(port, () => {
    console.log('Backend listening on port ' + port);
});