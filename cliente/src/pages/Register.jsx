import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
const Register = () => {
  
  const [inputs, setInputs] = useState({
    email:"",
    username:"",
    password:"",
  })
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handlechange = e =>{
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  };

  const handlesubmit = async e =>{
    e.preventDefault();
    try {
      await axios.post(`${URL}/api/auth/register`, inputs);
      navigate("/login")
    }catch(err){
      setError(err.response.data)
    } 
  };

  return (
    <div className='auth'>
    <h1>Registrar</h1>
    <form>
      <input required type='email' placeholder='email' name="email" onChange={handlechange}/>
      <input required type='text' placeholder='user name' name="username" onChange={handlechange}/>
      <input required type='password' placeholder='password' name="password" onChange={handlechange}/>
      <button onClick={handlesubmit}>Registrar</button>
      {error && <p>{error}</p>}
      <span>¿posees cuenta? <Link to="/login">Iniciar Sesión</Link></span>
    </form>
  </div>
  )
}

export default Register