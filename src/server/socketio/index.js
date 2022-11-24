const { Server } = require('socket.io');
const http = require('http');

// Our stuff
const { doc, setDoc, getDoc, serverTimestamp, collection, updateDoc } = require('firebase/firestore'); //database stuff
const { db } = require('../database/firebase');// more database stuff
const SpotifyWebApi = require('spotify-web-api-node');

module.exports.init = (app) => {
    const server = http.createServer(app).listen(8080);
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {

        socket.on('userlogin', async (data) => {
            console.log(`⚡: user ${data.email} just logged in and connected to room! ${socket.id}`);
            socket.data.email = data.email;

            const users = [];

            for (let [id, socket] of io.of("/").sockets) {
                users.push(socket.data.email);
            }

            // Identification for sockets
            // Socket creates and joins the room named after their email
            socket.join(data.email);
            io.to(data.email).emit("users", users);
            io.emit('userpresence', { offline: false, email: data.email });
        });

        // Handle message sending
        socket.on('message', async (data) => {
            const emails = [data.from, data.to].sort();

            const colRef = collection(db, 'Messages', emails.join(' '), 'dms');
            const initialDoc = doc(db, 'Messages', emails.join(' '));
            const initialDocMSG = doc(colRef);
            const initialDocument = await getDoc(initialDoc);

            const lastMessage = { message: data.message, timestamp: serverTimestamp() };
            // If their DMS dont exist, then create the document for it
            if (!initialDocument.exists()) {
                await setDoc(initialDoc, {
                    timestamp: serverTimestamp(),
                    users: emails,
                    lastMessage
                });
            } else {
                updateDoc(initialDoc, { lastMessage });
            }

            // Save the message and store the last message as well
            setDoc(initialDocMSG, { from: data.from, message: data.message, timestamp: serverTimestamp() });

            // Emit to sockets if their room IDS are equal to these emails
            io.to(emails).emit('message', data);
        });

        // Event for showing if users are typing
        socket.on('typing', async data => {
            io.emit('typing', data);
        });

        // Fires when a client leaves or wifi breaks maybe
        socket.on('disconnect', () => {
            console.log('🔥: A user disconnected');
            io.emit('userpresence', { offline: true, email: socket.data.email });
        });
    });
};
