import React, { useContext, useState, useEffect } from "react";
import "./Search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { API_URL } from "../../config";

const Search = ({ setSearchResult }) => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const { setShowUserEdit } = useContext(AuthContext);

  // Toggle search input in mobile
  const toggleSearch = () => setOpen((prev) => !prev);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (input.trim() === "") {
        setSearchResult([]);
        return;
      }
 const formatted =
      input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
      
      axios
        .get(`${API_URL}/api/posts/search?title=${encodeURIComponent(formatted)}`, {
          withCredentials: true,
        })
        .then((res) => setSearchResult(res.data.posts))
        .catch((err) => console.error("Search error:", err));
    }, 300); // debounce 300 ms

    return () => clearTimeout(delayDebounce);
  }, [input]);

  return (
    <div className="input-wrapper">
      <button
        className="btn"
        onMouseDown={(e) => e.preventDefault()}
        onClick={toggleSearch}
      >
        <FontAwesomeIcon id="search-icon" icon={faSearch} />
      </button>

      <input
        className={`search-input ${open ? "open" : ""}`}
        placeholder="Buscar..."
        type="text"
        value={input}
        onFocus={() => setShowUserEdit(true)}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default Search;
