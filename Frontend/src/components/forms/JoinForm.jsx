import { useRef, useState } from "react"
import styles from "../../styles/form.module.css"
import { useNavigate } from "react-router-dom"

export default function JoinForm() {
    const navigate = useNavigate()
    const nameRef = useRef()
    const roomIdRef = useRef()
    const [roomID, setRoomID] = useState(null)
    const [username, setUsername] = useState(null)

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
                        onClick={(e) => {
                            e.preventDefault()
                            if (username === null || username === '')
                                alert('Kindly enter a username')
                            else if (roomID === null || roomID === '')
                                alert('Kindly enter a room ID')
                            else 
                                navigate('/homepage')
                        }}
                        >
                    Join Room
                </button>
            </form>
        </div>
    )
}
