import React, { useContext, useEffect, useRef } from "react";
import "./SearchResults.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const SearchResults = ({ searchResult }) => {
  const { showUserEdit, setShowUserEdit } = useContext(AuthContext);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Si haces click dentro del cuadro de resultados → no cerrar
      if (containerRef.current && containerRef.current.contains(e.target))
        return;

      // Si haces click dentro del input → no cerrar
      if (e.target.classList.contains("search-input")) return;

      // En cualquier otro lugar → cerrar
      setShowUserEdit(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setShowUserEdit]);

  return (
    <div
      ref={containerRef}
      className={
        !showUserEdit || searchResult.length === 0 ? "hidden" : "results-list"
      }
    >
      {searchResult.length > 0 &&
        searchResult.map((result) => (
          <Link
            key={result.id}
            className="result-item"
            to={`/post/${result.id}`}
          >
            <div className="result-title">{result.title}</div>
          </Link>
        ))}
    </div>
  );
};

export default SearchResults;
