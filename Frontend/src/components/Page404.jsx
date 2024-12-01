import { useNavigate } from "react-router-dom"
import error404 from "../assets/404 Error.gif"

export default function Page404() {
  const navigate = useNavigate()

  return (
    <div className="error404">
      <img src={error404} alt="" />
      <button className="btn"
              onClick={(e) => {
                e.preventDefault()
                navigate('/')
              }}>
        Join Another Room!
      </button>
    </div>
  )
}
