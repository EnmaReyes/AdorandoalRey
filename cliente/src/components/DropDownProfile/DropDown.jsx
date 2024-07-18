import React, { useContext } from "react";
import "./DropDown.scss"
import { AuthContext } from "../../context/authContext";
import { notify } from "../toastConfig/toastconfigs";
import { useNavigate } from "react-router-dom";

const DropDown = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const navegate = useNavigate();
  return (
    <div className="list-container">
      <ul className="ul-container">
        <li onClick={() => navegate("/edit")} >Editar</li>
        <li  onClick={() => notify(logout, "¿Está seguro en salir?")}>Salir</li>
      </ul>
    </div>
  );
};

export default DropDown;
