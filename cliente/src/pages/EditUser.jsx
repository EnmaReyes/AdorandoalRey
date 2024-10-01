import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faTrash,
  faUpload,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./EditUser.scss";
import gbEdit from "../assets/background/bg-editing.jfif";
import { AuthContext } from "../context/authContext";
import { UploadUserImg } from "../firebase/config.js";
import { notify } from "../components/toastConfig/toastconfigs.jsx";
import { toast } from "react-toastify";
import { toastpromise } from "../components/toastConfig/toastconfigs.jsx";
const URL = import.meta.env.VITE_BACKEND_URL;

const EditUser = () => {
  const { refreshUserData } = useContext(AuthContext);
  const navegate = useNavigate();
  const [userImg, setUserImg] = useState(null);
  const [fileImgPreview, setFileImgPreview] = useState(null);
  const [state, setState] = useState({});
  const [originalValues, setOriginalValues] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
    lastName: "",
    image: "",
  });

  //! get user \\
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

  //* mostrar imagen seleccionada\\

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setUserImg(selectedFile);

      // Mostrar la vista previa de la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileImgPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDelete = () => {
    setFileImgPreview(null);
    setUserImg(null);
    setFormData({
      ...originalValues,
    });
  };

  const handleClick = async () => {
    const imgUrl = await UploadUserImg(userImg);

    try {
      if (state) {
        await axios.put(
          `${URL}/api/user/edit/`,
          {
            image: fileImgPreview ? imgUrl : "",
            email: formData.email,
            name: formData.name,
            lastName: formData.lastName,
          },
          { withCredentials: true }
        );
        refreshUserData();
        toast.success("Cambios Exitosos", toastpromise);
        navegate("/");
      } else {
        toast.error("Ocurrió un error", toastpromise);
        console.error("Error: El estado es nulo o indefinido.");
      }
      setFormData({
        ...originalValues,
        image: fileImgPreview ? fileImgPreview : originalValues.image,
      });
    } catch (err) {
      console.log("Error al realizar la solicitud:", err);
    }
  };

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
                name=""
                id="file"
                onChange={handleFileChange}
              />
              <label className="submit" htmlFor="file">
                <FontAwesomeIcon
                  className="icon"
                  icon={faImage}
                ></FontAwesomeIcon>
              </label>
            </div>

            {fileImgPreview && (
              <div className="preview-img">
                <img src={fileImgPreview} alt="User" />
              </div>
            )}

            {!fileImgPreview && formData.image && (
              <div className="preview-img">
                <img src={formData.image} />
              </div>
            )}

            {!fileImgPreview && !formData.image && (
              <div className="preview-undifined">
                <FontAwesomeIcon
                  className="icon"
                  icon={faUser}
                ></FontAwesomeIcon>
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
                  required
                  value={formData.username}
                />
                <label for="username" className="input-group__label">
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
                <label for="nombre" className="input-group__label">
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
                <label for="apellido" className="input-group__label">
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
