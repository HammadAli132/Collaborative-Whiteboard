import CreateForm from "../components/forms/CreateForm";
import JoinForm from "../components/forms/JoinForm";
import styles from "../styles/form.module.css"

export default function Room() {
    return (
        <div id={styles.room}>
            <CreateForm />
            <div className={styles.separator}></div>
            <JoinForm />
        </div>
    )
}
