import { css } from "@emotion/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../authContext/AuthContext";
import { auth } from "../../firebase";

const Login = () => {
  const {dispatch, new1} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const email = useRef();
  const password = useRef();
  console.log(new1)
  const navigate = useNavigate()
  const override = css`
    display: block;
    margin: 0 auto;
    border: 3px solid black;
  `;

  const handleLogin = (e)=>{
    e.preventDefault()
    const form = e.target;
    if(form.checkValidity()){
        setLoading(true)
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch({type:'LOGIN', payload: user})
          navigate('/')          
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          toast.error(error.message)
          setLoading(false)
        });
    }else{
      const formData = new FormData(form)
        const validationMessages = Array.from(formData.keys())
          .reduce((acc, key) => {
            acc[key] = form.current.elements[key].validationMessage
            return acc
          }, {})
          toast.error(
            validationMessages.email !== '' ?
            validationMessages.email :
            validationMessages.password !== '' ?
            validationMessages.password : null
          )
    }
  }

  return (
    <div className="flex justify-center items-center bg-gray-800 h-[100vh]">
       <div className="bg-gray-300 w-full sm:w-[380px] h-[340px] sm:rounded-md shadow-sm shadow-slate-50">
           <h1 className="text-center text-gray-900 font-bold p-3 text-2xl mt-2">Login</h1>
           <form noValidate className="flex flex-col py-2 px-4" onSubmit={handleLogin}>
               <input ref={email} name="email" type="email" className="mt-1 mb-3 p-3 outline-none rounded-md border-2 border-white focus:border-slate-800" placeholder="Email / Username"/>
               <input ref={password} name='password' type="password" className="my-3 p-3 outline-none rounded-md border-2 border-white focus:border-slate-800" placeholder="password" />
               <button disabled={loading} className="my-3 bg-blue-700 disabled:bg-slate-400 rounded-md font-bold px-2 py-3 text-white hover:bg-blue-800 transition-all text-lg duration-300 active:scale-95">
               {loading ? 
                <ClipLoader loading={loading} css={override} />
                :'Let me in'}
               </button>
           </form>    
           <p className='px-4 text-slate-600 '>Create account?<Link className='text-blue-700 font-medium' to='/signup'>Sign up</Link></p>
           <ToastContainer
              position="top-right"
              autoClose={6000}
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

export default Login