const users = []

const addUser = (user) => {
    users.push(user)
}

const deleteUser = (user) => {
    const index = users.findIndex(u => user.socketId === u.socketId)
    if (index !== -1) return users.splice(index, 1)[0]
}

const getUser = (id) => {
    return users.find(u => id === u.socketId)
}

const getUsers = () => {
    return users
}

const getUsersInRoom = (roomId) => {
    return users.filter(user => String(user.roomID) === String(roomId))
}

module.exports = {
    addUser,
    deleteUser,
    getUser,
    getUsers,
    getUsersInRoom,
}