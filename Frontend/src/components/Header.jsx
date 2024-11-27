import styles from "../styles/header.module.css"
import github from "../assets/github.svg"
import users from "../assets/users-solid.svg"

export default function Header() {
    return (
        <header>
            <nav id={styles.navMenu}>
                <h1 id={styles.logo}>Collaborative Whiteboard</h1>
                <div className={styles.iconTray}>
                    <a href="https://github.com/HammadAli132/" target="_blank" className={styles.icon}><img src={github} alt="My Github" /></a>
                    <div className={styles.icon}
                        onClick={() => console.log("View Users")}
                        >
                        <img src={users} alt="View Users" />
                    </div>
                </div>
            </nav>
        </header>
    )
}
