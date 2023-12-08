import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="p-4 bg-slate-100 ">
      <nav className="flex justify-between">
        <div className="nav__logo capitalize font-bold text-lg">
          <NavLink to="/">abra weather app</NavLink>
        </div>
        <div className="nav__tabs">
          <ul className="flex gap-4">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/favorites">Favorites</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
