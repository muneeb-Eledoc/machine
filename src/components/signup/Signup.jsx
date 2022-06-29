import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRef, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { toast, ToastContainer } from 'react-toastify'
import { css } from "@emotion/react";
import 'react-toastify/dist/ReactToastify.css'
import { auth, db } from '../../firebase'
import { Link } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';

const Signup = () => {
  const [loading, setLoading] = useState(false)
  const name = useRef(null)
  const email = useRef(null)
  const password = useRef(null)
  const form = useRef()

  const override = css`
  display: block;
  margin: 0 auto;
  border: 3px solid black;
`;

  const handleSignUP = async (e)=>{
      e.preventDefault()
       if(e.target.checkValidity()){
         setLoading(true)
         createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then(async (userCredential) => {
            const user = userCredential.user;
            if(user){
                await addDoc(collection(db, "admins"), {
                  email: email.current.value,
                  name: name.current.value
              });
            }
            setLoading(false)
          })
          .catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage)
            setLoading(false)
          });
        }else{
        const formData = new FormData(e.target)
        const validationMessages = Array.from(formData.keys())
          .reduce((acc, key) => {
            acc[key] = form.current.elements[key].validationMessage
            return acc
          }, {})
          toast.error(
            validationMessages.name !== '' ? 
            'Name: '+validationMessages.name :
            validationMessages.email !== '' ?
            validationMessages.email :
            validationMessages.password !== '' ?
            validationMessages.password : null
          )
      }
  }

  return (
    <div className="flex justify-center items-center bg-gray-800 h-[100vh]">
    <div className="bg-gray-300 w-full sm:w-[380px] h-[400px] sm:rounded-md shadow-sm shadow-slate-50">
        <h1 className="text-center text-gray-900 font-bold p-3 text-2xl mt-2">Sign up</h1>
        <form ref={form} noValidate className="flex flex-col px-4 py-3" onSubmit={handleSignUP}>
            <input ref={name} required name='name' type="text" minLength='3' className="mt-1 mb-3 p-3 outline-none rounded-md border-2 border-white focus:border-slate-800" placeholder="Full Name" />
            <input ref={email} required name='email' type="email" className="mt-1 mb-3 p-3 outline-none rounded-md border-2 border-white focus:border-slate-800" placeholder="Email / Username"/>
            <input ref={password} name='password' type="password" minLength='8' maxLength='30' className="my-3 p-3 outline-none rounded-md border-2 border-white focus:border-slate-800" placeholder="password" />
            <button type='submit' disabled={loading} className="mt-3 bg-blue-700 rounded-md font-bold px-2 py-3 text-white hover:bg-blue-800 transition-all text-lg duration-300 active:scale-95 disabled:bg-slate-500">
              {loading ? 
              <ClipLoader loading={loading} css={override} />
                :'Create account'}
            </button>
        </form>
        <p className='px-4 text-slate-600 '>Already have an account?<Link className='text-blue-700 font-medium' to='/login'>Log in</Link></p>
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
 </div>
  )
}

export default Signup