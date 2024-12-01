import styles from "../../styles/homepage.module.css"
import PropTypes from "prop-types"

const Message = ({username, text, time}) => {
    return (
        <div className={styles.message}>
            <div className={styles.block}>
                <span className={styles.username}>{username}</span>
                <span className={styles.date}>{time}</span>
            </div>
            <span className={styles.messageText}>{text}</span>
        </div>
    )
}

Message.propTypes = {
    username: PropTypes.string,
    text: PropTypes.string,
    time: PropTypes.string,
}

export default Message