import { Link, useNavigate, useLocation } from "react-router-dom";

const NavBar = ({ links = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bg-black text-white w-screen h-[80px] flex items-center justify-between bg-blur-sm">
      <div className="flex flex-row items-center px-12">
        <Link to="/" className="flex">
          <p className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-900 bg-clip-text text-transparent">
            Football
          </p>
          <p className="text-xl">Finder</p>
        </Link>
      </div>

      <div className="flex items-center px-24">
        <ul className="flex gap-11">
          {links.map((link) => {
            const isActive = location.pathname === link.url;
            return (
              <li key={link.url}>
                <Link
                  to={link.url}
                  className={`text-sm font-semibold transition-colors ${
                    isActive ? "text-blue-400" : "hover:text-blue-400"
                  }`}
                >
                  {link.item}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
