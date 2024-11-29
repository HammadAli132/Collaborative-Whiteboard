import styles from "../../styles/homepage.module.css"
import PropTypes from "prop-types"

function formatTime(timestamp) {
    const date = new Date(parseInt(timestamp, 10)); // Parse the timestamp
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight (0)
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero
    return `${hours}:${formattedMinutes} ${ampm}`;
}


const Message = ({username, text, date}) => {
    return (
        <div className={styles.message}>
            <div className={styles.block}>
                <span className={styles.username}>{username}</span>
                <span className={styles.date}>{formatTime(date)}</span>
            </div>
            <span className={styles.messageText}>{text}</span>
        </div>
    )
}

Message.propTypes = {
    username: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.string,
}

export default Message