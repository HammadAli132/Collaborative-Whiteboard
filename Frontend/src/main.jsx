import { createRoot } from 'react-dom/client'
import './index.css'
import routes from './routes.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "react-toastify/ReactToastify.min.css"

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
