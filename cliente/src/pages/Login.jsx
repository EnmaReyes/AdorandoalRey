import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

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
    <div className="auth">
      <h1>Iniciar sesión</h1>
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
        {error && <p>{error}</p>}
        <span>
          ¿no posees cuenta? <Link to="/register">Registrate</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
