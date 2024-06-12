import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8800";

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [showUserEdit, setShowUserEdit] = useState(true);
  const [logoutTimer, setLogoutTimer] = useState(null);
  const [isUserActive, setIsUserActive] = useState(false);

  const login = async (inputs) => {
    const res = await axios.post(`${URL}/api/auth/login`, inputs, {
      withCredentials: true,
    });
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post(`${URL}/api/auth/logout`, null, { withCredentials: true });
    setCurrentUser(null);
  };

  // Función para reiniciar el temporizador de cierre de sesión
  const resetLogoutTimer = () => {
    if (logoutTimer) {
      clearInterval(logoutTimer); //! limpiar el temporizador anteriror
    }
    // Establecer un nuevo temporizador de 1 hora (3600000 ms)
    const timer = setTimeout(() => {
      logout();
    }, 3600000);
    setLogoutTimer(timer);
  };

  // Función para manejar la actividad del usuario
  const handleUserActivity = () => {
    setIsUserActive(true);
    resetLogoutTimer();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleUserActivity);
    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("keydown", handleUserActivity);
    document.addEventListener("keypress", handleUserActivity);

    return () => {
      document.removeEventListener("mousedown", handleUserActivity);
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("keydown", handleUserActivity);
      document.removeEventListener("keypress", handleUserActivity);
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      resetLogoutTimer();
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, showUserEdit, setShowUserEdit }}
    >
      {children}
    </AuthContext.Provider>
  );
};
