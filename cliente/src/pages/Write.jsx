import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import spotify from "../assets/write-spotify.png";
import youtobe from "../assets/write-youtobe.png";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale"; // Importa el locale español si es necesario
import "./Write.scss";
import { UploadImg } from "../firebase/config.js";
import { toast } from "react-toastify";
import { toastpromise } from "../components/toastConfig/toastconfigs.jsx";
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const Write = () => {
  const navigate = useNavigate();
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [description, setDescription] = useState(state?.desc || "");
  const [fileImg, setFileImg] = useState(null);
  const [fileImgPreview, setFileImgPreview] = useState(null);
  const [socialLinks, setSocialLinks] = useState(
    state?.links || {
      spotify: "",
      youtobe: "",
    }
  );

  // Mostrar imagen seleccionada
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFileImg(selectedFile);

      // Mostrar la vista previa de la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileImgPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await UploadImg(fileImg);
    try {
      const postData = {
        title,
        desc: description,
        img: fileImg ? imgUrl : "",
        links: socialLinks,
      };

      if (!state) {
        postData.date = format(new Date(), "yyyy-MM-dd HH:mm:ss", {
          locale: es,
        });
      }

      const promise = state
        ? axios.put(`${URL}/api/posts/${state.id}`, postData, {
            withCredentials: true,
          })
        : axios.post(`${URL}/api/posts/`, postData, { withCredentials: true });

      //! notificaion del post
      toast.promise(
        promise,
        {
          pending: "Subiendo Blog...",

          success: {
            render({ data }) {
              const responseData = JSON.parse(data.config.data);
              return `${responseData.title} subido exitosamente`;
            },
          },
          error: {
            render({ data }) {
              return `${data.message}`;
            },
          },
        },
        toastpromise //estilo
      );

      await promise;
      navigate("/");
    } catch (err) {
      toast.error(`Error al realizar la solicitud: ${err.message}`);
      console.log("Error al realizar la solicitud:", err);
    }
  };

  return (
    <div className="write">
      <div className="content">
        <input
          type="text"
          placeholder="Titulo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {fileImgPreview && (
          <div className="preview-img">
            <img src={fileImgPreview} alt="Preview" />
          </div>
        )}
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={description}
            onChange={setDescription}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publicar</h1>
          <div className="buttons">
            <input
              style={{ display: "none" }}
              type="file"
              name=""
              id="file"
              onChange={handleFileChange}
            />
            <label className="file" htmlFor="file">
              Cargar Imagen
            </label>
            <button onClick={handleClick}>Publicar</button>
          </div>
        </div>
        <div className="item">
          <div className="spotify">
            <img src={spotify} alt="" />
            <input
              type="text"
              placeholder="https://spotify"
              value={socialLinks.spotify}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, spotify: e.target.value })
              }
            />
          </div>
          <div className="twitter">
            <img src={youtobe} alt="" />
            <input
              type="text"
              placeholder="https://youtobe"
              value={socialLinks.youtobe}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, youtobe: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
