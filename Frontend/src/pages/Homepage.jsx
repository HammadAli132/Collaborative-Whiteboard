import { useState } from "react";
import Toolbar from "../components/homepage/Toolbar";
import styles from "../styles/homepage.module.css"

export default function Homepage() {
    const [mode, setMode] = useState(0)
    const [color, setColor] = useState('#000000')

    const handleModes = (newMode) => {
        setMode(newMode)
    }

    const handleColors = (newColor) => {
        console.log(newColor)
        setColor(newColor)
    }

    return (
        <div id={styles.homepage}>
            <Toolbar mode={mode} handleModes={handleModes} color={color} handleColors={handleColors} />
        </div>
    )
}
