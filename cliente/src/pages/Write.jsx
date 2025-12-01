import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Write.scss";
import { UploadImg } from "../firebase/config.js";
import { toast } from "react-toastify";
import {
  notify,
  toastpromise,
} from "../components/toastConfig/toastconfigs.jsx";
import inicio from "../assets/logoblanco.png";
import podimo from "../assets/podimoIcon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faImage } from "@fortawesome/free-solid-svg-icons";
import { faSpotify, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { SpineLoader } from "../components/Loading/Loading.jsx";
import { API_URL } from "../config.js";

const URL_API = API_URL;

const Write = () => {
  const navigate = useNavigate();
  const state = useLocation().state;

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(state?.title || "");
  const [description, setDescription] = useState(state?.desc || "");
  const [fileImg, setFileImg] = useState(state?.img || "");
  const [previewUrl, setPreviewUrl] = useState(null); // <- Vista previa segura
  const [date, setDate] = useState(state?.date || "");
  const [socialLinks, setSocialLinks] = useState(
    state?.links || { spotify: "", youtobe: "", podimo: "" }
  );

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ color: [] }, { background: [] }],
      ["bold", "italic", "underline"],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const updateSocial = (key, value) =>
    setSocialLinks((prev) => ({ ...prev, [key]: value }));

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected instanceof File) {
      setFileImg(selected);
    } else {
      setFileImg(null);
    }
  };

  // ---- MANEJO SEGURO DE VISTA PREVIA ----
  useEffect(() => {
    if (!fileImg) {
      setPreviewUrl(null);
      return;
    }

    if (!(fileImg instanceof File)) {
      setPreviewUrl(fileImg); // URL o string previa (editar post)
      return;
    }

    const globalURL = window.URL || window.webkitURL;
    if (!globalURL?.createObjectURL) {
      console.error("createObjectURL no soportado");
      setPreviewUrl(null);
      return;
    }

    const objectUrl = globalURL.createObjectURL(fileImg);
    setPreviewUrl(objectUrl);

    return () => {
      globalURL.revokeObjectURL(objectUrl);
    };
  }, [fileImg]);

  // ---- PUBLICAR O ACTUALIZAR ----
  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (!title || !description || !date) {
        toast.error("Falta información para subir el Blog!!!", toastpromise);
        return setLoading(false);
      }

      // Subir imagen si es nueva
      const imgUrl =
        fileImg instanceof File ? await UploadImg(fileImg) : fileImg;

      const postData = {
        title,
        desc: description,
        img: imgUrl,
        links: socialLinks,
        date,
      };

      const request = state
        ? axios.put(`${URL_API}/api/posts/${state.id}`, postData, {
            withCredentials: true,
          })
        : axios.post(`${URL_API}/api/posts/`, postData, {
            withCredentials: true,
          });

      toast.promise(
        request,
        {
          pending: "Subiendo Blog...",
          success: () => `${postData.title} subido exitosamente`,
          error: (res) => res?.message || "Error al subir el Blog",
        },
        toastpromise
      );

      await request;
      navigate("/");
    } catch (err) {
      console.error("Error:", err);
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="write">
      <div className="inicio-bg">
        <img className="inicio-img" src={inicio} alt="Logo" />
      </div>

      <div className="content">
        <div className="content-data">
          {/* Imagen */}
          <div className="img-loader">
            {previewUrl && (
              <img className="img-blog" src={previewUrl} alt="Blog" />
            )}

            <div className="add-img">
              <input
                id="file"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              <label htmlFor="file" className="file">
                <span className="add-image">
                  <FontAwesomeIcon icon={faImage} />
                </span>
                <span className="add-buton">
                  <FontAwesomeIcon icon={faCirclePlus} />
                </span>
              </label>
            </div>
          </div>

          {/* Título */}
          <input
            className="titulacion"
            type="text"
            placeholder="Titulo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Editor */}
          <div className="editorContainer">
            <ReactQuill
              className="editor"
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={modules}
            />
          </div>

          {/* Redes y Fecha */}
          <div className="menu-write">
            <div className="item-write">
              <div className="spotify">
                <FontAwesomeIcon icon={faSpotify} size="2x" />
                <input
                  type="text"
                  placeholder="https://spotify.com"
                  value={socialLinks.spotify}
                  onChange={(e) => updateSocial("spotify", e.target.value)}
                />
              </div>

              <div className="youtobe">
                <FontAwesomeIcon icon={faYoutube} size="2x" />
                <input
                  type="text"
                  placeholder="https://youtube.com"
                  value={socialLinks.youtobe}
                  onChange={(e) => updateSocial("youtobe", e.target.value)}
                />
              </div>

              <div className="podimo">
                <img src={podimo} alt="podimo" className="podimo-icon-img" />
                <input
                  type="text"
                  placeholder="https://podimo.com"
                  value={socialLinks.podimo}
                  onChange={(e) => updateSocial("podimo", e.target.value)}
                />
              </div>

              <div className="date">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            {/* Botón publicar */}
            <div className="publicar-btn">
              <button
                className="btn-publish"
                onClick={() =>
                  notify(handleSubmit, "¿Está seguro en subir el post?")
                }
              >
                {loading ? <SpineLoader /> : "Publicar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
