export default function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer>
            &copy; {year} The Collaborative Whiteboard | All Right Reserved
        </footer>
    )
}
