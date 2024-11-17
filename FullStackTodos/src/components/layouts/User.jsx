import React from "react";
import { FaHome} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const User = () => {
  return (
    <>
      <header className="bg-gray-900 text-white py-4 w-full">
        <div className="px-6">
          <nav>
            <ul className="flex space-x-8 justify-center">
              {/* Home Navigation Link */}
              <li className="flex items-center">
                <NavLink
                  to="/"
                  className="flex items-center space-x-2 hover:text-blue-400"
                >
                  <FaHome className="text-xl" />
                  <span className="font-medium">Home</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default User;
