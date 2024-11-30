const users = []

const addUser = (user) => {
    users.push(user)
}

const deleteUser = (user) => {
    const index = users.filter(u => user.userID === u.userID)
    if (index !== -1) return users.splice(index, 1)[0]
}

const getUser = (user) => {
    return users.find(u => user.userID === u.userID)
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