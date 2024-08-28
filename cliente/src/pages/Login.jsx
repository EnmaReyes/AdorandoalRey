import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import logo from "../assets/logoblanco.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import "./Login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [focus, setFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handlechange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const hadleFocus = () => {
    setFocus(true);
  };
  const handleBlur = () => {
    setFocus(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
          <div className="info">
            <h1>Iniciar Sesión</h1>
            <form>
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
              <button onClick={handlesubmit}>Ingresar</button>
              {error && <p className="error">{error}</p>}
              <span>
                ¿No posees cuenta?{" "}
                <Link className="register" to="/register">
                  Registrate
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
