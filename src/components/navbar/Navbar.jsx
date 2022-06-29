import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdArrowDropdown, IoMdLogOut } from 'react-icons/io'
import { useContext } from 'react'
import { AuthContext } from '../../authContext/AuthContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <>
      <header style={{backgroundColor: 'rgb(51 65 85 / 0.85'}} className="backdrop-blur-sm sticky z-40 top-0 text-gray-600 w-full body-font h-[8.5vh] shadow-lg">
        <div className="flex px-1 sm:px-3 md:px-4 items-center justify-between h-full w-full">
          <Link to='/' className="text-lg sm:text-2xl text-white flex title-font font-medium items-center">
             <img src="https://cdn-icons-png.flaticon.com/512/1118/1118325.png" className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mr-1 sm:mr-2 p-[1px] object-fill bg-slate-50 rounded-full' alt="" />
             Machine
          </Link>
      
          <div className="group relative">
            <button className="inline-flex items-center bg-gray-500 border-0 py-1 px-1 lg:px-3 focus:outline-none hover:bg-gray-600 rounded text-sm sm:text-base">
              <span className='text-white hidden lg:block'>{currentUser.email}</span>
                <IoMdArrowDropdown className='text-white group-hover:rotate-180 transition-all duration-300' />
            </button>
             <ul className='hidden group-hover:block right-0 absolute p-2 bg-gray-600 rounded-md shadow-lg'>
              <li className='text-white flex items center my-1 px-2 py-1 hover:bg-gray-500 cursor-pointer lg:hidden'><span className='text-white lg:hidden'>{currentUser.email}</span></li>
              <li className='text-white flex items-center my-1 px-2 py-1 hover:bg-gray-500 cursor-pointer'>
                <IoMdLogOut className='mr-1' /> Log out</li>
             </ul>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar