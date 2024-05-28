import React, { useContext, useEffect, useRef, useState } from "react";
import "./Search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const Search = ({ setSearchResult }) => {
  const [input, setInput] = useState("");
  const {setShowUserEdit } = useContext(AuthContext);
  const inputRef = useRef(null);

  const handleChange = (value) => {
    setInput(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (input === "") {
          setSearchResult([]);
        } else {
          const response = await axios.get(
            `${URL}/api/posts/search?title=${input}`,
            {
              withCredentials: true,
            }
          );
          setSearchResult(response.data.posts);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [input]);

  return (
    <div className="input-wrapper">
      <input
        placeholder="Buscador"
        type="text"
        onClick={(e)=>{
          e.stopPropagation();
          setShowUserEdit(true)
        }}
        ref={inputRef}
        value={input}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
      <div className="btn">
      <FontAwesomeIcon id="search-icon" icon={faSearch} />
      </div> 
    </div>
  );
};

export default Search;
