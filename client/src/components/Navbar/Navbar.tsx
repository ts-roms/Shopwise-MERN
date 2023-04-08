import { NavLink } from "react-router-dom";
import navItems from "../../constant/navItems.json";
import style from "../../styles/style";

export default function Navbar() {
  return (
    <nav className={`${style.flex_normal} gap-8 font-medium`}>
      {navItems &&
        navItems?.map((nav, idx) => (
          <NavLink
            to={nav.url}
            key={idx}
            className={({ isActive }) =>
              isActive
                ? "text-black"
                : "text-white hover:text-gray-800 transition-all"
            }
          >
            {nav.title}
          </NavLink>
        ))}
    </nav>
  );
}
