import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const isActive = true;

  return (
    <div className='flex flex-row gap-4 place-content-between my-2 bg-#fafcfe shadow-sm'>
      <NavLink to="/" className={"text-blue-900 font-bold text-2xl pl-2"}>
        QuickPaste
      </NavLink> 

      <div>

        <NavLink
          to="/" className={"text-blue-950 p-1 px-2   hover:text-blue-800 active:bg-blue-200 transition-all duration-200 rounded-md"}>
          Home
        </NavLink>

        <NavLink
          to="/pastes" className={`text-blue-950 p-1 px-4   hover:text-blue-800 active:bg-blue-200 rounded-md transition-all duration-200`}>
          Pastes
        </NavLink>

      </div>
      
    </div>
  )
}

export default Navbar
