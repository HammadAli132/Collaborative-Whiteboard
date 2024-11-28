import styles from "../../styles/homepage.module.css"

export default function ChatBox() {
    return (
        <div id={styles.chatArea}>
            <span id={styles.areaTitle}>Chat With Your Collaborators</span>
            <div id={styles.chatBox}>
                <div id={styles.chats}>

                </div>
                <div id={styles.separator}></div>
                <input type="text" name="message" id={styles.message} placeholder="Your message..." />
            </div>
        </div>
    )
}
