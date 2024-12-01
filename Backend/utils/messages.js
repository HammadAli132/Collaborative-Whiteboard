const messages = []

// create an addMessage, getMessages(roomId)
const addMessage = (message) => {
    messages.push(message)
}

const getMessages = (roomId) => {
    const roomMessages = messages.filter(msg => String(msg.roomID) === String(roomId))
    return roomMessages
}

module.exports = {
    addMessage,
    getMessages,
}