import axios from "axios";
import React, { useEffect, useState, createContext, useRef } from "react";
import { API_URL } from "../config.js";

export const AuthContext = createContext();
const URL = API_URL;

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [showUserEdit, setShowUserEdit] = useState(false);

  const inactivityTimerRef = useRef(null); // ⬅️ Timer de inactividad

  const login = async (inputs) => {
    const res = await axios.post(`${URL}/api/auth/login`, inputs, {
      withCredentials: true,
    });
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post(`${URL}/api/auth/logout`, null, { withCredentials: true });
    setCurrentUser(null);
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const refreshUserData = async () => {
    try {
      const res = await axios.get(`${URL}/api/auth/user`, {
        withCredentials: true,
      });
      setCurrentUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("Error al refrescar datos del usuario:", err);
      logout();
    }
  };

  // Resetea timer de inactividad
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    // tiempo de inactividad permitido (ej: 1 hora = 3600000 ms)
    inactivityTimerRef.current = setTimeout(() => {
      logout(); // si pasa el tiempo sin actividad, cerrar sesión
    }, 36000000); // 10 horas
  };

  // Maneja actividad del usuario
  const handleUserActivity = () => {
    resetInactivityTimer();
  };

  // Inicia o limpia timer cuando hay usuario logueado
  useEffect(() => {
    if (currentUser) {
      resetInactivityTimer();
    } else if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
  }, [currentUser]);

  // Persistir usuario en localStorage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  // Eventos para detectar actividad del usuario
  useEffect(() => {
    const events = [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
      "touchmove",
    ];
    events.forEach((event) =>
      document.addEventListener(event, handleUserActivity)
    );
    return () => {
      events.forEach((event) =>
        document.removeEventListener(event, handleUserActivity)
      );
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        showUserEdit,
        setShowUserEdit,
        refreshUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
