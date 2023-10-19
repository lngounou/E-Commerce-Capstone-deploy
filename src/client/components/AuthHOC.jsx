import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthHoc = (WrappedComponent) => {
    return () => {
        const navigate = useNavigate();
        const [isAuthenticated, setIsAuthenticated] = useState(null);
        const [user,setUser] = useState(null);

        useEffect(() => {
            // Check user authentication here by making a request to your backend
            const token = sessionStorage.getItem('token');
            console.log("Auth HOC")
            if (!token) {
                // If there is no token in session storage, the user is not authenticated
                setIsAuthenticated(false);
                navigate('/login');
            } else {
                console.log("making request")
                fetch('http://localhost:3000/api/users/protected', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(res=>res.json())
                    .then((res) => {
                        console.log("response ",res)
                        if (res) {
                            setIsAuthenticated(true);
                        } else {
                            setIsAuthenticated(false);
                            //navigate('/login');

                        }
                    })
                    .catch((err) => {
                        console.log("error ",err)
                        setIsAuthenticated(false);
                        //navigate('/login');

                    });
            }
        }, []);

        return isAuthenticated === null ? null : (
            // Render the wrapped component if authenticated, or null if not authenticated
            isAuthenticated ? <WrappedComponent /> : null
        );
    };
};

export default AuthHoc;
