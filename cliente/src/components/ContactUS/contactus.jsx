import React, { useState } from "react";
import { toastComments, toastpromise } from "../toastConfig/toastconfigs.jsx";
import { toast } from "react-toastify";
import "./contactus.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeOpenText,
  faLocationDot,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../../config.js";
const URL = API_URL;

const Contactus = () => {
  const [error, setError] = useState("");
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !contactData.email ||
      !contactData.firstName ||
      !contactData.lastName ||
      !contactData.message
    ) {
      setError("complete todos los campos.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email)) {
      setError("Ingrese un correo válido.");
      return;
    }

    if (contactData.phone.length < 9) {
      setError("Agregar numero Real");
      return;
    }

    try {
      await toast.promise(
        axios.post(`${URL}/api/email/contact`, contactData), // La promesa de Axios
        {
          pending: "Enviando Email...",
          success: "Email Enviado!",
          error: "Hubo un error al enviar el Email.",
        },
        toastpromise
      );

      setContactData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      setError("Hubo un error al enviar el Email. Inténtalo de nuevo.");
    }
  };
  const handleChange = (e) => {
    setContactData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="contact-container">
      <div class="custom-shape-divider-top-1738175201">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
      <div className="contact-block">
        <div className="contact-box">
          <h1 className="titulo">Contactanos</h1>
          <form onSubmit={handlesubmit} className="form_contact">
            <div className="fullname_inputs ">
              <div className="input-group">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="input-group__input"
                  required
                  onChange={handleChange}
                />
                <label htmlFor="firstName" className="input-group__label">
                  Nombre
                </label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="input-group__input"
                  required
                  onChange={handleChange}
                />
                <label htmlFor="lastName" className="input-group__label">
                  Apellido
                </label>
              </div>
            </div>
            <div className="input-group">
              <input
                type="text"
                id="email"
                name="email"
                className="input-group__input"
                onChange={handleChange}
                required
              />
              <label htmlFor="email" className="input-group__label">
                Correo Electronico
              </label>
            </div>
            <div className="input-group">
              <input
                type="text"
                id="phone"
                name="phone"
                className="input-group__input"
                required
                onChange={handleChange}
              />
              <label htmlFor="phone" className="input-group__label">
                Numero Movíl
              </label>
            </div>

            <textarea
              className="contact-textarea"
              placeholder="Escribir..."
              name="message"
              onChange={handleChange}
            />

            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="emailbutton">
              Enviar
            </button>
          </form>
        </div>

        <div className="info-container">
          <div class="triangle-horizontal">
            <div className="triangle-data">
                <h1 className="titulo-box">Adorando al Rey</h1>
              <div className="line-block"></div>
              <div className="data-box">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="icon-triangle"
                />
                <p>
                  Chile-Rancagua <br /> Villa Alameda pasaje Qintero
                </p>
              </div>
              <div className="data-box">
                <FontAwesomeIcon
                  icon={faEnvelopeOpenText}
                  className="icon-triangle"
                />
                <p>adorandoalreyconyasmira@gmail.com</p>
              </div>
              <div className="data-box">
                <FontAwesomeIcon
                  icon={faMobileScreenButton}
                  className="icon-triangle"
                />
                <p>+56 9 54959538</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
