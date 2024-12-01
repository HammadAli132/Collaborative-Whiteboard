const { addUser, deleteUser, getUser, getUsers, getUsersInRoom } = require('./utils/users.js');
const { addMessage, getMessages } = require('./utils/messages.js');

const express = require("express")
const http = require("http")
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.MODE === 'development' ? 'http://localhost:3000' : process.env.SERVER_URL
    }
})

const validRoomIDs = new Set(); // Maintain valid room IDs

app.get('/', (req, res) => {
    return res.end("Server is running")
})

io.on('connection', (socket) => {
    console.log(`A new user connected by id: ${socket.id}`)

    socket.on("owner-joined", data => {
        const {username, roomID, userID} = data
        addUser({...data, socketId: socket.id})
        validRoomIDs.add(roomID);
        socket.join(roomID)
        socket.emit("user-has-joined", {success: true, users: getUsersInRoom(roomID)})
    })

    socket.on("user-joined", data => {
        const {username, roomID, userID} = data
        if (!validRoomIDs.has(roomID)) { // Validate the room ID
            socket.emit("user-has-joined", { success: false, message: "Invalid room ID" });
            return;
        }
        addUser({...data, socketId: socket.id})
        socket.join(roomID)
        socket.emit("user-has-joined", {success: true, users: getUsersInRoom(roomID)})
        socket.broadcast.to(roomID).emit("new-user-logged-in", getUsersInRoom(roomID))
        socket.broadcast.to(roomID).emit("user-login-message", username)
    })

    socket.on('draw', data => {
        const user = getUser(socket.id);
        if (user && user.roomID) {
            socket.to(user.roomID).emit('draw', data);
        }
    });

    socket.on('clear-canvas', () => {
        const user = getUser(socket.id);
        if (user && user.roomID) {
            socket.to(user.roomID).emit('clear-canvas');
        }
    });

    socket.on('save', data => {
        const user = getUser(socket.id);
        if (user && user.roomID) {
            socket.to(user.roomID).emit('save', data);
        }
    });

    socket.on('send-message', message => {
        addMessage(message)
        socket.to(message.roomID).emit('receive-message', getMessages(message.roomID))
    })

    socket.on('get-all-messages', (roomID, callback) => {
        const roomMessages = getMessages(roomID);
        callback(roomMessages);
    });
    
    socket.on('disconnect', () => {
        const user = getUser(socket.id)
        if (user) {
            deleteUser(user)
            const remainingUsers = getUsersInRoom(user.roomID);
            if (remainingUsers.length === 0) {
                validRoomIDs.delete(user.roomID); // Remove the room ID if the room is empty
            }

            socket.broadcast.to(user.roomID).emit("user-logout-message", { 
                username: user.username, 
                users: remainingUsers 
            });
        }
    })

})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})