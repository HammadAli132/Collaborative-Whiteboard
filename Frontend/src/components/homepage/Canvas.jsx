import styles from "../../styles/homepage.module.css"
import undo from "../../assets/undo.svg"
import redo from "../../assets/redo.svg"

export default function Canvas() {
    return (
        <div id={styles.canvas}>
            <div id={styles.topRow}>
                <div className={styles.dos}><img src={undo} alt="" /></div>
                <div className={styles.dos}><img src={redo} alt="" /></div>
                <button className={styles.btn}>Clear Board</button>
            </div>
            <div id={styles.canvasBoard}>

            </div>
        </div>
    )
}
