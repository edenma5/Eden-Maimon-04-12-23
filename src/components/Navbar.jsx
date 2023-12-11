import { NavLink } from "react-router-dom";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <motion.header
        className="navbar__containter relative py-4 2xl:py-7 px-7 2xl:px-14 bg-cyan-800/50 shadow text-slate-50 text-lg 2xl:text-3xl"
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <nav className="flex justify-between">
          <div className="nav__logo font-bold">
            <NavLink to="/">Weather App</NavLink>
          </div>
          <div className="nav__tabs-desktop">
            <ul className="flex gap-4 2xl:gap-10">
              <li>
                <NavLink
                  className="hover:bg-slate-200 hover:text-black px-3 py-2 2xl:px-5 2xl:py-3 rounded-xl transition-all"
                  style={({ isActive, isTransitioning }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                      viewTransitionName: isTransitioning ? "slide" : "",
                    };
                  }}
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="hover:bg-slate-200 hover:text-black px-3 py-2 2xl:px-5 2xl:py-3 rounded-xl transition-all"
                  style={({ isActive, isTransitioning }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                      viewTransitionName: isTransitioning ? "slide" : "",
                    };
                  }}
                  to="/favorites"
                >
                  Favorites
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <div className="navbarSideMenuContainer">
          <HiMenuAlt4 className="menuIcon" onClick={() => setToggle(true)} />

          {toggle && (
            <>
              <motion.div
                className="w-screen h-full bg-gray-600 opacity-20 fixed left-0 top-0 bottom-0 right-0 z-50"
                animate={{ opacity: [0, 0.2] }}
                transition={{ duration: 0.7, ease: "easeIn" }}
              ></motion.div>
              <motion.div
                className="sideMenuContainer bg-slate-400"
                animate={{ x: [160, 0] }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <HiX className="closeIcon" onClick={() => setToggle(false)} />
                <section className="navItemsSideMenu">
                  <NavLink
                    className="hover:bg-slate-200 hover:text-black px-3 py-2 rounded-xl transition-all"
                    style={({ isActive, isTransitioning }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        viewTransitionName: isTransitioning ? "slide" : "",
                      };
                    }}
                    onClick={() => setToggle(false)}
                    to="/"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    className="hover:bg-slate-200 hover:text-black px-3 py-2 rounded-xl transition-all"
                    style={({ isActive, isTransitioning }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        viewTransitionName: isTransitioning ? "slide" : "",
                      };
                    }}
                    onClick={() => setToggle(false)}
                    to="/favorites"
                  >
                    Favorites
                  </NavLink>
                </section>
              </motion.div>
            </>
          )}
        </div>
      </motion.header>
    </>
  );
};

export default Navbar;
