import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const { isLoggedIn, isLoading } = useAuth();
  if (isLoading) {
    return (
      <section className="flex items-center justify-center h-screen">
        <div className="w-[100px] h-[100px] border-8 border-t-8 border-blue-600 border-solid rounded-full animate-spin">
          Loading...
        </div>
      </section>
    );
  }

  return (
    <nav className="fixed top-0 right-0 w-full bg-gray-900 text-white z-50">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="text-2xl font-bold">Mohit Singh</div>

        <button
          className="text-2xl sm:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <div className="space-y-1.5">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </button>
        <ul className="hidden sm:flex space-x-8 text-lg font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-indigo-500 font-bold" : "hover:text-indigo-500"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-indigo-500 font-bold" : "hover:text-indigo-500"
              }
            >
              Contact
            </NavLink>
          </li>
          {isLoggedIn ? (
            <li>
              <NavLink
                to="/logout"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-500 font-bold"
                    : "hover:text-indigo-500"
                }
              >
                Logout
              </NavLink>
            </li>
          ) : (
            <>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "text-indigo-500 font-bold"
                      : "hover:text-indigo-500"
                  }
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-indigo-500 font-bold"
                      : "hover:text-indigo-500"
                  }
                >
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-gray-800 py-4 px-6">
          <ul className="space-y-4 text-lg font-medium">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-500 font-bold"
                    : "hover:text-indigo-500"
                }
                onClick={toggleMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-500 font-bold"
                    : "hover:text-indigo-500"
                }
                onClick={toggleMenu}
              >
                Contact
              </NavLink>
            </li>
            {!isLoggedIn ? (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-indigo-500 font-bold"
                        : "hover:text-indigo-500"
                    }
                    onClick={toggleMenu}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive
                        ? "text-indigo-500 font-bold"
                        : "hover:text-indigo-500"
                    }
                    onClick={toggleMenu}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/logout"
                  className={({ isActive }) =>
                    isActive
                      ? "text-indigo-500 font-bold"
                      : "hover:text-indigo-500"
                  }
                  onClick={toggleMenu}
                >
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
