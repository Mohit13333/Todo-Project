import React from 'react'
import { FaHome, FaRegListAlt, FaUser } from 'react-icons/fa'
import {FaMessage} from 'react-icons/fa6'
import { NavLink, Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <>
      <header className="bg-gray-900 text-white py-4 w-full">
  <div className="px-6">
    <nav>
      <ul className="flex space-x-8 justify-center">
        {/* Users Navigation Link */}
        <li className="flex items-center">
          <NavLink
            to="/admin/users"
            className="flex items-center space-x-2 hover:text-blue-400"
          >
            <FaUser className="text-xl" />
            <span className="font-medium">Users</span>
          </NavLink>
        </li>
        
        {/* Contacts Navigation Link */}
        <li className="flex items-center">
          <NavLink
            to="/admin/contacts"
            className="flex items-center space-x-2 hover:text-blue-400"
          >
            <FaMessage className="text-xl" />
            <span className="font-medium">Contacts</span>
          </NavLink>
        </li>

        {/* Services Navigation Link */}
        <li className="flex items-center">
          <NavLink
            to="/admin/services"
            className="flex items-center space-x-2 hover:text-blue-400"
          >
            <FaRegListAlt className="text-xl" />
            <span className="font-medium">Services</span>
          </NavLink>
        </li>

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

{/* Content Section */}
<Outlet />

    </>
  )
}

export default Admin
