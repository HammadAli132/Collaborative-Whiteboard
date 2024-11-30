import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import UsersSidebar from "./components/homepage/UsersSidebar"
import io from "socket.io-client"
import { useEffect, useState } from "react"

const server = "http://localhost:5000"
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
      }
      else {
        setUser(null)
      }
    })

    socket.on('new-user-logged-in', users => {
      setUsers(users)
    })
  }, [])

  return (
    <div className={`root`}> 
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
