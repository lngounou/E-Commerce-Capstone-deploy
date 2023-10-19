import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import Register from './components/Register';
import Login from './components/Login';
import { Routes, Route, useParams } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import AllProducts from './components/ProductsUnauth';
import SingleProduct from './components/SingleProduct';
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AuthProducts from './components/ProductsAuth';
import CreateProduct from './components/CreateProduct';
import UsersList from './components/UsersList';


function App() {

  const auth = sessionStorage.getItem('token');
const [users, SetUser] = useState("")
console.log(users)
useEffect(() => {}, [users])
  return (
    <>
      <Navbar  users= {users} SetUser={SetUser}/>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/addproduct' element={<Login />} />
        <Route path='/login' element={<Login users= {users} SetUser={SetUser}/>} />
        <Route path='/register' element={<Register users= {users} SetUser={SetUser} />} />
        <Route path='/products' element={ auth ? <AuthProducts users= {users}/> : <AllProducts />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/createproduct' element={<CreateProduct />} />
        <Route path='/userslist' element={<UsersList />} />
        <Route path='/products/:productId' element={<SingleProduct />} />
        <Route path="/checkout" element={<Checkout />} />
        
        
      </Routes>
    </>
  );
}

/* <Route path='/products' element= {auth ? <AuthProducts /> : <UnauthProducts />} /> */

export default App;
