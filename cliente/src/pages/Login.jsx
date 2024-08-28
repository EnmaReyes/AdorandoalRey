import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import logo from "../assets/logoblanco.png";
import fondo from "../assets/background/login.png";
import "./Login.scss";
const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handlechange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="login-contain">
      <div className="login-box">
      <div className="left">
        <img src={logo} alt="Logo" />
      </div>
      <div className="rigth">
        <div className="info"> 
        <h1>Iniciar Sesión</h1>
        <form>
          <input
            required
            type="text"
            placeholder="Usuario"
            name="username"
            onChange={handlechange}
          />
          <input
            required
            type="password"
            placeholder="Contraseña"
            name="password"
            onChange={handlechange}
          />
          <button onClick={handlesubmit}>Ingresar</button>
          {error && <p className="error">{error}</p>}
          <span>
            ¿No posees cuenta? <Link to="/register">Registrate</Link>
          </span>
        </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
