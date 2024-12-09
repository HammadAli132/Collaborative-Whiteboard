import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import UsersSidebar from "./components/homepage/UsersSidebar"
import io from "socket.io-client"
import { useEffect, useState } from "react"
import {toast, ToastContainer} from "react-toastify"

const server = import.meta.env.VITE_MODE === 'development' ?  "http://localhost:5000" : import.meta.env.VITE_SERVER_URL
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000, 
  transports: ["websocket"],
}

const socket = io(server, connectionOptions)

const App = () => {
  const [user, setUser] = useState(null)
  const [sideBarIsVisible, setSideBarIsVisible] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    socket.on("user-has-joined", reply => {
      if (reply.success === true) {
        setUsers(reply.users)
      } else {
        setUser(null)
      }
    })

    socket.on('new-user-logged-in', users => {
      setUsers(users)
    })

    socket.on('user-login-message', reply => {toast.info(`${reply} has joined the room`)})

    socket.on('user-logout-message', reply => {
      toast.info(`${reply.username} has left the room`)
      setUsers(reply.users)
    })

  }, [])

  return (
    <div className={`root`}> 
      <ToastContainer />
      <Header setSideBarIsVisible={setSideBarIsVisible} />
      <UsersSidebar sideBarIsVisible={sideBarIsVisible} setSideBarIsVisible={setSideBarIsVisible} users={users} user={user} />
      <main>
        <Outlet context={{user, setUser, socket, users}} />
      </main>
      <Footer />
    </div>
  )
}

export default App
