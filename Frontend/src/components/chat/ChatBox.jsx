import styles from "../../styles/homepage.module.css"
import Message from "./Message"

export default function ChatBox() {
    return (
        <div id={styles.chatArea}>
            <span id={styles.areaTitle}>Chat With Collaborators</span>
            <div id={styles.chatBox}>
                <div id={styles.chats}>
                    <Message username={'Ali'} text={"Hello everyone. What is your name? Where are you form? Are you Urdu speaking?"} date={new Date().getTime().toString()} />
                    <Message username={'Haroon'} text={"Hello everyone. What is your name? Where are you form? Are you Urdu speaking?"} date={new Date().getTime().toString()} />
                    <Message username={'Hameed'} text={"Hello everyone. What is your name? Where are you form? Are you Urdu speaking?"} date={new Date().getTime().toString()} />
                    <Message username={'Ahmad'} text={"Hello everyone. What is your name? Where are you form? Are you Urdu speaking?"} date={new Date().getTime().toString()} />
                    <Message username={'Bilal'} text={"Hello everyone. What is your name? Where are you form? Are you Urdu speaking?"} date={new Date().getTime().toString()} />
                    <Message username={'Hammad'} text={"Hello everyone. What is your name? Where are you form? Are you Urdu speaking?"} date={new Date().getTime().toString()} />
                    <Message username={'Sheikh'} text={"Hello everyone. What is your name? Where are you form? Are you Urdu speaking?"} date={new Date().getTime().toString()} />
                    <Message username={'Ayoob'} text={"Hello everyone. What is your name? Where are you form? Are you Urdu speaking?"} date={new Date().getTime().toString()} />

                </div>
                <div id={styles.separator}></div>
                <input type="text" name="message" id={styles.messageBox} placeholder="Your message..." />
            </div>
        </div>
    )
}
