import React, { useContext, useState, useEffect, useRef } from "react";
import "./Search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTimes,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { API_URL } from "../../config";

const Search = ({ setSearchResult }) => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const { setShowUserEdit } = useContext(AuthContext);

  // Toggle search input en mobile
  const toggleSearch = () => {
    setOpen((prev) => !prev);

    if (!open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  // Limpiar búsqueda
  const clearSearch = () => {
    setInput("");
    setSearchResult([]);
    inputRef.current?.focus();
  };

  // Buscar posts con debounce
  useEffect(() => {
    if (input.trim() === "") {
      setSearchResult([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const delayDebounce = setTimeout(
      () => {
        const searchTerm = input.trim();

        axios
          .get(
            `${API_URL}/api/posts/search?title=${encodeURIComponent(searchTerm)}`,
            {
              withCredentials: true,
            },
          )
          .then((res) => {
            setSearchResult(res.data.posts || []);
            setShowUserEdit(true);
          })
          .catch((err) => {
            console.error("Search error:", err);
            setSearchResult([]);
          })
          .finally(() => setIsLoading(false));
      },

      400,
    ); // debounce 400 ms para mejor performance

    return () => clearTimeout(delayDebounce);
  }, [input, setSearchResult, setShowUserEdit]);

  // Cerrar búsqueda en mobile al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".search-container")) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="search-container">
      <div className={`input-wrapper ${open ? "active" : ""}`}>
        <button
          className="search-btn"
          onMouseDown={(e) => e.preventDefault()}
          onClick={toggleSearch}
          title="Buscar"
          aria-label="Buscar"
        >
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </button>
        <input
          ref={inputRef}
          className={`search-input ${open ? "open" : ""}`}
          placeholder="Buscar artículos..."
          type="text"
          value={input}
          onFocus={() => {
            setIsFocused(true);
            setShowUserEdit(true);
          }}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Campo de búsqueda"
        />
        {input && (
          <button
            className="clear-btn"
            onClick={clearSearch}
            onMouseDown={(e) => e.preventDefault()}
            title="Limpiar búsqueda"
            aria-label="Limpiar búsqueda"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
        {isLoading && (
          <div className="loading-spinner">
            <FontAwesomeIcon icon={faSpinner} spin />
          </div>
        )}
      </div>
      {input && (
        <div className="search-hint">
          {isLoading
            ? "Buscando..."
            : input.length < 2
              ? "Escribe al menos 2 caracteres"
              : ""}
        </div>
      )}
    </div>
  );
};

export default Search;
