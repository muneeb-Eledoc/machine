import { RiDeleteBin5Line } from "react-icons/ri"
import { MdUpdate } from "react-icons/md"

const Row = ({employee, index, setDroppedEmployee}) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <th scope="row" className="flex items-center px-6 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">
     <img className="w-10 h-10 rounded-full mr-2 object-cover" src={employee.imageUrl} alt="" />   {employee.name}
    </th>
    <td className="px-6 py-2">
        Sliver
    </td>
    <td className="px-6 py-2">
        Laptop
    </td>
    <td className="px-6 py-2">
        $2999
    </td>
    <td className="px-6 text-right flex items-center">
       <MdUpdate className='text-2xl cursor-pointer'/>
       <RiDeleteBin5Line className='text-2xl ml-4 cursor-pointer text-red-500' onClick={()=> setDroppedEmployee(employee)}/> 
    </td>
</tr>

  )
}

export default Row