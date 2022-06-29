import Navbar from '../navbar/Navbar'
import Card from './Card'
import { BsPlusLg } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'
import { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { toast, ToastContainer } from 'react-toastify';
import { addDoc, collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';

const Jobs = () => {
  const [showModal, setShowModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [droppedJob, setDroppedJob] = useState({})

  useEffect(() => {
    const get_Jobs = async()=>{
        const q = query(collection(db, "jobs"));

        const querySnapshot = await getDocs(q);
        const data = []
        querySnapshot.forEach((doc) => {
            data.push({
                ...doc.data(),
                id: doc.id
            })
        });
        setJobs(data)
    }
    get_Jobs()
}, [])

  const handleAddJob = async (e)=>{
    e.preventDefault()
    const form = e.target
    if(form.checkValidity()){
        const formData = new FormData(form)
        const formValues = Array.from(formData.keys()).reduce((acc, key)=>{
            acc[key] = form.elements[key].value
            return acc
        },{})
        const new_Job = {
            ...formValues,
            createdAt: Date.now()
        }
        const docRef = await addDoc(collection(db, "jobs"), new_Job)
        setJobs(pre=> [...pre, {...new_Job, justNow: true, id: docRef.id}])
        toast.success("New Job has been successfully added.")
        form.reset()
    }else{
        const formData = new FormData(form)
        const validationMessages = Array.from(formData.keys()).reduce((acc, key)=>{
            acc[key] = form.elements[key].validationMessage
            return acc
        },{})
        toast.error(validationMessages.name !== ''?
        'Name: '+validationMessages.name : 
        validationMessages.fileName !== '' ?
        'Filename: '+validationMessages.fileName : 
        validationMessages.forwork !== '' ?
        'For Work: '+validationMessages.forwork :
        validationMessages.totalPieces !== ''?
        'Total Pieces: '+validationMessages.totalPieces : null)
    }
  }

  useEffect(()=>{
    if(Object.keys(droppedJob).length === 0) return
   
    async function dropJob(id){
        await deleteDoc(doc(db, 'jobs', id))
        setJobs(pre=> pre.filter(p=> p.id !== id))
        setDroppedJob({})
    }
    dropJob(droppedJob.id)

  },[droppedJob])
  return (
    <div className='bg-gray-100'>
    <Navbar />
    <div className="flex">
        <Sidebar currentPage='Jobs'/>
        <div className="flex-1 flex flex-col">
            <h1 className='text-slate-600 ml-2 mb-2 mt-2 font-medium text-xl'>Jobs</h1>
            <div className="flex flex-wrap justify-center w-full">
                {jobs.sort((j1, j2)=> j2.createdAt - j1.createdAt).map((job, index)=>(
                    <Card job={job} key={job.id} index={index} setDroppedJob={setDroppedJob} />
                ))}
                {jobs.length === 0 && <p className='p-2 mt-2 text-red-600 text-lg font-semibold'>Nothing to show.</p>}
            </div>
        </div>
    </div>
    <div onClick={()=> setShowModal(true)} className="hover:bg-green-700 transition-all duration-300 hover:scale-95 flex fixed bottom-5 right-5 bg-green-600 items-center justify-center p-4 rounded-full cursor-pointer shadow-lg">
       <BsPlusLg  className='text-white sm:text-2xl md:text-3xl text-xl font-bold'/>
    </div>
         {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col h-[84vh] sm:h-[84vh] w-[100vw] sm:w-[360px] bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-xl sm:text-2xl font-semibold">
                                        Add Employee
                                    </h3>
                                    <MdClose className='text-2xl cursor-pointer font-bold text-black' onClick={() => setShowModal(false)} />
                                </div>
                                {/*body*/}
                                <form onSubmit={handleAddJob} noValidate className="relative p-3 sm:p-2 flex-auto flex flex-col overflow-auto h-full">
                                    <div>
                                      <input name="name" required minLength='3' type="text" className='my-2 w-full bg-gray-100 h-12 px-3 rounded-lg text-slate-800' placeholder='Name' />
                                      <input name="fileName" required minLength='8' type="text" className='my-2 w-full bg-gray-100 h-12 px-3 rounded-lg text-slate-800' placeholder='Filename' />
                                      <input name="forwork" required minLength='8' type="text" className='my-2 w-full bg-gray-100 h-12 px-3 rounded-lg text-slate-800' placeholder='For Work' />
                                      <input name="workinprogressby" type="text" className='my-2 w-full bg-gray-100 h-12 px-3 rounded-lg text-slate-800' placeholder='Work Inprogress By' />
                                      <input name="totalPieces" required type="text" className='my-2 w-full bg-gray-100 h-12 px-3 rounded-lg text-slate-800' placeholder='Total pieces' />
                                      <input name="bad" type="text" className='my-2 w-full bg-gray-100 h-12 px-3 rounded-lg text-slate-800' placeholder='Bad' />
                                      <input name="delivery" type="text" className='my-2 w-full bg-gray-100 h-12 px-3 rounded-lg text-slate-800' placeholder='Delivery Date' />
                                      <input name="taskStatus" type="text" className='my-2 w-full bg-gray-100 h-12 px-3 rounded-lg text-slate-800' placeholder='Task Status' />
                                    </div>
                                      <button
                                          className="bg-emerald-500 mt-3 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                          type="submit"
                                      >
                                          Submit Employee
                                      </button>
                                </form>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
                <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
            />
    </div>
  )
}

export default Jobs
