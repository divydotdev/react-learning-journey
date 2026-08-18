import { NavLink, Link } from "react-router-dom";
import "../css/Navbar.css"

function NavBar() {
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/">CineMax</Link>
        </div>
        <div className="navbar-links">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} end>
                Home
            </NavLink>
            <NavLink to="/favorites" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                Favorites
            </NavLink>
        </div>
    </nav>
}

export default NavBar