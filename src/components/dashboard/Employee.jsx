import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Employee = ({employee}) => {
  return (
    <SkeletonTheme baseColor="#D0C9C0" highlightColor="#EFEAD8">
        {employee.imageUrl ? <div className="flex h-16 bg-slate-200 px-1 sm:px-3 py-1 rounded-lg m-1 sm:m-2 justify-between items-center">
            <div className="flex items-center h-full">
                <img  className="object-cover border-2 border-purple-600 p-0 sm:p-[2px] mr-2 sm:mr-4 w-12 sm:w-14 h-12 sm:h-14 rounded-full" src={employee.imageUrl} alt="" />
                <div className="flex flex-col">
                    <span className="font-semibold text-sm text-slate-700 sm:text-lg">{employee.name}</span>
                    <span className="font-sm text-slate-500">{employee.email}</span>
                </div>
            </div>
            <div className="flex">
                <button className="bg-blue-700 disabled:bg-slate-400 rounded-md font-medium px-1 py-1 sm:px-2 sm:py-2 text-white hover:bg-blue-800 transition-all text-sm sm:text-base duration-300 active:scale-95">View more</button>
            </div>
        </div> : 
          <div className="flex h-16 bg-slate-200 px-3 py-1 rounded-lg m-2 justify-between items-center">
          <div className="flex items-center h-full">
              <Skeleton height={50} width={50} className='mr-2 sm:mr-4' circle  />
              <div className="flex flex-col">
                  <Skeleton  height={15} width={250}  />
                  <Skeleton  height={15} width={250}  />
              </div>
          </div>
          <div className="flex">
          </div>
      </div>
        }

    </SkeletonTheme>
  )
}

export default Employee