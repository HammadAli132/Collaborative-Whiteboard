import { useContext, useEffect, useRef } from "react"
import styles from "../../styles/homepage.module.css"
import Message from "./Message"
import { myContext } from "../../pages/Homepage"

function formatTime(timestamp) {
    const date = new Date(parseInt(timestamp, 10)); // Parse the timestamp
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight (0)
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero
    return `${hours}:${formattedMinutes} ${ampm}`;
}

export default function ChatBox() {
    const messagesEndRef = useRef()
    const messageRef = useRef()
    const {user, socket, messages, setMessages} = useContext(myContext)

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div id={styles.chatArea}>
            <span id={styles.areaTitle}>Chat With Collaborators</span>
            <div id={styles.chatBox}>
                <div id={styles.chats}>
                    {
                        messages.map((message, index) => {
                            return <Message key={index} username={messages[index].username} text={messages[index].text} time={messages[index].time} />
                        })
                    }
                    <div ref={messagesEndRef}></div>
                </div>
                <div id={styles.separator}></div>
                <input type="text" ref={messageRef} name="message" id={styles.messageBox} placeholder="Your message..." onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        const messageText = messageRef.current.value
                        messageRef.current.value = ''
                        const message = {
                            username: user.username,
                            roomID: user.roomID,
                            time: formatTime(new Date().getTime().toString()),
                            text: messageText,
                        }
                        socket.emit('send-message', message)
                        setMessages(prev => [...prev, message])
                    }
                }} />
            </div>
        </div>
    )
}
