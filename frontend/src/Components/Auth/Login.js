import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import {  useHistory } from 'react-router-dom';
import {loginUser} from "../../JS/Actions/userActions"
import './login.css'


const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
    const handleLogin = ()=>{
      const userLogin  = {email,password} 
      dispatch(loginUser(userLogin))
      history.push("/")
      setEmail("")
      setPassword("")
    }
  
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("")
 
    return (
      
        <div className="login">
          <span className="loginTitle">Register</span>
          <form className="loginForm" onSubmit={handleLogin}>
 
  
          <label>Email address</label>
          <input  className="loginInput" name="email" type="email" placeholder="Enter email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
   
    <label>Password</label>
    <input className="loginInput" name="password" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
  
 <button className="loginButton" type="submit">
             Login
             </button>
      </form>
</div>
    );
    }

export default Login