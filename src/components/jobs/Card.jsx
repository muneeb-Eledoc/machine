
const Card = ({job, setDroppedJob}) => {
  return (
    <div className="relative shadow-lg mt-5 mx-2 flex bg-white flex-col p-3 w-full sm:w-80 md:w-80 lg:w-[340px] xl:[450px] rounded-md">
      <div>
        {job.justNow && <span className="absolute -top-1 -left-1 px-2 py-[3px] bg-pink-600 shadow-md text-gray-100 rounded-full text-sm">New</span>}
      </div>
      <div className="flex justify-between w-full border-b-[1px] border-gray-400 pb-1 mb-1 mt-3">
        <span className='font-semibold text-base sm:text-lg'>Name</span>
        <span className='text-gray-700'>{job.name}</span>
      </div>
      <div className="flex justify-between w-full border-b-[1px] border-gray-400 pb-1 mb-1">
        <span className='font-semibold text-base sm:text-lg'>Filename</span>
        <span className='text-gray-700'>{job.fileName}</span>
      </div>
      <div className="flex justify-between w-full border-b-[1px] border-gray-400 pb-1 mb-1">
        <span className='font-semibold text-base sm:text-lg'>For work</span>
        <span className='text-gray-700'>{job.forwork}</span>
      </div>
      <div className="flex justify-between w-full border-b-[1px] border-gray-400 pb-1 mb-1">
        <span className='font-semibold text-base sm:text-lg'>Work Inprogress by</span>
        <span className='text-gray-700'>{job.workinprogressby}</span>
      </div>
      <div className="flex justify-between w-full border-b-[1px] border-gray-400 pb-1 mb-1">
        <span className='font-semibold text-base sm:text-lg'>Total pieces</span>
        <span className='text-gray-700'>{job.totalPieces}</span>
      </div>
      <div className="flex justify-between w-full border-b-[1px] border-gray-400 pb-1 mb-1">
        <span className='font-semibold text-base sm:text-lg'>Bad</span>
        <span className='text-gray-700'>{job.bad}</span>
      </div>
      <div className="flex justify-between w-full border-b-[1px] border-gray-400 pb-1 mb-1">
        <span className='font-semibold text-base sm:text-lg'>Delivery Date</span>
        <span className='text-gray-700'>{job.delivery}</span>
      </div>
      <div className="flex justify-between w-full border-b-[1px] border-gray-400 pb-1 mb-1">
        <span className='font-semibold text-base sm:text-lg'>Task Status</span>
        <span className='text-gray-700'>{job.taskStatus}</span>
      </div>

      <div className="flex justify-between mt-3">
        <button className="bg-blue-700 py-1 px-3 text-white rounded-md font-semibold hover:bg-blue-800">Update</button>
        <button className="bg-red-600 py-1 px-3 rounded-md text-white font-semibold hover:bg-red-700" onClick={()=>{
          setDroppedJob(job)
        }}>Delete</button>
      </div>
    </div>
  )
}

export default Card
