import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import { useState } from 'react'
import RefreshHandler from './RefreshHandler'
import Dashboard from './pages/Dashboard'

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({ element})=>{
    return isAuthenticated ? element : <Navigate to="/login"/>
  }

  return (
    <div className='app'>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to ="/login"/>}/>

        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>  {/*just to test*/}


        <Route path='/home' element={ <PrivateRoute element={ <Home />}/> } />
        <Route path='/dashboard' element={ <PrivateRoute element={ <Dashboard />}/> } />

      </Routes>
    </div>
  )
}

export default App
