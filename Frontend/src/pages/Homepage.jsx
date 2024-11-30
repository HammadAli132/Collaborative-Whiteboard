import { createContext, useEffect, useState } from "react";
import Toolbar from "../components/homepage/Toolbar";
import styles from "../styles/homepage.module.css"
import Canvas from "../components/homepage/Canvas";
import ChatBox from "../components/chat/ChatBox";
import { useOutletContext } from "react-router-dom";

export const myContext = createContext({
    mode: 0,
    color: '#000000'
})

export default function Homepage() {
    const [mode, setMode] = useState(0)
    const [color, setColor] = useState('#000000')
    const { user } = useOutletContext()
    let roomNotFound = false

    useEffect(() => {
        if (!user) {
            console.log("show 404 page")
            roomNotFound = true
        }
    }, [user])

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
