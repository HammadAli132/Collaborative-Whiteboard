import App from "./App"
import Page404 from "./components/Page404"
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
            {
                path: '/404',
                element: <Page404 />
            },
        ],
    },
]

export default routes