import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.scss";
import logo from "../assets/logoblanco.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [focus, setFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const hadleFocus = () => {
    setFocus(true);
  };
  const handleBlur = () => {
    setFocus(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handlechange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${URL}/api/auth/register`, inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="register-contain">
      <div className="registro-box">
        <div className={`left ${focus ? "reduced-width" : ""}`}>
          <img src={logo} alt="Logo" />
          <Link className="inicio" to="/">
            <button>
              <FontAwesomeIcon icon={faArrowLeft} />
              <span> Inicio</span>
            </button>
          </Link>
        </div>

        <div className="rigth">
          <div className="info-register">
            <h1>Registrarse</h1>
            <form>
              <input
                required
                type="email"
                placeholder="Email"
                name="email"
                onChange={handlechange}
                onFocus={hadleFocus}
                onBlur={handleBlur}
              />
              <input
                required
                type="text"
                placeholder="Usuario"
                name="username"
                onChange={handlechange}
                onFocus={hadleFocus}
                onBlur={handleBlur}
              />
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                name="password"
                onChange={handlechange}
                onFocus={hadleFocus}
              />
              <a onClick={togglePasswordVisibility} className="show-hide">
                {showPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </a>
              <button onClick={handlesubmit}>Registrar</button>
              {error && <p>{error}</p>}
              <span>
                ¿Posees cuenta? <Link to="/login">Iniciar Sesión</Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
