import styles from "../../styles/popups.module.css";
import cross from "../../assets/cross.svg";
import PropTypes from "prop-types";

export default function UsersSidebar({ sideBarIsVisible, setSideBarIsVisible, users, user }) {

    return (
        <div
            id={styles.sideBar}
            className={sideBarIsVisible ? `${styles.visible}` : `${styles.hidden}`} // Conditional class
            >
            <div id={styles.cross} onClick={() => setSideBarIsVisible(false)}>
                <img src={cross} alt="Close Sidebar" />
            </div>
            <div id={styles.count}>Total Users: {users.length}</div>
            <span id={styles.title}>Users</span>
            <ul>
                {
                    users.map((key, index) => {
                        return  <li key={key}
                                    className={styles.username}>
                                    { users[index].username } {user?.userID === users[index].userID && "(You)"}
                                </li>
                    })
                }
            </ul>
        </div>
    );
}

UsersSidebar.propTypes = {
    sideBarIsVisible: PropTypes.bool.isRequired,
    setSideBarIsVisible: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    user: PropTypes.object
};
