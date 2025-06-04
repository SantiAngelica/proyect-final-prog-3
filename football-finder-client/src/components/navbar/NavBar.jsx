import { Link, useNavigate, useLocation } from "react-router-dom";

const NavBar = ({ links = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-screen h-[60px] z-50 flex items-center justify-between px-12 text-white backdrop-blur-md bg-black/30 border-b border-white/10 shadow-md">
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
                  className={`relative text-sm font-semibold transition-colors duration-300 
    ${isActive ? "text-blue-400" : "hover:text-white"} 
    after:absolute after:left-0 after:top-1/3 after:translate-y-1/2 after:rounded-full
    after:h-[2px] after:bg-blue-400 after:w-0 hover:after:w-full 
    after:transition-all after:duration-500`}
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
