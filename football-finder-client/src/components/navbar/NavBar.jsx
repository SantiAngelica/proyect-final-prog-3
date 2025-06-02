import { Link } from 'react-router-dom'

function NavBar({ links }) {
    return (
        <nav>
            <ul className='navbar'>
                {links.map(link => (
                    <li key={link.url}>
                        <Link to={link.url}>{link.item}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default NavBar