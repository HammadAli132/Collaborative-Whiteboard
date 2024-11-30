import styles from "../../styles/form.module.css"
import rotate from "../../assets/rotate.svg"
import { useNavigate } from "react-router-dom"
import { useRef, useState } from "react"

const generateID = () => {
    let randomID = ""
    for (let i = 0; i < 4; i++) {
        let randomNum = Math.floor(Math.random() * 255) + 1
        randomID += randomNum.toString()
        if (i < 3) randomID += '.'
    }
    return randomID
}

export default function CreateForm() {
    const navigate = useNavigate()
    const nameRef = useRef()
    const [roomID, setRoomID] = useState(generateID())
    const [username, setUsername] = useState(null)

    const handleRoomCreation = (e) => {
        e.preventDefault()
        if (username === null || username === '')
            alert('Kindly enter a username')
        else {
            navigate('/homepage')
        }
    }

    return (
        <div className={styles.formDiv}>
            <span className={styles.formTitle}>Create A Room</span>
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
                            id="roomId"
                            placeholder="Room ID"
                            className={styles.input}
                            disabled
                            value={roomID} />
                </label>
                <div id={styles.btnDiv}>
                    <button className={styles.btn}
                            id={styles.generatorBtn}
                            onClick={(e) => {
                                e.preventDefault()
                                setRoomID(generateID())
                            }}
                            >
                        <img src={rotate} alt="" />
                    </button>
                    <button type="submit" 
                            className={styles.btn}
                            onClick={handleRoomCreation}
                            >
                        Create Room
                    </button>
                </div>
            </form>
        </div>
    )
}
