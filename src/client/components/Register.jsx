import React, {useState} from "react";
import { useNavigate } from "react-router-dom";


export default function Register () {

  const [name, setName] = useState("");  
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [secretKey, setSecretKey] = useState("");

    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [isAdminError, setIsAdminError] = useState(null);

    const navigate = useNavigate();
    

    const registerUser = async (event) => {
        event.preventDefault();
          console.log(`User is ${isAdmin ? 'an Admin' : 'a Regular User'}`);

        //giivng the Admin a secret key
        if (isAdmin === "Admin" && secretKey === "ILDA") {
        setIsAdminError("Invalid Admin");
        return;
        } else {
          setIsAdmin(true);
          setIsAdminError(null);
         
        }
          


        if (email.length < 3) {
            setEmailError("Email must be at least 3 characters in length");
            return;
          } else {
            setEmailError(null);
          }
          
          // form validation: password
          if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters in length");
            return;
          } else {
            setPasswordError(null);
          }

      try {
        const response = await fetch(
          'http://localhost:3000/api/users/register', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'yes'
          },
          body: JSON.stringify({
              name,
              email,
              password,
              isAdmin
          })})
        ;
        const result = await response.json();
        console.log(result)
            navigate('/login');
    
        return result
      } catch (err) {
        console.error(err)
      }    
};

return(
    <>
    <div>
<h2>Don't have an account? Sign Up</h2>
 <form
 method="POST"
 onSubmit={registerUser} 
        onClick={() => {
            setEmail(email)
        }}>
          <div>
            <input 
            type="radio"
            name="userType"
            value="User"
            checked={!isAdmin}
           onChange={(e) => setIsAdmin(e.target.value === "User")}
          />{" "}
          User <input
          type="radio"
          name="userType"
          value="Admin"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.value === "Admin")}
          />{" "}
          Admin 
          </div>
          {isAdmin?
          <div className="mb-3">
            <label>Secret Key</label>
            <input
            type="text"
            className="form-control"
            placeholder="Secret Key"
            onChange={(e) => setSecretKey(e.target.value)}/>
          </div>:null}
<label>
    Name:{""}
    <input 
        placeholder='Enter Name'
        value = {name}
        
         onChange={(e)=> 
        setName(e.target.value)} />
</label>

<label>
    Email:{""}
    <input 
        placeholder='Enter Email'
        value = {email}
        
         onChange={(e)=> 
        setEmail(e.target.value)} />
</label>
{emailError && <p style={{ color: "red"}}>{emailError}</p>} 

<label >
        Password:{""}
         <input 
         placeholder='Create Password'
         type='password'
         value={password}
         onChange={(e)=> 
         setPassword(e.target.value)}/>
      </label>
    
         {passwordError && <p style={{ color: "red"}}>{passwordError}</p>}

         <button  type='Submit' style=
            {{width: "80px", height: "37px", padding: "10px", 
            fontSize:"15px"}}
           
            //onClick={() => {
             //   navigate('/login');
            //}}
            >Register</button>
        
 </form>
 </div>
         </>
 );
};

