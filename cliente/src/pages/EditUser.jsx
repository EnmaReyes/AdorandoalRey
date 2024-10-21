import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./EditUser.scss";
import gbEdit from "../assets/background/bg-editing.jfif";
import { AuthContext } from "../context/authContext";
import { UploadUserImg } from "../firebase/config.js";
import {
  notify,
  toastpromise,
} from "../components/toastConfig/toastconfigs.jsx";
import { toast } from "react-toastify";
const URL = import.meta.env.VITE_BACKEND_URL;

const EditUser = () => {
  const { refreshUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userImg, setUserImg] = useState(null);
  const [state, setState] = useState({});
  const [originalValues, setOriginalValues] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
    lastName: "",
    image: "",
  });

  //! Obtener datos del usuario
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/api/user/edit/`, {
          withCredentials: true,
        });
        setState(res.data);
        setOriginalValues(res.data);
        setFormData({
          username: res.data.username,
          email: res.data.email,
          name: res.data.name,
          lastName: res.data.lastName,
          image: res.data.image,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  //* Manejar selección de imagen
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setUserImg(selectedFile);
    }
  };

  //* Restaurar valores originales
  const handleDelete = () => {
    setUserImg(null);
    setFormData({
      ...originalValues,
    });
  };

  //* Manejar la actualización de datos del usuario
  const handleClick = async () => {
    try {
      let imgUrl = formData.image;

      // Si se selecciona una nueva imagen, se sube y se actualiza la URL
      if (userImg && userImg !== formData.image) {
        imgUrl = await UploadUserImg(userImg);
      }

      // Realizar PUT solo si el usuario tiene datos en el estado
      if (state) {
        const promise = axios.put(
          `${URL}/api/user/edit/`,
          {
            image: userImg ? imgUrl : formData.image, // Si no se cambia la imagen, mantener la original
            email: formData.email,
            name: formData.name,
            lastName: formData.lastName,
          },
          { withCredentials: true, }
        );

        //! Notificación de éxito
        toast.promise(
          promise,
          {
            pending: "Haciendo cambios...",
            success: "Cambios exitosos",
            error: "Error al actualizar los datos",
          },
          toastpromise // estilo
        );

        await promise;
        refreshUserData();
        navigate("/");
      } else {
        toast.error("Ocurrió un error", toastpromise);
        console.error("Error: El estado es nulo o indefinido.");
      }
    } catch (err) {
      console.log("Error al realizar la solicitud:", err);
    }
  };
  console.log(formData);
  
  return (
    <div className="contenedor">
      <img className="gbEdit" src={gbEdit} alt="" />
      <div className="edit-box">
        <div className="caja-left">
          <div className="photo">
            <div className="preview-change">
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                onChange={handleFileChange}
              />
              <label className="submit" htmlFor="file">
                <FontAwesomeIcon className="icon" icon={faImage} />
              </label>
            </div>

            {/* Mostrar la imagen seleccionada o la imagen original */}
            {userImg ? (
              <div className="preview-img">
                <img src={window.URL.createObjectURL(userImg)} alt="User" />
              </div>
            ) : formData.image ? (
              <div className="preview-img">
                <img src={formData.image} alt="User" />
              </div>
            ) : (
              <div className="preview-undifined">
                <FontAwesomeIcon className="icon" icon={faUser} />
              </div>
            )}

            <h1>{formData.username}</h1>
          </div>

          <div className="info-box">
            <h1>{formData.name}</h1>
            <h1>{formData.lastName}</h1>
            <h1>{formData.email}</h1>
          </div>
        </div>

        <div className="caja-rigth">
          <div className="form-box">
            <div className="formulario">
              <div className="input-group">
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="input-group__input"
                  value={formData.username}
                />
                <label htmlFor="username" className="input-group__label">
                  Usuario
                </label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="input-group__input"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      name: e.target.value,
                    }))
                  }
                />
                <label htmlFor="nombre" className="input-group__label">
                  Nombre
                </label>
              </div>
              <div className="input-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input-group__input"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      email: e.target.value,
                    }))
                  }
                />
                <label htmlFor="email" className="input-group__label">
                  Email
                </label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  className="input-group__input"
                  required
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      lastName: e.target.value,
                    }))
                  }
                />
                <label htmlFor="apellido" className="input-group__label">
                  Apellido
                </label>
              </div>
            </div>
          </div>

          <div className="buttons">
            <span
              className="upload"
              onClick={() =>
                notify(handleClick, "¿Está seguro en actualizar sus datos?")
              }
            >
              Actualizar
            </span>
            <span className="delete" onClick={handleDelete}>
              Reiniciar
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
