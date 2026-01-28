import {Link} from "react-router-dom"

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>
            <h1>Lista de peliculas</h1>
        </header>
    )
}

export default Header