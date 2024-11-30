import { useRef, useState } from "react"
import styles from "../../styles/form.module.css"
import { useNavigate, useOutletContext } from "react-router-dom"

const generateID = () => {
    let randomID = ""
    for (let i = 0; i < 4; i++) {
        let randomNum = Math.floor(Math.random() * 255) + 1
        randomID += randomNum.toString()
        if (i < 3) randomID += '.'
    }
    return randomID
}

export default function JoinForm() {
    const navigate = useNavigate()
    const nameRef = useRef()
    const roomIdRef = useRef()
    const [roomID, setRoomID] = useState(null)
    const [username, setUsername] = useState(null)
    const { setUser, socket } = useOutletContext()

    const handleRoomJoining = (e) => {
        e.preventDefault()
        if (username === null || username === '')
            alert('Kindly enter a username')
        else {
            const data = {
                roomID,
                username,
                userID: generateID(),
            }
            setUser(data)
            socket.emit("user-joined", data)
            navigate('/homepage')
        }
    }

    return (
        <div className={styles.formDiv}>
            <span className={styles.formTitle}>Join A Room</span>
            <form action="#" className={styles.form}>
                <label className={styles.label}>
                    Username:
                    <input type="text" 
                            name="username" 
                            ref={nameRef}
                            id="username" 
                            placeholder="Your Name" 
                            className={styles.input}
                            onChange={() => setUsername(nameRef.current.value)} />
                </label>
                <label className={styles.label}>
                    Room ID:
                    <input type="text"
                            name="roomId"
                            ref={roomIdRef}
                            id="roomId"
                            placeholder="Room ID"
                            className={styles.input}
                            onChange={() => setRoomID(roomIdRef.current.value)} />
                </label>
                <button type="submit" 
                        className={styles.btn}
                        onClick={handleRoomJoining}
                        >
                    Join Room
                </button>
            </form>
        </div>
    )
}
