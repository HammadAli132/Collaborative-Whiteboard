const express = require("express")
const http = require("http")
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
    return res.end("Server is running")
})

io.on('connection', (socket) => {
    console.log(`A new user connected by id: ${socket.id}`)
})

server.listen(5000, () => {
    console.log("Server started at http://localhost:5000")
})