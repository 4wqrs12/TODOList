import { Link } from "react-router-dom";
import logo from "../assets/space-logo.png";

function NavBar() {
  return (
    <nav className="bg-neutral-400 text-white font-bold px-4 py-4">
      <div className="flex items-center justify-strech gap-4">
        <img src={logo} alt="Company Logo" className="h-10"></img>
        <div className="flex gap-8 justify-center">
          <Link
            to="/"
            className="transition duration-50 hover:bg-neutral-500 rounded-lg px-2 py-1 scale-105"
          >
            Home {"  "}
          </Link>
          <Link
            to="/contact"
            className="transition duration-50 hover:bg-neutral-500 rounded-lg px-2 py-1 scale-105"
          >
            Contact {"  "}
          </Link>
          <Link
            to="/about"
            className="transition duration-50 hover:bg-neutral-500 rounded-lg px-2 py-1 scale-105"
          >
            About {"  "}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
