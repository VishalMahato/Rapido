import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Start from './pages/Start'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Start/>}/>
      <Route path='/home' element={
        <UserProtectWrapper>
          <Home/>
        </UserProtectWrapper>
      }/>
      
      <Route path='/logout' element={
         <UserProtectWrapper>
          <UserLogout/>
         </UserProtectWrapper>
        }/>
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/signup' element={<UserSignup/>}/>
      <Route path='/captain-login' element={<CaptainLogin/>}/>
      <Route path='/captain-signup' element={<CaptainSignup/>}/>
    </Routes>
  )
}

export default App
