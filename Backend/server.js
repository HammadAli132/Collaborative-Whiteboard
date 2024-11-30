const { addUser, deleteUser, getUser, getUsers, getUsersInRoom } = require('./utils/users.js');

const express = require("express")
const http = require("http")
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

let globalRoomID = null

app.get('/', (req, res) => {
    return res.end("Server is running")
})

io.on('connection', (socket) => {
    console.log(`A new user connected by id: ${socket.id}`)

    socket.on("owner-joined", data => {
        const {username, roomID, userID} = data
        globalRoomID = roomID
        addUser(data)
        socket.join(roomID)
        socket.emit("user-has-joined", {success: true, users: getUsersInRoom(globalRoomID)})
    })

    socket.on("user-joined", data => {
        const {username, roomID, userID} = data
        if (!globalRoomID || globalRoomID !== roomID) {
            socket.emit("user-has-joined", {success: false})
        }
        else if (globalRoomID === roomID) {
            addUser(data)
            socket.join(roomID)
            socket.emit("user-has-joined", {success: true, users: getUsersInRoom(globalRoomID)})
            socket.broadcast.to(globalRoomID).emit("new-user-logged-in", getUsersInRoom(globalRoomID))
        }            
    })

    socket.on('draw', data => {
        socket.broadcast.emit('draw', data)
    })

    socket.on('save', data => {
        socket.broadcast.emit('save', data)
    })

    socket.on('clear-canvas', () => {
        socket.broadcast.emit('clear-canvas')
    })
})

server.listen(5000, () => {
    console.log("Server started at http://localhost:5000")
})