import styles from "../../styles/form.module.css"

export default function CreateForm() {
    return (
        <div className={styles.formDiv}>
            <span className={styles.formTitle}>Create A Room</span>
            <form action="#" className={styles.form}>
                <label className={styles.label}>
                    Username:
                    <input type="text" name="username" id="username" placeholder="Your Name" className={styles.input} />
                </label>
                <label className={styles.label}>
                    Room ID:
                    <input type="text" name="roomId" id="roomId" placeholder="Room ID" className={styles.input} />
                </label>
                <button type="submit" className={styles.btn}>Create Room</button>
            </form>
        </div>
    )
}
