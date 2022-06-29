import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { BsPlusLg } from "react-icons/bs"
import { MdClose } from "react-icons/md"
import { RiSearch2Line } from "react-icons/ri"
import { toast, ToastContainer } from "react-toastify"
import { db } from "../../firebase"
import Navbar from "../navbar/Navbar"
import Sidebar from "../sidebar/Sidebar"
import Row from "./Row"

const Employees = () => {
    const [showModal, setShowModal] = useState(false)
    const [employees, setEmployees] = useState([])
    const [filteredEmployees, setFilteredEmployees] = useState([])
    const [droppedEmployee, setDroppedEmployee] = useState({})

    useEffect(() => {
        const get_Employees = async () => {
            const q = query(collection(db, "employees"), orderBy('createdAt', 'desc'));

            const querySnapshot = await getDocs(q);
            const data = []
            querySnapshot.forEach((doc) => {
                data.push({
                    ...doc.data(),
                    id: doc.id
                })
            });
            setEmployees(data)
            setFilteredEmployees(data)
        }
        get_Employees()
    }, [])


    const handleEmployeeSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        if (form.checkValidity()) {
            const formData = new FormData(form)
            const formValues = Array.from(formData.keys()).reduce((acc, key) => {
                acc[key] = form.elements[key].value
                return acc
            }, {})
            const new_employee = {
                ...formValues,
                createdAt: Date.now()
            }
            await addDoc(collection(db, "employees"), new_employee)
            setEmployees(prev => [...prev, new_employee])
            setFilteredEmployees(prev => [...prev, new_employee])
            toast.success("Employee has successfully added.")
            form.reset()
        } else {
            const formData = new FormData(form)
            const validationMessages = Array.from(formData.keys()).reduce((acc, key) => {
                acc[key] = form.elements[key].validationMessage
                return acc
            }, {})
            toast.error(
                validationMessages.name !== '' ?
                    'Name: ' + validationMessages.name :
                    validationMessages.email !== '' ?
                        validationMessages.email :
                        validationMessages.password !== '' ?
                            validationMessages.password :
                            validationMessages.phone !== '' ?
                                'Phone: ' + validationMessages.phone : null
            )
        }
    }

    useEffect(() => {
        if (Object.keys(droppedEmployee) === 0) return

        async function dropEmployee(id) {
            await deleteDoc(doc(db, 'employees', id))
            setEmployees(emps => emps.filter(e => e.id !== id))
            setDroppedEmployee({})
        }
        dropEmployee(droppedEmployee.id)
    }, [droppedEmployee])

    const handleSearchChange = (e)=>{
        const searchValue = e.target.value.toLowerCase()
        setFilteredEmployees(employees.filter((e)=> !e.name.toLowerCase().indexOf(searchValue)))
    }

    return (
        <div>
            <Navbar />
            <div className="flex">
                <Sidebar currentPage='Employees' />
                <div className="flex-1 bg-gray-100 overflow-y-auto">
                    <h1 className='font-bold text-xl pl-3 pt-3 box-border text-slate-600 h-[7vh] static'>Employees</h1>
                    <div onClick={() => setShowModal(!showModal)} className="hover:bg-green-700 transition-all duration-300 hover:scale-95 flex fixed bottom-5 right-5 bg-green-600 items-center justify-center p-4 rounded-full cursor-pointer shadow-lg z-50">
                        <BsPlusLg className='text-white sm:text-2xl md:text-3xl text-xl font-bold' />
                    </div>
                    <div className="relative overflow-x-auto shadow-md pb-3 min-h-[84.5vh]">
                        <div className="flex items-center px-2 border-[5px] bg-gray-600 focus-within:bg-gray-500 border-gray-700 mx-1 sm:mx-2 w-64">
                            <RiSearch2Line className="text-xl text-white self-center"/>
                            <input type="text" onChange={handleSearchChange} className="placeholder-gray-300 text-white outline-none flex-1 px-2 py-2 bg-transparent" placeholder="Search..." />
                        </div>
                        <table className="sm:rounded-lg w-full box-border mx-1 sm:mx-2 text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Color
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEmployees.sort((e1, e2) => e1.createdAt - e2.createdAt).map((employee, index) => (
                                    <Row employee={employee} index={index} key={employee.id} setDroppedEmployee={setDroppedEmployee} />
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
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
                                    <h3 className="text-2xl font-semibold">
                                        Add Employee
                                    </h3>
                                    <MdClose className='text-2xl cursor-pointer font-bold text-black' onClick={() => setShowModal(false)} />
                                </div>
                                {/*body*/}
                                <form noValidate onSubmit={handleEmployeeSubmit} className="relative p-3 sm:p-2 flex-auto flex flex-col overflow-auto">
                                    <input name="name" required minLength='3' type="text" className='my-2 w-full bg-gray-100 h-12 px-3 rounded-lg text-slate-800' placeholder='Name' />
                                    <input name="email" required type="email" className='my-2 w-full bg-gray-100 h-12 px-3 rounded-lg text-slate-800' placeholder='Email' />
                                    <input name="password" required minLength='8' type="password" className='my-2 w-full bg-gray-100 h-12 px-3 rounded-lg text-slate-800' placeholder='Password' />
                                    <input name="phone" required minLength='11' maxLength='11' type="text" className='my-2 w-full bg-gray-100 h-12 px-3 rounded-lg text-slate-800' placeholder='Phone' />
                                    <input name="imageUrl" type="text" className='my-2 w-full bg-gray-100 h-12 px-3 rounded-lg text-slate-800' placeholder='Image url e.g http://yourimage.png' />
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

export default Employees