import { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContext } from './authContext/AuthContext';
import Dashboard from './components/dashboard/Dashboard';
import Employees from './components/employees/Employees';
import Graph from './components/graph/Graph';
import Jobs from './components/jobs/Jobs';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';

function App() {
  const {currentUser} = useContext(AuthContext)

  const RequiredRoute = ({children})=>{
    return currentUser ? children : <Navigate to='/login' />
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
           <Route path='/' element={<RequiredRoute><Dashboard /></RequiredRoute>} />
           <Route path='/login' element={<Login />} />
           <Route path='/signup' element={<Signup />} />
           <Route path='/jobs' element={<Jobs />} />
           <Route path='/employees' element={<Employees />} />
           <Route path='/graph' element={<Graph />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
