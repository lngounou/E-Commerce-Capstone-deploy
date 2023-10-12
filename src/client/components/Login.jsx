import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
console.log(email)
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  console.log(password)

  const login = async() => {
    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify({
                email,
                password
            })
        });
        const result = await response.json();
        console.log(result)
        setMessage(result.message);
        if(!response.ok) {
          throw(result)
        }
        sessionStorage.setItem('token', result.token)
        sessionStorage.getItem('token', result.token)  
        navigate('/products/');
        setEmail('');
        setPassword('');
    } catch (err) {
        console.error(`${err.name}: ${err.message}`);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div>
      <h2 class='goldfont slightpadding'>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label class='goldfont slightpadding' htmlFor='email'>Email:     </label>
          <input
            class='field'
            type='email'
            id='email'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <br></br>
        <div>
          <label class='goldfont slightpadding' htmlFor='password'>Password:     </label>
          <input
            class='field'
            type='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <br></br>
        <button type='submit' class='sleekbutton'>Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;
