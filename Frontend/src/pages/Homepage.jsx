import { createContext, useState } from "react";
import Toolbar from "../components/homepage/Toolbar";
import styles from "../styles/homepage.module.css"
import Canvas from "../components/homepage/Canvas";
import ChatBox from "../components/chat/ChatBox";

export const myContext = createContext({
    mode: 0,
    color: '#000000'
})

export default function Homepage() {
    const [mode, setMode] = useState(0)
    const [color, setColor] = useState('#000000')

    return (
        <div id={styles.homepage}>
            <myContext.Provider value={{mode, setMode, color, setColor}}>
                <Toolbar />
                <Canvas />
                <ChatBox />
            </myContext.Provider>
        </div>
    )
}
