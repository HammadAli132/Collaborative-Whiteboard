import styles from "../styles/header.module.css"
import github from "../assets/github.svg"
import users from "../assets/users-solid.svg"
import PropTypes from "prop-types"

const Header = ({setSideBarIsVisible}) => {
    return (
        <header>
            <nav id={styles.navMenu}>
                <h1 id={styles.logo}>Collaborative Whiteboard</h1>
                <div className={styles.iconTray}>
                    <a href="https://github.com/HammadAli132/" target="_blank" className={styles.icon}><img src={github} alt="My Github" /></a>
                    <div className={styles.icon}
                        onClick={() => {
                            setSideBarIsVisible(true)
                        }}
                        >
                        <img src={users} alt="View Users" />
                    </div>
                </div>
            </nav>
        </header>
    )
}

Header.propTypes = {
    setSideBarIsVisible: PropTypes.func
}

export default Header