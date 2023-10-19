import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../style.css'

const Navbar = ({users, SetUser}) => {
    const auth = sessionStorage.getItem('token');
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true'
    console.log(users)
   
    const navigate = useNavigate();
    const logout = () => {
        sessionStorage.clear();
        navigate('/login');
        location.reload();
      }
useEffect (() => {
   
    console.log(isAdmin)
}, [users])
      return (
        <div className='navbar brighttext'>
            <div><Link to={'/'}>Home</Link></div>
            <div><Link to={'/products'}>Products</Link></div>
            
            {auth && <div><Link to={'/cart'}>Cart</Link></div>}
            
            
            {isAdmin && <div><Link to={'/createproduct'}>Create Product</Link></div>}
            {isAdmin && <div><Link to={'/userslist'}>User List</Link></div>}
            
            {auth && <div><Link onClick={logout} to='/login'>Log Out</Link></div>}
            
          {!auth && <>
                <div><Link to={'/register'}>Register</Link></div>
                <div><Link to={'/login'}>Sign In</Link></div>
            </>}
        </div>
    );
}

export default Navbar;



//console.log(isAdmin, 'This is admin')
//     if (auth) {
//         return (
//             <div className='navbar brighttext'>
//                 <div><Link to={'/products'}>Products</Link></div>
//                 <div><Link to={'/cart'}>Cart</Link></div>
//                 <div><Link to={'/createproduct'}>Create Product</Link></div>
//                 <div><Link to={'/userslist'}>User List</Link></div>
//                 <div><Link onClick={logout} to='/login'>Log Out</Link></div>
//             </div>
//         )
//     } else {
//         return (
//         <div className='navbar brighttext'>
//             <div><Link to={'/'}>Home</Link></div>
//             <div><Link to={'/products'}>Products</Link></div>
//             <div><Link to={'/register'}>Register</Link></div>
//             <div><Link to={'/login'}>Sign In</Link></div>
//         </div>
//         )
//     }
// }
