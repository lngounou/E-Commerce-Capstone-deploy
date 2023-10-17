import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../style.css'

const Navbar = () => {
    const auth = sessionStorage.getItem('token');
    console.log(auth)
    const navigate = useNavigate();
    const logout = () => {
        sessionStorage.clear();
        navigate('/login')
      }

    if (auth) {
        return (
            <div className='navbar brighttext'>
                <div><Link to={'/products'}>Products</Link></div>
                <div><Link to={'/cart'}>Cart</Link></div>
                <div><Link onClick={logout} to='/login'>Log Out</Link></div>
            </div>
        )
    } else {
        return (
        <div className='navbar brighttext'>
            <div><Link to={'/'}>Home</Link></div>
            <div><Link to={'/products'}>Products</Link></div>
            <div><Link to={'/register'}>Register</Link></div>
            <div><Link to={'/login'}>Sign In</Link></div>
        </div>
        )
    }
}

export default Navbar;