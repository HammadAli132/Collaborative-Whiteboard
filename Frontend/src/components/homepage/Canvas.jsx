import styles from "../../styles/homepage.module.css";
import undo from "../../assets/undo.svg";
import redo from "../../assets/redo.svg";
import { useContext, useEffect, useRef, useState } from "react";
import rough from "roughjs";
import { myContext } from "../../pages/Homepage";

export default function Canvas() {
    const canvasRef = useRef(null);
    const roughCanvasRef = useRef(null);
    const [points, setPoints] = useState([]); // Free drawing points
    const [startPoint, setStartPoint] = useState(null); // Rectangle start point
    const [currentRect, setCurrentRect] = useState(null); // Rectangle preview
    const [drawnPaths, setDrawnPaths] = useState([]); // All drawn paths
    const [undoStack, setUndoStack] = useState([]); // Stack for undo actions
    const [redoStack, setRedoStack] = useState([]); // Stack for redo actions
    const [isDrawing, setIsDrawing] = useState(false);
    const { mode, color } = useContext(myContext);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            // Set the canvas size to match the parent
            const parent = canvas.parentNode;
            canvas.width = parent.offsetWidth;
            canvas.height = parent.offsetHeight;
            // Initialize roughCanvas
            const rc = rough.canvas(canvas);
            roughCanvasRef.current = rc;
        }
    }, []);

    // Redraw all paths (freehand and rectangles) on the canvas
    const redrawCanvas = (paths) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear the whole canvas
        if (paths)
            paths.forEach(path => {
                if (path.type === "freehand") {
                    roughCanvasRef.current.linearPath(path.points, {
                        stroke: path.color,
                        strokeWidth: 4,
                        roughness: 0,
                    });
                } else if (path.type === "rectangle") {
                    roughCanvasRef.current.rectangle(path.x, path.y, path.width, path.height, {
                        stroke: path.color,
                        strokeWidth: 2,
                        roughness: 0,
                    });
                }
            });
        else
            drawnPaths.forEach(path => {
                if (path.type === "freehand") {
                    roughCanvasRef.current.linearPath(path.points, {
                        stroke: path.color,
                        strokeWidth: 4,
                        roughness: 0,
                    });
                } else if (path.type === "rectangle") {
                    roughCanvasRef.current.rectangle(path.x, path.y, path.width, path.height, {
                        stroke: path.color,
                        strokeWidth: 2,
                        roughness: 0,
                    });
                }
            });
    };

    const handleMouseDown = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        setIsDrawing(true);
        mode === 2 ? setStartPoint([offsetX, offsetY]) : setPoints([[offsetX, offsetY]])
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return;

        const { offsetX, offsetY } = e.nativeEvent;
        if (mode === 2) {
            // Rectangle drawing logic
            const [startX, startY] = startPoint;
            const width = offsetX - startX;
            const height = offsetY - startY;
            setCurrentRect({ x: startX, y: startY, width, height });

            // Redraw canvas to preserve other paths and show live preview
            redrawCanvas(null);

            // Draw the preview rectangle
            roughCanvasRef.current.rectangle(startX, startY, width, height, {
                stroke: color,
                strokeWidth: 2,
                roughness: 0,
            });
        } else {
            setPoints((prev) => [...prev, [offsetX, offsetY]]);
            // Draw a freehand line
            roughCanvasRef.current.linearPath(points, {
                stroke: mode === 0 ? color : "#ffffff",
                strokeWidth: 4,
                roughness: 0,
            });
        }
    };

    const handleMouseUp = () => {
        if (mode === 2 && currentRect) {
            // Finalize rectangle drawing
            const { x, y, width, height } = currentRect;
            const newPath = { type: "rectangle", x, y, width, height, color };
            setDrawnPaths((prev) => [...prev, newPath]);
            setUndoStack((prev) => [...prev, newPath]); // Save to undo stack
            setCurrentRect(null); // Clear live preview
        }

        if (mode !== 2 && points.length > 1) {
            let newPath = undefined
            if (mode === 0) // if in pencil mode, the color is one present in context
                newPath = { type: "freehand", points, color }
            else if (mode === 1) // if in eraser mode, the color is white
                newPath = { type: "freehand", points, color:"#ffffff" }
            setDrawnPaths((prev) => [...prev, newPath]);
            setUndoStack((prev) => [...prev, newPath]); // Save to undo stack
        }

        setIsDrawing(false);
        setStartPoint(null);
    };

    const handleClearCanvas = () => {
        setDrawnPaths([]); // Clear all drawings
        setUndoStack([]); // Clear undo stack
        setRedoStack([]); // Clear redo stack
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleUndo = () => {
        if (undoStack.length === 0) return;

        const lastAction = undoStack[undoStack.length - 1];
        setRedoStack((prev) => [lastAction, ...prev]); // Move to redo stack
        setUndoStack((prev) => prev.slice(0, prev.length - 1)); // Remove from undo stack
        // Redraw canvas after undo
        setDrawnPaths((prev) => {
            const updatedPaths = prev.slice(0, prev.length - 1);
            console.log(`Updated path: ${JSON.stringify(updatedPaths)}`)
            redrawCanvas(updatedPaths);
            return updatedPaths;
        });
    };

    const handleRedo = () => {
        if (redoStack.length === 0) return;

        const lastRedoAction = redoStack[0];
        setUndoStack((prev) => [...prev, lastRedoAction]); // Move to undo stack
        setRedoStack((prev) => prev.slice(1)); // Remove from redo stack

        // Redraw canvas after redo
        setDrawnPaths((prev) => {
            const updatedPaths = [...prev, lastRedoAction];
            redrawCanvas(updatedPaths);
            return updatedPaths;
        });
    };

    return (
        <div id={styles.canvas}>
            <div id={styles.topRow}>
                <div className={styles.dos}>
                    <img src={undo} alt="Undo" onClick={handleUndo} />
                </div>
                <div className={styles.dos}>
                    <img src={redo} alt="Redo" onClick={handleRedo} />
                </div>
                <button className={styles.btn} onClick={handleClearCanvas}>Clear Board</button>
            </div>
            <div
                id={styles.canvasBoard}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <canvas ref={canvasRef} />
            </div>
        </div>
    );
}
