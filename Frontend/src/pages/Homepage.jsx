import { createContext, useState } from "react";
import Toolbar from "../components/homepage/Toolbar";
import styles from "../styles/homepage.module.css"

export const myContext = createContext()

export default function Homepage() {
    const [mode, setMode] = useState(0)
    const [color, setColor] = useState('#000000')

    return (
        <div id={styles.homepage}>
            <myContext.Provider value={{mode, setMode, color, setColor}}>
                <Toolbar />
            </myContext.Provider>
        </div>
    )
}
