import { useState } from 'react';
import reactLogo from './assets/react.svg';
import Register from './components/Register';
import Login from './components/Login';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';



function App() {
  const [user, setUser] = useState(null);
  const auth = sessionStorage.getItem('token');

  return (
  <>
    <div>
        <Navbar />
        <Routes>

        <Route path='/' element= {<Home />} />
        <Route path ='/addproduct' element= {<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/product/:id' element={<Login />} />

        </Routes>
    </div>
    </>
  )
}

{/* <Route path='/products' element= {auth ? <AuthProducts /> : <UnauthProducts />} /> */}

export default App;
