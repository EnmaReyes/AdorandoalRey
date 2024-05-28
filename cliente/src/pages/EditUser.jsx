import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faTrash,
  faUpload,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import "./EditUser.scss";
import { AuthContext } from "../context/authContext";

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const EditUser = () => {
  const { currentUser, logout} = useContext(AuthContext);
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

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("userImg", userImg);
      const res = await axios.post(
        `${URL}/api/uploadUserImg`,
        formData,
        { withCredentials: true }
      );
      
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = () => {
    setFileImgPreview(null);
    setUserImg(null);
    setFormData({
      ...originalValues,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

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
        logout();
        navegate("/login")
      } else {
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
      <div className="caja1">
        <div className="caja2">
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
              <img src={fileImgPreview} alt="Preview" />
            </div>
          )}

          {!fileImgPreview && formData.image && (
            <div className="preview-img">
              <img
                src={`../public/uploadUserImg/${formData.image}`}
                alt="Preview"
              />
            </div>
          )}

          {!fileImgPreview && !formData.image && (
            <div className="preview-undifined">
              <FontAwesomeIcon className="icon" icon={faUser}></FontAwesomeIcon>
            </div>
          )}

          <div className="form">
            <form>
              <div className="div1">
                <label htmlFor="username">Usuario</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                />
              </div>
              <div className="div2">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="div3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="div4">
                <label htmlFor="apellido">Apellido</label>
                <input
                  type="apellido"
                  id="apellido"
                  name="apellido"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      lastName: e.target.value,
                    }))
                  }
                />
              </div>
            </form>
          </div>

          <div className="buttons">
            <span className="upload" onClick={handleClick}>
              <FontAwesomeIcon icon={faUpload} />
            </span>

            <span className="delete" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
