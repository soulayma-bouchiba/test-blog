import React,{useState} from 'react';
import {useDispatch} from "react-redux"
import { useHistory } from 'react-router-dom';
import {registerUser} from '../../JS/Actions/userActions'
import './register.css'

const Register = () => {
    const dispatch = useDispatch()  
    const history = useHistory()

    const [name,setName]=useState("");
    const [lastName,setLastName]=useState("")
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("")
    
    const handleRegister = ()=>{
      const newUser ={name,lastName,email,password}
      dispatch(registerUser(newUser))
     history.push("/")
      setName("")
      setLastName("")
      setEmail("")
      setPassword("")
    }
  
    return (
      <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleRegister}>

      <label>First Name </label>
          <input  className="registerInput" name="email" type="text" placeholder="Enter first name"  value={name} onChange={(e)=>setName(e.target.value)}/>
  
      <label>Last Name</label>
          <input  className="registerInput" name="email" type="text" placeholder="Enter last name"  value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
   
    <label>Email address</label>
          <input  className="registerInput" name="email" type="email" placeholder="Enter email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
  
    <label>Password</label>
    <input className="registerInput" name="password" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
  
 <button className="registerButton" type="submit">
             Login
             </button>
      </form>
</div>
    );
}

export default Register