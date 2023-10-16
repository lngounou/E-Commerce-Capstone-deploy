import React from 'react';
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

function App() {

  return (
    <>
      <Navbar />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/addproduct' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products' element={<AuthProducts />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/products/:productId' element={<SingleProduct />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

/* <Route path='/products' element= {auth ? <AuthProducts /> : <UnauthProducts />} /> */

export default App;
