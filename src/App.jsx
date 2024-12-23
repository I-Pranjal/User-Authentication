import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import { useState } from 'react';
import Login from './Pages/login'
import Signup from './Pages/signup';
import Home from './Pages/home';

function App() {
            const [Uname , setUName ] = useState(""); 
    
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login setUname={setUName} />} />
        <Route path='/signup' element={<Signup setUname={setUName}/>} />
        <Route path='/home' element={<Home Uname={Uname}/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
