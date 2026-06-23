import React, { useContext, useEffect, useRef } from "react";
import "./SearchResults.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/authContext";

const SearchResults = ({ searchResult }) => {
  const { showUserEdit, setShowUserEdit } = useContext(AuthContext);
  const containerRef = useRef(null);

  // Cerrar resultados al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Si haces click dentro del cuadro de resultados → no cerrar
      if (containerRef.current && containerRef.current.contains(e.target))
        return;

      // Si haces click dentro del input → no cerrar
      if (e.target.closest(".search-container")) return;

      // En cualquier otro lugar → cerrar
      setShowUserEdit(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setShowUserEdit]);

  // No mostrar si no hay búsqueda activa o sin resultados
  if (!showUserEdit || searchResult.length === 0) {
    return null;
  }

  // Limitar a 8 resultados
  const displayResults = searchResult.slice(0, 8);
  const hasMore = searchResult.length > 8;

  return (
    <div
      ref={containerRef}
      className="search-results-container"
      role="region"
      aria-label="Resultados de búsqueda"
    >
      <div className="results-header">
        <span className="result-count">
          {searchResult.length}{" "}
          {searchResult.length === 1 ? "resultado" : "resultados"}
        </span>
      </div>

      <div className="results-list">
        {displayResults.map((result, index) => (
          <Link
            key={result.id}
            className="result-item"
            to={`/post/${result.id}`}
            onClick={() => setShowUserEdit(false)}
            style={{ "--delay": `${index * 0.05}s` }}
          >
            <div className="result-content">
              <div className="result-info">
                <h3 className="result-title">{result.title}</h3>
                <p className="result-excerpt">{result.excerpt}</p>
                {result.date && (
                  <div className="result-meta">
                    <time>
                      {new Date(result.date).toLocaleDateString("es-ES")}
                    </time>
                  </div>
                )}
              </div>
              <div className="result-arrow">
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="results-footer">
          <p className="more-results">
            Ver los {searchResult.length - 8} resultados restantes
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
