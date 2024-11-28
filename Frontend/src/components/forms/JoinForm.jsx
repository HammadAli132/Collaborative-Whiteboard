import styles from "../../styles/form.module.css"

export default function JoinForm() {
    return (
        <div className={styles.formDiv}>
            <span className={styles.formTitle}>Join A Room</span>
            <form action="#" className={styles.form}>
                <label className={styles.label}>
                    Username:
                    <input type="text" name="username" id="username" placeholder="Your Name" className={styles.input} />
                </label>
                <label className={styles.label}>
                    Room ID:
                    <input type="text" name="roomId" id="roomId" placeholder="Room ID" className={styles.input} />
                </label>
                <button type="submit" className={styles.btn}>Join Room</button>
            </form>
        </div>
    )
}
