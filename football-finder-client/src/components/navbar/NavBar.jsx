// components/NavBar.jsx
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ links = [] }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-black text-white w-screen h-[80px] flex items-center justify-between">
      <div className="flex flex-row items-center  px-12">
        <p className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-900 bg-clip-text text-transparent">
          Football
        </p>
        <p className="text-xl">Finder</p>
      </div>

      <div className="flex items-center px-12">
        <ul className="flex gap-12">
          {links.map((link) => (
            <li key={link.url}>
              <Link
                to={link.url}
                className="text-md font-semibold hover:text-blue-400 transition-colors"
              >
                {link.item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
