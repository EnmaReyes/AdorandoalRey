import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import spotify from "../assets/write-spotify.png";
import youtobe from "../assets/write-youtobe.png";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import "./Write.scss"

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
    //* mostrar imagen seleccionada\\

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
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("fileImg", fileImg);
      const res = await axios.post(
        `${URL}/api/upload`,
        formData,
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(
            `${URL}/api/posts/${state.id}`,
            {
              title,
              desc: description,
              img: file ? imgUrl : "",
              links: socialLinks,
            },
            { withCredentials: true }
          )
        : await axios.post(
            `${URL}/api/posts/`,
            {
              title,
              desc: description,
              img: file ? imgUrl : "",
              links: socialLinks,
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            { withCredentials: true }
          );

      navigate("/");
    } catch (err) {
      console.log("Error al realizar la solicitud:", err);
    }
  };

  const handleLinkChange = (e, index) => {
    const newLinks = [...links];
    newLinks[index] = e.target.value;
    setLinks(newLinks);
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
            <img 
              src={fileImgPreview}
              alt="Preview"
            />
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
