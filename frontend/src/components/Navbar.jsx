import { Link, useLocation, useNavigate } from "react-router-dom"
import { BsSearch } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import { useContext, useState } from "react"
import Menu from "./Menu"
import { UserContext } from "../context/UserContext"

const Navbar = () => {
  const [prompt, setPrompt] = useState("")
  const [menu, setMenu] = useState(false)
  const navigate = useNavigate()
  const path = useLocation().pathname

  const showMenu = () => {
    setMenu(!menu)
  }

  const { user } = useContext(UserContext)

  return (
    <nav className="bg-white shadow-md">
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        {/* Logo / Brand */}
        <h1 className="text-lg md:text-xl font-extrabold text-gray-900 hover:text-blue-600 transition-colors">
          <Link to="/">Blog Market</Link>
        </h1>

        {/* Search bar (visible on homepage only) */}
        {path === "/" && (
          <div className="flex justify-center items-center space-x-3 bg-gray-100 p-2 rounded-lg">
            <input
              onChange={(e) => setPrompt(e.target.value)}
              className="outline-none bg-transparent text-gray-700 placeholder-gray-500 px-3 focus:ring-0"
              placeholder="Search a post"
              type="text"
            />
            <p 
              onClick={() => navigate(prompt ? "?search=" + prompt : "/")}
              className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
            >
              <BsSearch size={18} />
            </p>
          </div>
        )}

        {/* User actions (login/register or menu) */}
        <div className="hidden md:flex items-center justify-center space-x-4">
          {user ? (
            <h3 className="text-gray-800 hover:text-blue-600 transition-colors">
              <Link to="/write">Write</Link>
            </h3>
          ) : (
            <h3 className="text-gray-800 hover:text-blue-600 transition-colors">
              <Link to="/login">Login</Link>
            </h3>
          )}

          {user ? (
            <div onClick={showMenu}>
              <p className="cursor-pointer relative text-gray-600 hover:text-blue-600 transition-colors">
                <FaBars />
              </p>
              {menu && <Menu />}
            </div>
          ) : (
            <h3 className="text-gray-800 hover:text-blue-600 transition-colors">
              <Link to="/register">Register</Link>
            </h3>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div onClick={showMenu} className="md:hidden text-gray-600 hover:text-blue-600 transition-colors text-lg">
          <p className="cursor-pointer relative">
            <FaBars />
          </p>
          {menu && <Menu />}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
