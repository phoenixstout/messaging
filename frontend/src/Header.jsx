import { Link } from "react-router-dom"
import "./stylesheets/Header.css"

export default function Header() {

    const user = localStorage.getItem('user')

    function handleLogout() {
        localStorage.removeItem('x-access-token')
        localStorage.removeItem('user')
        window.location.reload()
    }

    return (
        <nav>
            {user ? <a onClick={handleLogout}>Log out</a>  : <Link to='/login'>Log In</Link>}
        </nav>
    )
}