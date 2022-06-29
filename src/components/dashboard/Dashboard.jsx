import { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import Chart from 'react-apexcharts'
import Employee from './Employee'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase'

const Dashboard = () => {
   const [employees, setEmployees] = useState([1,2,3,4,5])
   const [chartPropertites, setChartPropertites] = useState({
    options: {},
    series: [44, 55, 41, 17, 15],
    labels: ['A', 'B', 'C', 'D', 'E']
  })

  useEffect(() => {
    async function get_Recent_Employees(){
      const q = query(collection(db, 'employees'), orderBy("name", "desc"), limit(5));
      const querySnapshot = await getDocs(q);
      const data = []
      querySnapshot.forEach((doc) => {
        data.push({
          ...doc.data(),
          id: doc.id
        })
      });
      setEmployees(data)
    }
    get_Recent_Employees()
  }, [])
  
  return (
    <div>
        <Navbar />
        <div className="flex">
          <Sidebar currentPage='Dashboard' />
         <div className='lg:flex-1 w-full lg:w-auto bg-gray-50'>
           <h1 className='pl-2 pt-2 md:p-1 font-medium title-font text-base sm:text-lg md:text-xl text-slate-600 lg:p-2'>Dashboard</h1>
           <div className="flex mt-1 lg:mt-2 px-2 flex-col items-center md:flex-row">

            <div className="relative flex bg-blue-400 my-2 md:my-0 flex-col box-border w-full mx-2 md:mx-3 lg:mx-4 rounded-lg shadow-lg px-2 py-2">
              <h1 className='absolute -top-2 -left-2 bg-purple-400 px-3 py-1 rounded-full font-medium title-font text-base sm:text-lg md:text-xl text-slate-700'>Machine</h1>
                  <div className='w-full flex justify-center'>
                    <img className='h-[220px]' src="https://cdn-icons-png.flaticon.com/512/3079/3079166.png" alt="" />
                  </div>
                  <div className="mx-1 flex justify-between my-2">
                    <span className='text-slate-900 font-semibold text-lg md:xl px-3 rounded-full shadow-lg flex items-center bg-gray-50'>Machine Power</span>
                    <span className='text-base font-semibold px-3 rounded-full shadow-lg flex items-center bg-gray-50 '>OFF</span>
                  </div>
                  <div className="mx-1 flex justify-between my-2">
                    <span className='text-slate-900 font-semibold text-lg md:xl px-3 rounded-full shadow-lg flex items-center bg-gray-50'>Machine Status</span>
                    <span className='text-base font-semibold px-3 rounded-full shadow-lg flex items-center bg-gray-50 '>REST</span>
                  </div>
              </div>

              <div className="relative flex justify-center items-center bg-slate-200 my-2 md:my-0 box-border flex-col w-full h-[320px] mx-2 md:mx-2 lg:mx-4 rounded-lg shadow-lg px-2 py-2">
              <h1 className='absolute -top-2 -left-2 bg-purple-400 px-3 py-1 rounded-full font-medium title-font text-base sm:text-lg md:text-xl text-slate-700'>Graph</h1>
              <Chart options={chartPropertites.options} series={chartPropertites.series} type="pie" className='w-full lg:p-2' height={'280'} />
              </div>
           </div>

           <h1 className='pl-3 mt-2 font-medium title-font text-base sm:text-lg md:text-xl text-slate-600 md:p-1 lg:p-2'>Recently Added Employees</h1>
            <div className="flex">
              <div className="flex w-full flex-col p-2 bg-gray-100">
                {employees.map((employee)=>(
                    <Employee key={employee.id} employee={employee} />               
                ))}
              </div>
            </div>

         </div>
        </div>
      </div>
  )
}

export default Dashboard