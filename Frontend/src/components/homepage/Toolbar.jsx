import styles from "../../styles/homepage.module.css"
import PropTypes from "prop-types"
import {CirclePicker} from "react-color"
import pencil from "../../assets/pencil.svg"
import eraser from "../../assets/eraser.svg"
import rect from "../../assets/rect.svg"
import { useContext, useState } from "react"
import { myContext } from "../../pages/Homepage"

const Toolbar = () => {
    const toolbarImages = [pencil, eraser, rect]
    const {mode, setMode, color, setColor} = useContext(myContext)
    const [opened, setOpened] = useState(false)

    function handleOpening() {
        setOpened(!opened)
    }

    return (
        <div id={styles.toolbar}>
            <ul id={styles.tools}>
                {
                    toolbarImages.map((key, index) => {
                        return (
                            <li key={key}
                                className={styles.tool}
                                onClick={() => setMode(index)}
                                style={{ backgroundColor: index === mode ? '#3c3c3c' : '' }}
                                >
                                <img src={toolbarImages[index]} alt="Error" />
                            </li>
                        )
                    })
                }
                <li id={styles.colorPicker}
                    style={{background: color}}
                    onClick={() => handleOpening()}>
                </li>
            </ul>
            <div id={styles.colors} className={opened ? styles.active : ''}>
                <CirclePicker
                    colors={[
                        "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF",
                        "#800000", "#808000", "#008000", "#800080", "#008080", "#000080",
                        "#FFA500", "#A52A2A", "#5F9EA0", "#7FFF00", "#D2691E", "#6495ED",
                        "#DC143C", "#00CED1", "#ADFF2F", "#000000", "#B0E0E6", "#FF69B4" 
                    ]}
                    onChangeComplete={(color) => {
                        handleOpening()
                        setColor(color.hex)
                    }}
                />
            </div>
        </div>
    )
}

Toolbar.propTypes = {
    mode: PropTypes.number,
    handleModes: PropTypes.func,
    handleColors: PropTypes.func,
    color: PropTypes.string,
}

export default Toolbar