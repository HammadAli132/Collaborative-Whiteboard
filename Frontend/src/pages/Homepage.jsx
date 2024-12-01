import { createContext, useEffect, useState } from "react";
import Toolbar from "../components/homepage/Toolbar";
import styles from "../styles/homepage.module.css"
import Canvas from "../components/homepage/Canvas";
import ChatBox from "../components/chat/ChatBox";
import { useNavigate, useOutletContext } from "react-router-dom";

export const myContext = createContext({
    mode: 0,
    color: '#000000',
    messages: [],
})

export default function Homepage() {
    const [mode, setMode] = useState(0)
    const [color, setColor] = useState('#000000')
    const { user, socket } = useOutletContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/404', {replace: true})
        }
    }, [user, navigate])

    if (!user) {
        return null
    }

    return (
        <div id={styles.homepage}>
            <myContext.Provider value={{mode, setMode, color, setColor, user, socket}}>
                <Toolbar />
                <Canvas />
                <ChatBox />
            </myContext.Provider>
        </div>
    )
}
