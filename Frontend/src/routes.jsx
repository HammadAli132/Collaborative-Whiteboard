import App from "./App"
import Homepage from "./pages/Homepage"
import Room from "./pages/Room"
// import { Navigate } from "react-router-dom"

const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Room />
            },
            {
                path: '/homepage',
                element: <Homepage />
            },
        ],
    },
]

export default routes