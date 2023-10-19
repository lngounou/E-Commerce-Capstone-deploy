import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AllUsers() {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = sessionStorage.getItem('token');
    const isAdmin = sessionStorage.getItem('admin');
    //const navigate = useNavigate();

    useEffect(() => {
        async function fetchAllUsers() {
            try {
                const response = await fetch('http://localhost:3000/api/users/')
                const result = await response.json();
                console.log(result);
                if (result) {
                    setUsers(result); // set users to result.data if it's an array
                } else {
                    setError('Fetched data is not in expected format.');
                }
            } catch (error) {
                console.error(error);
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        }
        fetchAllUsers();
    }, []);

    //if (loading) return <div>Loading...</div>;
    //if (error) return <div>Error: {error}</div

    return (
        <div >
            <div class='goldfont slightpadding'>
            <h1>Users Information </h1></div>

            { users?.users && users.users.map(user => 
                <div key={user.id}  className='usercard'>
                    <p>Id: {user.id}</p>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Password: {user.password}</p>
                    <p>Isadmin: {user.isadmin}</p>
                </div>
            )}
        </div>
    );
}

       
            
                