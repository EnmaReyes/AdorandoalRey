import React, { useState } from "react";
import { toastComments, toastpromise } from "../toastConfig/toastconfigs.jsx";
import { toast } from "react-toastify";
import "./contactus.scss";
import axios from "axios";

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
      <div className="contact-box">
        <form onSubmit={handlesubmit} className="form_contact">
          <div className="fullname_inputs">
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="input-group__input"
              onChange={handleChange}
            />
            <label htmlFor="firstName" className="input-group__label">
              Nombre
            </label>

            <input
              type="text"
              id="lastName"
              name="lastName"
              className="input-group__input"
              onChange={handleChange}
            />
            <label htmlFor="lastName" className="input-group__label">
              Apellido
            </label>
          </div>
          <input
            type="text"
            id="email"
            name="email"
            className="input-group__input"
            onChange={handleChange}
          />
          <label htmlFor="email" className="input-group__label">
            Correo Electronico
          </label>

          <input
            type="text"
            id="phone"
            name="phone"
            className="input-group__input"
            onChange={handleChange}
          />
          <label htmlFor="phone" className="input-group__label">
            Numero Movíl
          </label>

          <textarea
            className="contact-textarea"
            placeholder="Escribir..."
            name="message"
            onChange={handleChange}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Enviar</button>
        </form>
      </div>

      <div></div>
    </div>
  );
};

export default Contactus;
