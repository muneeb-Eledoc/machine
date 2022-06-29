import { useState } from "react"
import {BsFillArrowRightSquareFill} from 'react-icons/bs'
import { Link } from "react-router-dom"
import {GoTasklist} from 'react-icons/go'
import {MdSpaceDashboard} from 'react-icons/md'
import { useContext } from "react"
import {AuthContext} from '../../authContext/AuthContext'
import {FaUsers} from 'react-icons/fa'

const Sidebar = ({currentPage}) => {
   const [toggle, setToggle] = useState(false)
   const {dispatch} = useContext(AuthContext)

   const handleLogOut =()=>{
      localStorage.removeItem('currentUser')
      dispatch({
         type: 'LOGOUT'
      })
   }
  
   const links = [
      {
         title: 'Dashboard',
         icon: <MdSpaceDashboard className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>,
         to: '/'
      },
      {
         title: 'Employees',
         icon: <FaUsers className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>,
         to: '/employees'
      },
      {
         title: 'Jobs',
         icon: <GoTasklist className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>,
         to: '/jobs'
      },
   ]
  return (
   <>
    <aside className={`${toggle ? 'left-0' : '-left-72'} fixed w-64 top-[8.5vh] transition-all duration-300 lg:sticky h-[91.5vh] dark:bg-gray-900 z-30`} aria-label="Sidebar" style={{
      boxShadow: '0 0 12px rgba(0,0,0,0.5)',
      clipPath: 'inset(0px -15px 0px 0px)'
    }}>
    <div className="overflow-y-auto py-4 px-3">
       <div>
         <input type="text" placeholder="Search" className="w-full px-3 py-2 bg-slate-600 outline-none mb-3 placeholder-gray-200 text-white rounded-lg" />
       </div>
       <ul className="space-y-2">
         {links.map((link)=>(
          <li>
             <Link to={link.to} className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${currentPage === link.title && 'bg-gray-700'}`}>
                {link.icon}
                <span className="ml-3">{link.title}</span>
             </Link>
          </li>
         ))}
         
          <li>
             <button onClick={handleLogOut} className="w-full text-left flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Log out</span>
             </button>
          </li>
       </ul>
    </div>
 </aside>
  <button className={`left-3 z-40 ${toggle ? 'text-white rotate-180 left-52' : ''} fixed bottom-3 text-3xl transition-all duration-[2s] lg:hidden`} onClick={()=> setToggle(!toggle)}><BsFillArrowRightSquareFill /></button>
   </>
  )
}

export default Sidebar