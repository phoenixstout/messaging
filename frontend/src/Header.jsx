import { Link } from "react-router-dom"
import "./stylesheets/Header.css"

export default function Header() {

    const user = localStorage.getItem('user')

    function handleLogout() {
        localStorage.removeItem('x-access-token')
        localStorage.removeItem('user')
        window.location.reload()
    }

   if(user) {
    return (
        <nav className="header">
            <Link to={'/'}>Home</Link>
            <Link to={'/friends'}>Friends</Link>
            <a href="" onClick={handleLogout}>Log Out</a>
        </nav>
    )
   }

   else {
    return (
        <nav className="header">
            <Link to={'/login'}>Login</Link>
        </nav>
    )
   }
}