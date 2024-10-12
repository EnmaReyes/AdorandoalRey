import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale"; // Importa el locale español si es necesario
import "./Write.scss";
import { UploadImg } from "../firebase/config.js";
import { toast } from "react-toastify";
import {
  notify,
  toastpromise,
} from "../components/toastConfig/toastconfigs.jsx";
import inicio from "../assets/logoblanco.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faImage } from "@fortawesome/free-solid-svg-icons";
import { faSpotify, faYoutube } from "@fortawesome/free-brands-svg-icons";
const URL = import.meta.env.VITE_BACKEND_URL;

const Write = () => {
  const navigate = useNavigate();
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [description, setDescription] = useState(state?.desc || "");
  const [fileImg, setFileImg] = useState(state?.img || "");
  const [date, setDate] = useState(state?.date || "");
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
    }
  };

  const handleClick = async () => {
    try {
      // Verificar si title, fileImg o description están vacíos o en false
      if (!title || !description || !date) {
        toast.error("Falta información para subir el Blog!!!", toastpromise);
        return;
      }

      let imgUrl = state?.img;

      if (fileImg && fileImg !== state?.img) {
        imgUrl = await UploadImg(fileImg);
      }
      const postData = {
        title,
        desc: description,
        img: imgUrl,
        links: socialLinks,
        date,
      };

      const promise = state
        ? axios.put(`${URL}/api/posts/${state.id}`, postData, {
            withCredentials: true,
          })
        : axios.post(`${URL}/api/posts/`, postData, { withCredentials: true });

      //! notificación del post
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
        toastpromise // estilo
      );

      await promise;
      navigate("/");
    } catch (err) {
      toast.error(`Error al realizar la solicitud: ${err.message}`);
      console.log("Error al realizar la solicitud:", err);
    }
  };

  const getFormattedDate = (date) => {
    return date ? format(new Date(date), "yyyy-MM-dd") : "";
  };

  return (
    <div className="write">
      <div className="inicio-bg">
        <img className="inicio-img" src={inicio} alt="" />
      </div>
      <div className="content">
        <div className="content-data">
          
          <div
            className="img-loader"
            style={{
              // backgroundImage:fileImg? `url(${window.URL.createObjectURL(fileImg)})` :`url(${fileImg})` ,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
        {fileImg && 
        <img className="img-blog" src={window.URL.createObjectURL(fileImg)} alt="" />  
      }
            <div className="add-img">
              <input
                style={{ display: "none" }}
                type="file"
                name=""
                id="file"
                onChange={handleFileChange}
              />
              <label className="file" htmlFor="file">
                <a className="add-image">
                  <FontAwesomeIcon icon={faImage} />
                </a>
                <a className="add-buton">
                  {" "}
                  <FontAwesomeIcon icon={faCirclePlus} />{" "}
                </a>
              </label>
            </div>
          </div>
          <input
            className="titulacion"
            type="text"
            placeholder="Titulo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="editorContainer">
            <ReactQuill
              className="editor"
              theme="snow"
              value={description}
              onChange={setDescription}
            />
          </div>

          <div className="menu-write">
            <div className="item">
              <div className="spotify">
                <span>
                  <FontAwesomeIcon icon={faSpotify} />
                </span>
                <input
                  type="text"
                  placeholder="https://spotify"
                  value={socialLinks.spotify}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, spotify: e.target.value })
                  }
                />
              </div>
              <div className="youtobe">
                <span>
                  <FontAwesomeIcon icon={faYoutube} />
                </span>
                <input
                  type="text"
                  placeholder="https://youtobe"
                  value={socialLinks.youtobe}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, youtobe: e.target.value })
                  }
                />
              </div>
              <div className="date">
                <input
                  type="date"
                  value={getFormattedDate(date)}
                  placeholder={date ? getFormattedDate(date) : "dd/mm/aaaa"}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className="publicar-btn">
              <button
                className="btn-publish"
                onClick={() =>
                  notify(handleClick, "¿Está seguro en subir el post?")
                }
              >
                Publicar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
